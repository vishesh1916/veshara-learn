import * as React from "react";
import type { Metadata } from "next";
import { Users, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Student Roster — Veshara Learn Admin",
};

export default async function AdminStudentsPage() {
  let studentsList: any[] = [];
  try {
    studentsList = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        enrollments: {
          include: {
            course: true,
          },
        },
        progress: {
          where: { completed: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.warn("AdminStudentsPage DB query notice:", e);
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-custom">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
            Student Management
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
            Student Roster
          </h1>
          <p className="text-secondary text-sm sm:text-base mt-1">
            Real-time registered learners and enrollment records from your database.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white border border-border-custom text-primary font-bold shadow-subtle">
            Total: {studentsList.length} Students
          </span>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white border-2 border-primary rounded-3xl overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#FAF9F5] border-b border-border-custom text-xs font-mono uppercase text-secondary">
                <th className="py-4 px-6 font-semibold">Student Name</th>
                <th className="py-4 px-6 font-semibold">Contact Email</th>
                <th className="py-4 px-6 font-semibold">Enrolled Course</th>
                <th className="py-4 px-6 font-semibold">Registration Date</th>
                <th className="py-4 px-6 font-semibold">Completed Lessons</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              {studentsList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs font-mono text-secondary">
                    No registered students found in database.
                  </td>
                </tr>
              ) : (
                studentsList.map((st) => {
                  const isPaid = st.enrollments && st.enrollments.length > 0;
                  const courseTitle = isPaid
                    ? st.enrollments[0]?.course?.title || "Social Media Manager"
                    : "Registered (Pending Payment)";
                  const completedCount = st.progress?.length || 0;

                  return (
                    <tr key={st.id} className="hover:bg-[#F5F3EE]/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-primary">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xs">
                            {st.name ? st.name.charAt(0).toUpperCase() : "S"}
                          </div>
                          <span>{st.name || "Student"}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-secondary">{st.email}</td>
                      <td className="py-4 px-6">
                        {isPaid ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-accent/30 text-primary border border-primary/20">
                            ✓ {courseTitle}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-mono text-secondary bg-[#F5F3EE] border border-border-custom">
                            {courseTitle}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-secondary">
                        {formatDate(st.createdAt)}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-mono text-xs font-bold text-primary bg-[#F5F3EE] px-2.5 py-1 rounded">
                          {completedCount} lessons done
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
