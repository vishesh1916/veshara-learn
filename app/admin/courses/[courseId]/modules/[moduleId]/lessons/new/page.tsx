"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, Save, Video, HelpCircle, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getYouTubeEmbedUrl } from "@/lib/utils";

export default function NewLessonPage() {
  const params = useParams();
  const router = useRouter();

  const [lessonTitle, setLessonTitle] = React.useState("");
  const [videoInput, setVideoInput] = React.useState("");
  const [duration, setDuration] = React.useState(15);
  const [description, setDescription] = React.useState("");
  const [isFreePreview, setIsFreePreview] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Extract clean video embed URL for live preview
  const previewEmbedUrl = videoInput ? getYouTubeEmbedUrl(videoInput) : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle || !videoInput) {
      toast.error("Please enter a lesson title and video ID/URL.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: params.courseId,
          moduleId: params.moduleId,
          title: lessonTitle,
          videoUrl: videoInput,
          duration,
          description,
          isFreePreview,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to publish lesson");
      }

      toast.success("New lesson published and live for students!");
      router.push(`/admin/courses/${params.courseId}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to save lesson");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl">
      <div>
        <Link
          href={`/admin/courses/${params.courseId}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Structure</span>
        </Link>

        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
          Add New Video Lesson
        </h1>
        <p className="text-secondary text-sm sm:text-base mt-1">
          Paste your YouTube Unlisted video link below. It will stream seamlessly inside your course player.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-primary rounded-3xl p-6 sm:p-8 shadow-subtle space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Lesson Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Setting Up Your First Meta Business Suite"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="w-full rounded-lg border border-border-custom bg-white px-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                  YouTube Video Link or ID *
                </label>
                <span className="text-[11px] font-mono text-secondary">
                  Unlisted Video Recommended
                </span>
              </div>
              <input
                type="text"
                required
                placeholder="e.g. dQw4w9WgXcQ or https://youtu.be/..."
                value={videoInput}
                onChange={(e) => setVideoInput(e.target.value)}
                className="w-full rounded-lg border border-border-custom bg-white px-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle font-mono"
              />
              <p className="text-[11px] text-secondary">
                Upload to YouTube as <strong>Unlisted</strong>, then paste the URL or ID here. Only your enrolled students can view it.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full rounded-lg border border-border-custom bg-white px-3.5 py-2 text-sm text-primary font-mono"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-center pt-5">
                <label className="flex items-center gap-2 text-xs font-mono font-bold text-primary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFreePreview}
                    onChange={(e) => setIsFreePreview(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span>Free Preview Lesson</span>
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Lesson Overview & Action Notes
              </label>
              <textarea
                rows={3}
                placeholder="Describe key takeaways and instructions for this lesson..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-border-custom bg-white px-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
              />
            </div>

            <div className="pt-3 flex gap-3">
              <Button type="submit" variant="primary" size="lg" loading={loading} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                <span>Publish Lesson</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Live Video Player Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-border-custom rounded-2xl p-5 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border-custom">
              <span className="text-xs font-mono font-bold uppercase text-secondary">
                Live Video Preview
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent text-primary font-bold">
                Interactive
              </span>
            </div>

            {previewEmbedUrl ? (
              <div className="w-full bg-black rounded-xl overflow-hidden aspect-video relative shadow-lg">
                <iframe
                  src={previewEmbedUrl}
                  title="Live Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="w-full bg-[#F5F3EE] rounded-xl border border-dashed border-border-custom aspect-video flex flex-col items-center justify-center text-center p-6 text-secondary">
                <Video className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs font-mono">
                  Paste a YouTube URL to test your video embed.
                </p>
              </div>
            )}

            <div className="p-3 bg-[#F5F3EE] rounded-xl text-xs text-secondary space-y-1 font-mono">
              <p className="font-bold text-primary">How video embedding works:</p>
              <p>1. Record your lesson video.</p>
              <p>2. Upload to YouTube & choose &quot;Unlisted&quot;.</p>
              <p>3. Paste the URL here — students watch smoothly inside Veshara Learn!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
