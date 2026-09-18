"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Award, Download, CheckCircle2, Share2, Printer, ShieldCheck, Lock, ArrowRight } from "lucide-react";
import { COURSE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/dashboard/ProgressBar";

export default function CertificatesPage() {
  const { data: session } = useSession();
  const studentName = session?.user?.name || "Enrolled Student";

  const [loading, setLoading] = React.useState(true);
  const [completedCount, setCompletedCount] = React.useState(0);
  const [totalLessonsCount, setTotalLessonsCount] = React.useState(45);
  const [progressPercent, setProgressPercent] = React.useState(0);

  React.useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setCompletedCount(json.completedCount || 0);
            setTotalLessonsCount(json.totalLessonsCount || 45);
            setProgressPercent(json.progressPercent || 0);
          }
        }
      } catch (err) {
        console.warn("Certificates progress notice:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, []);

  const isCompleted = completedCount >= totalLessonsCount && totalLessonsCount > 0;
  const userUniqueKey = session?.user?.email
    ? Math.abs(
        session.user.email.split("").reduce((acc, char) => acc + char.charCodeAt(0), 1000)
      ) % 90000 + 10000
    : "89421";

  const certId = isCompleted
    ? `VL-2026-${userUniqueKey}`
    : "VL-PREVIEW-PENDING";

  const issueDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    if (!isCompleted) {
      toast.info("Certificate is currently in preview mode. Finish all lessons to print the official credential.");
    }
    window.print();
  };

  return (
    <div className="space-y-10 pb-16">
      <div className="space-y-2 pb-6 border-b border-border-custom">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
          Verified Credentials
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
          Course Completion Certificate
        </h1>
        <p className="text-secondary text-sm sm:text-base font-sans">
          Your official Veshara Learn verified certificate is generated automatically upon finishing all 45 lessons.
        </p>
      </div>

      {/* Progress / Unlock Notification Banner */}
      {!isCompleted && !loading && (
        <div className="bg-white border-2 border-primary rounded-2xl p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-secondary">
              <Lock className="w-4 h-4 text-primary" />
              <span>Certificate Status: In Progress</span>
            </div>
            <h3 className="font-serif font-bold text-2xl text-primary uppercase">
              {completedCount} of {totalLessonsCount} Lessons Completed ({progressPercent}%)
            </h3>
            <p className="text-sm text-secondary leading-relaxed">
              Complete every lesson and capstone project in your curriculum to unlock and verify your tamper-proof digital certificate.
            </p>
            <div className="pt-2">
              <ProgressBar value={progressPercent} />
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Button
              href="/dashboard/courses/social-media-manager"
              variant="primary"
              size="lg"
              arrow
              className="w-full md:w-auto"
            >
              Continue Lessons
            </Button>
          </div>
        </div>
      )}

      {/* Official Certificate Visual Canvas (Printable) */}
      <div className="bg-white border-4 border-primary rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto print:border-2 print:shadow-none">
        {/* Subtle decorative security watermark */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#11110F_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Locked watermark overlay if not yet complete */}
        {!isCompleted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="border-4 border-dashed border-primary/20 rotate-[-12deg] px-8 py-3 rounded-2xl bg-white/70 backdrop-blur-[1px]">
              <span className="font-mono font-bold text-lg sm:text-2xl text-primary/40 uppercase tracking-widest">
                Certificate Preview • Course Completion Required
              </span>
            </div>
          </div>
        )}

        {/* Certificate Border Corner Accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary" />

        <div className="relative z-10 space-y-6">
          {/* Organization Logo */}
          <div className="inline-block">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-primary tracking-[-0.04em] uppercase">
              Veshara<span className="text-secondary font-light">.learn</span>
            </span>
            <p className="text-[11px] font-mono tracking-widest uppercase text-secondary mt-1">
              Certificate of Completion
            </p>
          </div>

          <div className="space-y-1 pt-4">
            <p className="text-xs font-mono uppercase text-secondary">This is proudly awarded to</p>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-primary capitalize tracking-tight">
              {studentName}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-secondary max-w-xl mx-auto leading-relaxed">
            for successfully completing the comprehensive professional program and demonstrating mastery in practical social media strategy, content creation, organic growth, executive analytics, and client retainers in:
          </p>

          <div className="py-2">
            <span className="font-serif font-bold text-2xl sm:text-3xl text-primary uppercase underline decoration-accent decoration-4 underline-offset-8">
              {COURSE.title}
            </span>
            <p className="text-xs font-mono text-secondary mt-2">
              From Beginner to Client-Ready • 45 Lessons & 6 Portfolio Capstones
            </p>
          </div>

          {/* Signatures & Verification Meta */}
          <div className="pt-10 border-t border-border-custom flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto text-left">
            <div>
              <p className="font-serif italic text-lg text-primary font-bold">Arisha Rajput</p>
              <p className="text-[11px] font-mono uppercase text-secondary">Lead Instructor & Founder</p>
              <p className="text-[10px] font-mono text-secondary">Veshara Learn Education</p>
            </div>

            <div className="sm:text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-accent/20 border border-primary/20 text-xs font-mono font-bold text-primary mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>{isCompleted ? "Verified Credential" : "Official Credential Preview"}</span>
              </div>
              <p className="text-[11px] font-mono text-secondary">
                Certificate ID: <strong className="text-primary font-mono">{certId}</strong>
              </p>
              <p className="text-[10px] font-mono text-secondary">Issued on: {issueDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons for Student */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4 print:hidden">
        <Button onClick={handlePrint} variant="primary" size="lg">
          <Printer className="w-4 h-4 mr-2" />
          <span>Print / Save as PDF</span>
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Certificate link copied to clipboard!");
          }}
          variant="outline"
          size="lg"
        >
          <Share2 className="w-4 h-4 mr-2" />
          <span>Share Credential Link</span>
        </Button>
      </div>
    </div>
  );
}
