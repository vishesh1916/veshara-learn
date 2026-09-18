"use client";

import * as React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Lock, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, LogOut, ArrowLeft } from "lucide-react";
import { COURSE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

interface LockedCoursePaywallProps {
  studentName: string;
  studentEmail: string;
}

export function LockedCoursePaywall({
  studentName,
  studentEmail,
}: LockedCoursePaywallProps) {
  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Brand Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between py-4 border-b border-border-custom">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <span className="font-serif font-bold text-2xl text-primary tracking-[-0.04em] uppercase">
            Veshara<span className="text-secondary font-light">.learn</span>
          </span>
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-primary transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Paywall Card */}
      <div className="my-auto py-10">
        <div className="max-w-2xl mx-auto bg-white border-2 border-primary rounded-3xl p-6 sm:p-12 shadow-2xl space-y-8 text-center">
          {/* Lock Icon Pill */}
          <div className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center mx-auto border-2 border-primary shadow-sm">
            <Lock className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 text-xs font-mono font-bold uppercase">
              <span>Enrollment Required</span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
              Student LMS Access Locked
            </h1>
            <p className="text-secondary text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Hello <strong className="text-primary">{studentName}</strong> ({studentEmail}). You are signed in, but you haven&apos;t enrolled in the course yet. Complete enrollment to unlock all 45 lessons, video walkthroughs, and verified certificate.
            </p>
          </div>

          {/* Value Highlights Box */}
          <div className="bg-[#F5F3EE] rounded-2xl p-5 border border-border-custom text-left space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-secondary block">
              What You Unlock Instantly:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-medium text-primary">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent fill-primary shrink-0" />
                <span>All 45 Practical Video Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent fill-primary shrink-0" />
                <span>8 In-Depth Modules & Frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent fill-primary shrink-0" />
                <span>Downloadable Cheatsheets & Calendars</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent fill-primary shrink-0" />
                <span>Official Verified Certificate</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-2 space-y-4">
            <div className="flex items-baseline justify-center gap-3">
              <span className="font-serif font-bold text-4xl sm:text-5xl text-primary">
                {COURSE.priceDisplay}
              </span>
              <span className="text-sm font-mono text-secondary line-through">
                {COURSE.originalPriceDisplay}
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-accent text-primary border border-primary/20">
                {COURSE.discountPercentage}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                href="/enroll"
                variant="primary"
                size="lg"
                arrow
                className="w-full sm:w-auto py-4 px-8 text-base shadow-lg"
              >
                Pay {COURSE.priceDisplay} & Unlock LMS
              </Button>
              <Button
                href="/"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Home</span>
              </Button>
            </div>

            <p className="text-[11px] font-mono text-secondary">
              Instant lifetime access • Secure UPI, Cards & Netbanking via Razorpay
            </p>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="max-w-4xl mx-auto w-full text-center py-4 border-t border-border-custom text-xs font-mono text-secondary">
        Need assistance? Email support at <strong className="text-primary">arisharajput100@gmail.com</strong>
      </div>
    </div>
  );
}
