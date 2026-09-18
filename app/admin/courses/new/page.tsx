"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NewCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    title: "",
    subtitle: "",
    description: "",
    price: 199,
    isPublished: true,
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create course");
      }

      toast.success("Course created successfully!");
      router.push(`/admin/courses/${data.course.slug || data.course.id}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to create course");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-3xl">
      <div>
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </Link>

        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
          Create New Course
        </h1>
        <p className="text-secondary text-sm sm:text-base mt-1">
          Set up title, pricing, and curriculum parameters.
        </p>
      </div>

      <div className="bg-white border-2 border-primary rounded-3xl p-6 sm:p-10 shadow-subtle">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Course Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI-Powered Freelancer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Short Subtitle / Tagline *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. From Beginner to Paid Retainers"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Course Description *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Explain what practical skills the student will build..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Price (INR ₹) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-sm font-bold text-primary font-mono">
                ₹
              </span>
              <input
                type="number"
                required
                min={0}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full rounded-lg border border-border-custom bg-white pl-8 pr-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle font-mono font-bold"
              />
            </div>
            <p className="text-[11px] text-secondary">
              Set to ₹199 for high conversion volume.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-4 h-4 accent-primary rounded"
            />
            <label htmlFor="isPublished" className="text-xs font-mono font-bold text-primary">
              Publish immediately on website
            </label>
          </div>

          <div className="pt-4 border-t border-border-custom flex gap-3">
            <Button type="submit" variant="primary" size="lg" loading={loading}>
              <Save className="w-4 h-4 mr-2" />
              <span>Save & Continue to Lessons</span>
            </Button>
            <Button href="/admin/courses" variant="outline" size="lg">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
