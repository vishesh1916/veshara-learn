import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Plus, BookOpen, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Course Management — Veshara Learn Admin",
};

export default async function AdminCoursesPage() {
  let coursesList: any[] = [];
  try {
    coursesList = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
        enrollments: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.warn("AdminCoursesPage DB error:", err);
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-custom">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
            Curriculum Control
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
            Course Management
          </h1>
          <p className="text-secondary text-sm sm:text-base mt-1">
            Create, edit, organize modules, and manage student curriculum in real-time.
          </p>
        </div>

        <Button href="/admin/courses/new" variant="primary" size="md">
          <Plus className="w-4 h-4 mr-1.5" />
          <span>New Course</span>
        </Button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 gap-6">
        {coursesList.map((c: any) => {
          const totalLessons = c.modules?.reduce(
            (acc: number, m: any) => acc + (m.lessons?.length || 0),
            0
          ) || 0;

          return (
            <div
              key={c.id}
              className="bg-white border-2 border-primary rounded-3xl p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-xl">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold uppercase bg-accent text-primary px-3 py-0.5 rounded-full border border-primary/20">
                    {c.isPublished ? "● Live / Published" : "○ Draft"}
                  </span>
                  <span className="text-xs font-mono text-secondary">
                    {c.slug}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-primary uppercase tracking-tight">
                  {c.title}
                </h3>

                <p className="text-xs sm:text-sm text-secondary line-clamp-2">
                  {c.shortDesc || c.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-primary font-medium pt-1">
                  <span>{c.modules.length} Modules</span>
                  <span>•</span>
                  <span>{totalLessons} Video Lessons</span>
                  <span>•</span>
                  <span>{c.enrollments.length} Active Students</span>
                  <span>•</span>
                  <span className="font-bold text-primary">
                    {formatPrice(c.price)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href={`/admin/courses/${c.slug || c.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border-custom bg-white hover:border-primary text-xs font-mono font-bold text-primary transition-colors shadow-subtle"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Curriculum & Videos</span>
                </Link>

                <Link
                  href={`/dashboard/courses/${c.slug || c.id}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border-custom bg-[#F5F3EE] hover:border-primary text-xs font-mono font-bold text-secondary hover:text-primary transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Student View</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
