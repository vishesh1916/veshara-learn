import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { BookOpen, Award, CheckCircle2, ArrowRight, Download, Play } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { COURSE } from "@/lib/constants";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Student Dashboard — Veshara Learn",
  description: "Track your course progress, watch lessons, and access your certificates.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const studentName = session?.user?.name || "Student";
  const userEmail = session?.user?.email || "";

  let completedLessonsCount = 0;
  let totalLessonsCount = 45;
  let progressPercent = 0;
  let certificatesCount = 0;
  let resumeUrl = "/dashboard/courses/social-media-manager/lessons/mod-1-lesson-1";

  try {
    const [dbTotalLessons, user, allLessons] = await Promise.all([
      prisma.lesson.count(),
      userEmail
        ? prisma.user.findUnique({
            where: { email: userEmail.toLowerCase() },
            select: {
              id: true,
              progress: {
                where: { completed: true },
                select: { lessonId: true },
              },
              certificates: { select: { id: true } },
            },
          })
        : Promise.resolve(null),
      prisma.lesson.findMany({
        orderBy: [{ module: { order: "asc" } }, { order: "asc" }],
        select: { id: true, order: true },
      }),
    ]);

    if (dbTotalLessons > 0) totalLessonsCount = dbTotalLessons;

    if (user) {
      completedLessonsCount = user.progress.length;
      progressPercent = Math.min(
        100,
        Math.round((completedLessonsCount / (totalLessonsCount || 1)) * 100)
      );
      certificatesCount = user.certificates.length;

      // Determine the next uncompleted lesson
      const completedLessonIds = new Set(user.progress.map((p) => p.lessonId));
      const nextLesson =
        allLessons.find((l) => !completedLessonIds.has(l.id)) || allLessons[0];

      if (nextLesson) {
        resumeUrl = `/dashboard/courses/social-media-manager/lessons/${nextLesson.id}`;
      }
    }
  } catch (err) {
    console.warn("Dashboard student stats lookup notice:", err);
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-custom">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
            Student Portal
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
            Welcome back, {studentName.split(" ")[0]}!
          </h1>
          <p className="text-secondary text-sm sm:text-base mt-1">
            Continue your Social Media Manager journey. Build your proof one lesson at a time.
          </p>
        </div>

        <Button
          href={resumeUrl}
          variant="primary"
          size="md"
          arrow
          className="self-start sm:self-center shrink-0"
        >
          Resume Next Lesson
        </Button>
      </div>

      {/* 4 Quick Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white border border-border-custom rounded-2xl p-5 shadow-subtle">
          <span className="text-xs font-mono uppercase text-secondary">Enrolled Course</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-primary">01</span>
            <span className="text-xs text-secondary">Flagship</span>
          </div>
        </div>

        <div className="bg-white border border-border-custom rounded-2xl p-5 shadow-subtle">
          <span className="text-xs font-mono uppercase text-secondary">Course Progress</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-primary">{progressPercent}%</span>
            <span className="text-xs text-accent bg-primary px-1.5 py-0.5 rounded font-mono font-bold">Active</span>
          </div>
        </div>

        <div className="bg-white border border-border-custom rounded-2xl p-5 shadow-subtle">
          <span className="text-xs font-mono uppercase text-secondary">Lessons Done</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-primary">
              {completedLessonsCount}
            </span>
            <span className="text-xs text-secondary">/ {totalLessonsCount}</span>
          </div>
        </div>

        <div className="bg-white border border-border-custom rounded-2xl p-5 shadow-subtle">
          <span className="text-xs font-mono uppercase text-secondary">Certificates</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif font-bold text-3xl sm:text-4xl text-primary">
              {certificatesCount > 0 ? "01" : "00"}
            </span>
            <span className="text-xs text-secondary">{progressPercent === 100 ? "Ready" : "Pending"}</span>
          </div>
        </div>
      </div>

      {/* Course In Progress Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-primary uppercase">
            My Enrolled Courses
          </h2>
          <span className="text-xs font-mono text-secondary">Lifetime Access Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <CourseCard
            course={{
              id: "smm-course",
              title: COURSE.title,
              slug: COURSE.slug,
              shortDesc: COURSE.subtitle,
            }}
            progress={progressPercent}
            totalLessons={totalLessonsCount}
            completedLessons={completedLessonsCount}
          />
        </div>
      </div>

      {/* Quick Access Resource Banner */}
      <div className="bg-white border-2 border-primary rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-subtle">
        <div className="space-y-2 text-left">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent bg-primary px-2.5 py-0.5 rounded">
            Student Toolkit
          </span>
          <h3 className="font-serif font-bold text-2xl text-primary uppercase">
            Download Your Course Templates & Cheatsheets
          </h3>
          <p className="text-xs sm:text-sm text-secondary max-w-xl">
            Access your 30-Day Master Calendar spreadsheet, Canva pitch decks, SMM audit checklists, and outreach scripts in the Resource Library.
          </p>
        </div>
        <Button href="/dashboard/resources" variant="outline" size="md" className="whitespace-nowrap shrink-0">
          Open Resource Library →
        </Button>
      </div>
    </div>
  );
}
