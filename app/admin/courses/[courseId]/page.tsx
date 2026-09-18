"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Video,
  Save,
  ExternalLink,
  Check,
  X,
  Play,
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getYouTubeEmbedUrl } from "@/lib/utils";

interface LessonItem {
  id: string;
  moduleId: string;
  title: string;
  videoUrl: string;
  duration: number;
  order: number;
  isFreePreview: boolean;
  description?: string | null;
}

interface ModuleItem {
  id: string;
  courseId: string;
  title: string;
  description?: string | null;
  order: number;
  lessons: LessonItem[];
}

interface CourseData {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc?: string | null;
  price: number;
  isPublished: boolean;
  modules: ModuleItem[];
}

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseIdParam = (params.courseId as string) || "social-media-manager";

  const [loading, setLoading] = React.useState(true);
  const [course, setCourse] = React.useState<CourseData | null>(null);

  // General settings state
  const [courseTitle, setCourseTitle] = React.useState("");
  const [coursePrice, setCoursePrice] = React.useState(199);
  const [courseDesc, setCourseDesc] = React.useState("");
  const [isPublished, setIsPublished] = React.useState(true);
  const [savingSettings, setSavingSettings] = React.useState(false);

  // New Module modal state
  const [showAddModule, setShowAddModule] = React.useState(false);
  const [newModuleTitle, setNewModuleTitle] = React.useState("");
  const [creatingModule, setCreatingModule] = React.useState(false);

  // New Lesson modal state
  const [activeModuleForLesson, setActiveModuleForLesson] = React.useState<ModuleItem | null>(null);
  const [newLessonTitle, setNewLessonTitle] = React.useState("");
  const [newLessonVideo, setNewLessonVideo] = React.useState("");
  const [newLessonDuration, setNewLessonDuration] = React.useState(15);
  const [newLessonPreview, setNewLessonPreview] = React.useState(false);
  const [creatingLesson, setCreatingLesson] = React.useState(false);

  // Quick video edit state
  const [editingLessonId, setEditingLessonId] = React.useState<string | null>(null);
  const [quickVideoUrl, setQuickVideoUrl] = React.useState("");
  const [quickTitle, setQuickTitle] = React.useState("");
  const [updatingLesson, setUpdatingLesson] = React.useState(false);

  const fetchCourseData = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/courses/${courseIdParam}`);
      if (!res.ok) {
        throw new Error("Failed to load course");
      }
      const data = await res.json();
      if (data.course) {
        setCourse(data.course);
        setCourseTitle(data.course.title);
        setCoursePrice(Math.round(data.course.price / 100));
        setCourseDesc(data.course.description || "");
        setIsPublished(data.course.isPublished);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load course details");
    } finally {
      setLoading(false);
    }
  }, [courseIdParam]);

  React.useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  // Save General Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await fetch(`/api/admin/courses/${courseIdParam}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: courseTitle,
          price: coursePrice,
          description: courseDesc,
          isPublished,
        }),
      });

      if (!res.ok) throw new Error("Failed to save course settings");
      toast.success("Course settings saved successfully!");
      fetchCourseData();
    } catch (err: any) {
      toast.error(err.message || "Error saving settings");
    } finally {
      setSavingSettings(false);
    }
  };

  // Add Module
  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) {
      toast.error("Please enter a module title");
      return;
    }

    setCreatingModule(true);
    try {
      const res = await fetch(`/api/admin/courses/${courseIdParam}/modules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newModuleTitle }),
      });

      if (!res.ok) throw new Error("Failed to create module");
      toast.success("New module added successfully!");
      setNewModuleTitle("");
      setShowAddModule(false);
      fetchCourseData();
    } catch (err: any) {
      toast.error(err.message || "Failed to create module");
    } finally {
      setCreatingModule(false);
    }
  };

  // Delete Module
  const handleDeleteModule = async (moduleId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" and all its lessons?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/modules/${moduleId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete module");
      toast.success("Module deleted successfully.");
      fetchCourseData();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete module");
    }
  };

  // Create Lesson
  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModuleForLesson || !newLessonTitle || !newLessonVideo) {
      toast.error("Please fill in title and YouTube video URL/ID");
      return;
    }

    setCreatingLesson(true);
    try {
      const res = await fetch("/api/admin/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId: activeModuleForLesson.id,
          title: newLessonTitle,
          videoUrl: newLessonVideo,
          duration: newLessonDuration,
          isFreePreview: newLessonPreview,
        }),
      });

      if (!res.ok) throw new Error("Failed to create lesson");
      toast.success("Lesson published successfully! Students can now watch it.");
      setActiveModuleForLesson(null);
      setNewLessonTitle("");
      setNewLessonVideo("");
      fetchCourseData();
    } catch (err: any) {
      toast.error(err.message || "Failed to create lesson");
    } finally {
      setCreatingLesson(false);
    }
  };

  // Quick Update Lesson Video & Title
  const handleSaveQuickEdit = async (lessonId: string) => {
    if (!quickVideoUrl.trim() || !quickTitle.trim()) {
      toast.error("Lesson title and video cannot be empty");
      return;
    }

    setUpdatingLesson(true);
    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: quickTitle,
          videoUrl: quickVideoUrl,
        }),
      });

      if (!res.ok) throw new Error("Failed to update lesson");
      toast.success("Lesson updated! Students will instantly see the new video.");
      setEditingLessonId(null);
      fetchCourseData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update lesson");
    } finally {
      setUpdatingLesson(false);
    }
  };

  // Delete Lesson
  const handleDeleteLesson = async (lessonId: string, title: string) => {
    if (!confirm(`Delete lesson "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete lesson");
      toast.success("Lesson deleted.");
      fetchCourseData();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete lesson");
    }
  };

  const totalLessonsCount =
    course?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;

  if (loading) {
    return (
      <div className="p-12 text-center space-y-3 font-mono text-secondary">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Loading course structure from database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 max-w-5xl">
      {/* Header */}
      <div>
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider bg-accent text-primary px-2.5 py-0.5 rounded">
                Live Course Editor
              </span>
              <span className="text-xs font-mono text-secondary">
                Auto-syncs with student player
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight mt-1">
              {courseTitle || "Course Curriculum"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/courses/${course?.slug || courseIdParam}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border-custom bg-white hover:border-primary text-xs font-mono text-primary font-bold shadow-subtle"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Student Player</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Course Info Card */}
      <div className="bg-white border border-border-custom rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
        <div className="flex items-center justify-between border-b border-border-custom pb-3">
          <h3 className="font-serif font-bold text-xl text-primary uppercase">
            General Course Settings
          </h3>
          <span className="text-xs font-mono text-secondary">
            Changes reflect instantly on landing page & student portal
          </span>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Course Title
              </label>
              <input
                type="text"
                required
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full rounded-lg border border-border-custom bg-white px-3.5 py-2 text-sm text-primary font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Student Price (₹ INR)
              </label>
              <input
                type="number"
                min={0}
                required
                value={coursePrice}
                onChange={(e) => setCoursePrice(Number(e.target.value))}
                className="w-full rounded-lg border border-border-custom bg-white px-3.5 py-2 text-sm text-primary font-mono font-bold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Course Description
            </label>
            <textarea
              rows={2}
              value={courseDesc}
              onChange={(e) => setCourseDesc(e.target.value)}
              className="w-full rounded-lg border border-border-custom bg-white px-3.5 py-2 text-sm text-primary"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <label className="flex items-center gap-2 text-xs font-mono font-bold text-primary cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 accent-primary rounded"
              />
              <span>Published & Available to Students</span>
            </label>

            <Button type="submit" variant="primary" size="sm" loading={savingSettings}>
              <Save className="w-3.5 h-3.5 mr-1.5" />
              <span>Save Course Settings</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Modules & Lessons Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-primary uppercase">
              Modules & Video Lessons
            </h3>
            <p className="text-xs text-secondary mt-0.5 font-mono">
              {course?.modules?.length || 0} Modules • {totalLessonsCount} Lessons in Database
            </p>
          </div>

          <Button
            onClick={() => setShowAddModule(true)}
            variant="primary"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Add New Module</span>
          </Button>
        </div>

        {/* Add Module Modal / Box */}
        {showAddModule && (
          <div className="bg-[#F5F3EE] border-2 border-primary rounded-2xl p-5 shadow-lg space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-lg text-primary uppercase">
                Create New Module
              </span>
              <button
                onClick={() => setShowAddModule(false)}
                className="text-secondary hover:text-primary p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateModule} className="space-y-3">
              <input
                type="text"
                required
                placeholder="e.g. Module 09: AI Tools & Workflow Automation"
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                className="w-full rounded-lg border border-border-custom bg-white px-3.5 py-2.5 text-sm text-primary placeholder:text-secondary"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModule(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={creatingModule}
                >
                  Save Module
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Modules List */}
        <div className="space-y-6">
          {course?.modules?.map((mod, modIdx) => (
            <div
              key={mod.id}
              className="bg-white border border-border-custom rounded-2xl overflow-hidden shadow-subtle"
            >
              {/* Module Header */}
              <div className="p-4 sm:p-5 bg-[#FAF9F5] border-b border-border-custom flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-primary text-cream shrink-0">
                    MOD {mod.order || modIdx + 1}
                  </span>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-primary uppercase">
                    {mod.title}
                  </h4>
                  <span className="text-xs font-mono text-secondary">
                    ({mod.lessons?.length || 0} lessons)
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setActiveModuleForLesson(mod);
                      setNewLessonTitle("");
                      setNewLessonVideo("");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-primary text-xs font-bold hover:bg-[#cbf21f] transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Lesson</span>
                  </button>

                  <button
                    onClick={() => handleDeleteModule(mod.id, mod.title)}
                    className="p-1.5 text-secondary hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                    title="Delete Module"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add Lesson Form for this specific module */}
              {activeModuleForLesson?.id === mod.id && (
                <div className="p-5 bg-[#F5F3EE] border-b border-border-custom space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-primary uppercase">
                      New Lesson in {mod.title}
                    </span>
                    <button
                      onClick={() => setActiveModuleForLesson(null)}
                      className="text-secondary hover:text-primary"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateLesson} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-primary mb-1">
                          Lesson Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Setting Up Meta Business Suite"
                          value={newLessonTitle}
                          onChange={(e) => setNewLessonTitle(e.target.value)}
                          className="w-full rounded-lg border border-border-custom bg-white px-3 py-2 text-xs text-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase text-primary mb-1">
                          YouTube Video ID or Link * (Unlisted)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. dQw4w9WgXcQ or https://youtu.be/..."
                          value={newLessonVideo}
                          onChange={(e) => setNewLessonVideo(e.target.value)}
                          className="w-full rounded-lg border border-border-custom bg-white px-3 py-2 text-xs text-primary font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-secondary">Duration:</span>
                          <input
                            type="number"
                            min={1}
                            value={newLessonDuration}
                            onChange={(e) => setNewLessonDuration(Number(e.target.value))}
                            className="w-16 rounded border border-border-custom bg-white px-2 py-1 text-xs font-mono"
                          />
                          <span className="font-mono text-secondary">mins</span>
                        </div>

                        <label className="flex items-center gap-1.5 font-mono cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newLessonPreview}
                            onChange={(e) => setNewLessonPreview(e.target.checked)}
                            className="w-3.5 h-3.5 accent-primary rounded"
                          />
                          <span>Free Preview</span>
                        </label>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveModuleForLesson(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          size="sm"
                          loading={creatingLesson}
                        >
                          Upload Lesson to DB
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Lessons List in Module */}
              <div className="divide-y divide-border-custom">
                {mod.lessons?.length === 0 ? (
                  <div className="p-5 text-center text-xs font-mono text-secondary">
                    No lessons yet in this module. Click &quot;+ Add Lesson&quot; above to add one.
                  </div>
                ) : (
                  mod.lessons.map((les, lIdx) => {
                    const isEditing = editingLessonId === les.id;

                    if (isEditing) {
                      return (
                        <div key={les.id} className="p-4 bg-accent/10 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold uppercase text-primary">
                              Quick Edit Lesson {lIdx + 1}
                            </span>
                            <button
                              onClick={() => setEditingLessonId(null)}
                              className="text-secondary hover:text-primary"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={quickTitle}
                              onChange={(e) => setQuickTitle(e.target.value)}
                              placeholder="Lesson title"
                              className="rounded-lg border border-border-custom bg-white px-3 py-1.5 text-xs text-primary"
                            />
                            <input
                              type="text"
                              value={quickVideoUrl}
                              onChange={(e) => setQuickVideoUrl(e.target.value)}
                              placeholder="YouTube Video ID or URL"
                              className="rounded-lg border border-border-custom bg-white px-3 py-1.5 text-xs font-mono text-primary"
                            />
                          </div>

                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditingLessonId(null)}
                              className="px-3 py-1 text-xs text-secondary hover:text-primary"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveQuickEdit(les.id)}
                              disabled={updatingLesson}
                              className="px-3.5 py-1.5 rounded-lg bg-primary text-cream text-xs font-bold hover:bg-[#252522] transition-colors"
                            >
                              {updatingLesson ? "Saving..." : "Save Video"}
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={les.id}
                        className="p-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F5F3EE]/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#FAF9F5] border border-border-custom text-secondary text-[11px] font-mono flex items-center justify-center shrink-0">
                            {les.order || lIdx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-semibold text-primary">
                                {les.title}
                              </h5>
                              {les.isFreePreview && (
                                <span className="text-[10px] font-mono font-bold bg-accent text-primary px-1.5 py-0.2 rounded">
                                  FREE PREVIEW
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-[11px] font-mono text-secondary mt-0.5">
                              <span className="flex items-center gap-1 text-primary">
                                <Video className="w-3 h-3 text-secondary" />
                                <span className="underline truncate max-w-[200px]">
                                  {les.videoUrl}
                                </span>
                              </span>
                              <span>•</span>
                              <span>{les.duration || 15} mins</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingLessonId(les.id);
                              setQuickTitle(les.title);
                              setQuickVideoUrl(les.videoUrl);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF9F5] border border-border-custom hover:border-primary text-xs font-mono text-primary transition-all cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit Video</span>
                          </button>

                          <button
                            onClick={() => handleDeleteLesson(les.id, les.title)}
                            className="p-1 text-secondary hover:text-red-600 rounded transition-colors"
                            title="Delete Lesson"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
