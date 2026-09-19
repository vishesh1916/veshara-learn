import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Users, IndianRupee, BookOpen, UserCheck, Plus, ArrowRight, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard — Veshara Learn",
};

export default async function AdminDashboardPage() {
  // Real database metrics initialized to 0
  let totalStudents = 0;
  let totalRevenuePaisa = 0;
  let totalEnrollments = 0;
  let activeCourses = 0;
  let recentPayments: any[] = [];

  try {
    const [
      studentCount,
      enrollCount,
      courseCount,
      revenueAggregate,
      recentPaymentsList,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.enrollment.count(),
      prisma.course.count(),
      prisma.payment.aggregate({
        where: { status: "SUCCESS" },
        _sum: { amount: true },
      }),
      prisma.payment.findMany({
        where: { status: "SUCCESS" },
        include: { user: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    totalStudents = studentCount;
    totalEnrollments = enrollCount;
    activeCourses = courseCount;
    totalRevenuePaisa = revenueAggregate._sum.amount || 0;
    recentPayments = recentPaymentsList;
  } catch (err) {
    console.warn("AdminDashboardPage DB query notice:", err);
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-custom">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
            Management Portal
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
            Admin Overview
          </h1>
          <p className="text-secondary text-sm sm:text-base mt-1">
            Real-time analytics, student enrollments, and course revenue tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button href="/admin/courses/new" variant="primary" size="md">
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Create Course</span>
          </Button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border-2 border-primary rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Total Students
            </span>
            <div className="w-8 h-8 rounded-lg bg-accent text-primary flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-bold text-4xl text-primary">{totalStudents}</span>
            <span className="text-xs font-mono text-primary font-bold bg-accent px-2 py-0.5 rounded">
              Active Database
            </span>
          </div>
        </div>

        <div className="bg-white border-2 border-primary rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-accent text-primary flex items-center justify-center font-bold">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-bold text-4xl text-primary">
              {formatPrice(totalRevenuePaisa)}
            </span>
            <span className="text-xs font-mono text-secondary">₹199 / sale</span>
          </div>
        </div>

        <div className="bg-white border-2 border-primary rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Paid Enrollments
            </span>
            <div className="w-8 h-8 rounded-lg bg-accent text-primary flex items-center justify-center font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-bold text-4xl text-primary">{totalEnrollments}</span>
            <span className="text-xs font-mono text-secondary">Razorpay Verified</span>
          </div>
        </div>

        <div className="bg-white border-2 border-primary rounded-2xl p-6 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-secondary mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Active Courses
            </span>
            <div className="w-8 h-8 rounded-lg bg-accent text-primary flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-serif font-bold text-4xl text-primary">{activeCourses}</span>
            <span className="text-xs font-mono text-primary font-bold bg-accent px-2 py-0.5 rounded">
              Published
            </span>
          </div>
        </div>
      </div>

      {/* Recent Purchases Table */}
      <div className="bg-white border border-border-custom rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-2xl text-primary uppercase">
              Recent Transactions
            </h3>
            <p className="text-xs text-secondary mt-0.5">
              Live Razorpay payments & course access grants
            </p>
          </div>
          <Link
            href="/admin/payments"
            className="text-xs font-mono font-bold text-primary hover:text-accent hover:underline flex items-center gap-1"
          >
            <span>View all payments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-custom text-xs font-mono uppercase text-secondary">
                <th className="pb-3 font-semibold">Student</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Method</th>
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom/50">
              {recentPayments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs font-mono text-secondary">
                    No payment transactions recorded yet. Live student transactions will appear here as soon as enrollments occur.
                  </td>
                </tr>
              ) : (
                recentPayments.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#F5F3EE]/60">
                    <td className="py-3.5 pr-4">
                      <p className="font-bold text-primary">{tx.user?.name || "Student"}</p>
                      <p className="text-xs font-mono text-secondary">{tx.user?.email || "—"}</p>
                    </td>
                    <td className="py-3.5 pr-4 font-mono font-bold text-primary">{formatPrice(tx.amount)}</td>
                    <td className="py-3.5 pr-4 text-xs font-mono text-secondary">Razorpay UPI / Card</td>
                    <td className="py-3.5 pr-4 text-xs font-mono text-secondary">{formatDate(tx.createdAt)}</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-accent text-primary border border-primary/20">
                        ✓ {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
