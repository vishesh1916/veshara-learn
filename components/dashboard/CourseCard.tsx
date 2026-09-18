import * as React from "react";
import Link from "next/link";
import { BookOpen, Play, CheckCircle2, ArrowRight } from "lucide-react";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { Button } from "@/components/ui/Button";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    slug: string;
    shortDesc?: string;
  };
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

export function CourseCard({
  course,
  progress,
  totalLessons,
  completedLessons,
}: CourseCardProps) {
  const isStarted = completedLessons > 0;
  const isCompleted = progress === 100;

  return (
    <div className="bg-white border-2 border-primary rounded-3xl p-6 sm:p-8 shadow-subtle flex flex-col justify-between h-full hover:shadow-card-hover transition-all">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-accent text-primary px-3 py-1 rounded-full border border-primary/20">
            {isCompleted ? "Completed ✓" : isStarted ? "In Progress" : "Enrolled"}
          </span>
          <span className="text-xs font-mono text-secondary">
            {completedLessons} / {totalLessons} Lessons
          </span>
        </div>

        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-primary uppercase mb-2 tracking-tight">
          {course.title}
        </h3>

        <p className="text-secondary text-sm leading-relaxed mb-6">
          {course.shortDesc || "From Beginner to Client-Ready: 8 modules covering strategy, content, analytics, and client retainers."}
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar value={progress} />
        </div>
      </div>

      <div className="pt-4 border-t border-border-custom flex items-center justify-between gap-4">
        <Button
          href={`/dashboard/courses/${course.slug || "social-media-manager"}`}
          variant="primary"
          size="md"
          arrow
          className="w-full justify-between"
        >
          <span>
            {isCompleted
              ? "Review Lessons ✓"
              : isStarted
              ? `Continue Learning (${progress}%)`
              : "Start Course"}
          </span>
        </Button>
      </div>
    </div>
  );
}
