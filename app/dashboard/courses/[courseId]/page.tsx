import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock, Sparkles, ArrowRight, Award } from "lucide-react";
import { COURSE, CURRICULUM } from "@/lib/constants";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { Button } from "@/components/ui/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Course Overview — Social Media Manager | Veshara Learn",
};

export default async function CourseOverviewPage({
  params,
}: {
  params: { courseId: string };
}) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email || "";

  // Fetch course and curriculum directly from database in parallel with user progress
  let dbCourse = null;
  let user = null;
  try {
    const [courseResult, userResult] = await Promise.all([
      prisma.course.findFirst({
        where: {
          OR: [{ id: params.courseId }, { slug: params.courseId }],
        },
        include: {
          modules: {
            orderBy: { order: "asc" },
            include: {
              lessons: {
                orderBy: { order: "asc" },
              },
            },
          },
        },
      }),
      userEmail
        ? prisma.user.findUnique({
            where: { email: userEmail.toLowerCase() },
            select: {
              progress: {
                where: { completed: true },
                select: { lessonId: true },
              },
            },
          })
        : Promise.resolve(null),
    ]);
    dbCourse = courseResult;
    user = userResult;
  } catch (e) {
    console.warn("CourseOverviewPage DB query notice:", e);
  }

  // Calculate live modules and lessons
  const modulesList =
    dbCourse?.modules && dbCourse.modules.length > 0
      ? dbCourse.modules
      : CURRICULUM.map((c, idx) => ({
          id: `mod-${c.number}`,
          order: parseInt(c.number, 10) || idx + 1,
          title: c.title,
          description: c.project,
          lessons: c.lessons.map((title, lIdx) => ({
            id: `mod-${c.number}-lesson-${lIdx + 1}`,
            title,
            duration: 15,
            order: lIdx + 1,
            videoUrl: "dQw4w9WgXcQ",
          })),
        }));

  const totalLessons = modulesList.reduce(
    (acc: number, m: any) => acc + (m.lessons?.length || 0),
    0
  );

  const completedLessonIds = new Set<string>();
  user?.progress?.forEach((p) => {
    completedLessonIds.add(p.lessonId);
  });

  const completedLessons = user?.progress?.length || 0;
  const progressPercent = Math.min(
    100,
    Math.round((completedLessons / (totalLessons || 1)) * 100)
  );

  // Determine next uncompleted lesson to resume
  let resumeLessonId = modulesList[0]?.lessons[0]?.id || "mod-1-lesson-1";
  for (const m of modulesList) {
    const uncompleted = m.lessons?.find(
      (l: any) =>
        !completedLessonIds.has(l.id) &&
        !completedLessonIds.has(`mod-${m.order}-lesson-${l.order}`)
    );
    if (uncompleted) {
      resumeLessonId = uncompleted.id;
      break;
    }
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Course Banner */}
      <div className="bg-white border-2 border-primary rounded-3xl p-6 sm:p-10 shadow-subtle space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider bg-accent text-primary px-3 py-1 rounded-full border border-primary/20">
            Enrolled • Lifetime Access
          </span>
          <span className="text-xs font-mono text-secondary">
            {totalLessons} Lessons • {modulesList.length} Modules
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
            {dbCourse?.title || COURSE.title}
          </h1>
          <p className="text-secondary text-base sm:text-lg font-serif italic">
            {dbCourse?.shortDesc || COURSE.subtitle}
          </p>
        </div>

        <p className="text-secondary text-sm sm:text-base leading-relaxed max-w-3xl">
          {dbCourse?.description || COURSE.description} Complete the assignments in each module to construct your verified 6-piece portfolio and earn your graduation certificate.
        </p>

        {/* Progress bar container */}
        <div className="p-4 sm:p-5 bg-[#F5F3EE] rounded-2xl border border-border-custom max-w-xl">
          <ProgressBar value={progressPercent} />
          <p className="text-xs font-mono text-secondary mt-2">
            {completedLessons} of {totalLessons} lessons completed ({progressPercent}%)
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-4">
          <Button
            href={`/dashboard/courses/${params.courseId}/lessons/${resumeLessonId}`}
            variant="primary"
            size="lg"
            arrow
          >
            Start / Continue Learning
          </Button>
          <Button href="/dashboard/certificates" variant="outline" size="lg">
            <Award className="w-4 h-4 mr-2" />
            <span>View Certificate Status</span>
          </Button>
        </div>
      </div>

      {/* Modules Syllabus List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border-custom">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-primary uppercase">
            Course Curriculum Breakdown
          </h2>
          <span className="text-xs font-mono text-secondary">Click any lesson to open player</span>
        </div>

        <div className="space-y-6">
          {modulesList.map((mod, modIdx) => (
            <div
              key={mod.id}
              className="bg-white border border-border-custom rounded-2xl overflow-hidden shadow-subtle"
            >
              <div className="p-5 sm:p-6 bg-[#FAF9F5] border-b border-border-custom flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-primary text-cream">
                    MODULE {mod.order || modIdx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-primary uppercase">
                    {mod.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-secondary">
                  {mod.lessons.length} Lessons • {mod.lessons.reduce((acc: number, l: any) => acc + (l.duration || 15), 0)} mins
                </span>
              </div>

              {/* Lesson Items */}
              <div className="divide-y divide-border-custom">
                {mod.lessons.map((lesson, lesIdx) => {
                  const isDone =
                    completedLessonIds.has(lesson.id) ||
                    completedLessonIds.has(
                      `mod-${mod.order || modIdx + 1}-lesson-${lesson.order || lesIdx + 1}`
                    );

                  return (
                    <Link
                      key={lesson.id}
                      href={`/dashboard/courses/${params.courseId}/lessons/${lesson.id}`}
                      className="flex items-center justify-between p-4 sm:px-6 hover:bg-[#F5F3EE]/80 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                            isDone
                              ? "bg-accent text-primary border border-primary/20"
                              : "bg-[#F5F3EE] text-secondary border border-border-custom"
                          }`}
                        >
                          {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : (lesson.order || lesIdx + 1)}
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-medium text-primary group-hover:underline">
                            {lesson.title}
                          </h4>
                          <span className="text-[11px] font-mono text-secondary flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration || 15} mins • Video Lesson</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-secondary group-hover:text-primary">
                        <span>{isDone ? "Completed" : "Watch"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Capstone Box */}
              {mod.description && (
                <div className="p-4 bg-accent/15 border-t border-primary/10 flex items-center gap-2.5 text-xs text-primary">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>Module Milestone:</strong> {mod.description}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
