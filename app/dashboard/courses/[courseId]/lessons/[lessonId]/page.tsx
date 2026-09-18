"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  Sparkles,
  Award,
  Menu,
  X,
  Play,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { getYouTubeEmbedUrl } from "@/lib/utils";
import { CURRICULUM, COURSE } from "@/lib/constants";

interface LessonData {
  id: string;
  moduleId: string;
  title: string;
  videoUrl: string;
  duration: number;
  order: number;
  description?: string | null;
  isFreePreview?: boolean;
}

interface ModuleData {
  id: string;
  title: string;
  order: number;
  description?: string | null;
  lessons: LessonData[];
}

interface CoursePayload {
  id: string;
  title: string;
  slug: string;
  modules: ModuleData[];
}

export default function CoursePlayerPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = (params.courseId as string) || "social-media-manager";
  const lessonId = (params.lessonId as string) || "mod-1-lesson-1";

  const [loading, setLoading] = React.useState(true);
  const [courseData, setCourseData] = React.useState<CoursePayload | null>(null);
  const [completedLessons, setCompletedLessons] = React.useState<string[]>([]);
  const [progressPercent, setProgressPercent] = React.useState<number>(0);
  const [savingProgress, setSavingProgress] = React.useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Fetch real student progress from backend database
  React.useEffect(() => {
    let isMounted = true;
    async function loadProgress() {
      try {
        const res = await fetch("/api/progress");
        if (res.ok) {
          const json = await res.json();
          if (json.success && isMounted) {
            setCompletedLessons(json.completedLessonIds || []);
            setProgressPercent(json.progressPercent || 0);
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic progress:", err);
      }
    }
    loadProgress();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch course structure from database
  React.useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (res.ok) {
          const json = await res.json();
          if (json.course && isMounted) {
            setCourseData(json.course);
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic course syllabus:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [courseId]);

  // Build unified modules list from DB or fallback
  const modulesList: ModuleData[] = React.useMemo(() => {
    if (courseData?.modules && courseData.modules.length > 0) {
      return courseData.modules;
    }
    // Fallback if DB is loading or empty
    return CURRICULUM.map((c, idx) => ({
      id: `mod-${c.number}`,
      order: parseInt(c.number, 10) || idx + 1,
      title: c.title,
      description: c.project,
      lessons: c.lessons.map((title, lIdx) => ({
        id: `mod-${c.number}-lesson-${lIdx + 1}`,
        moduleId: `mod-${c.number}`,
        title,
        videoUrl: "dQw4w9WgXcQ",
        duration: 15,
        order: lIdx + 1,
        description: null,
      })),
    }));
  }, [courseData]);

  // Flatten all lessons into an ordered array for linear navigation
  const allLessons = React.useMemo(() => {
    const list: { lesson: LessonData; module: ModuleData; modIndex: number; lessonIndex: number }[] = [];
    modulesList.forEach((m, mIdx) => {
      m.lessons.forEach((l, lIdx) => {
        list.push({ lesson: l, module: m, modIndex: mIdx, lessonIndex: lIdx });
      });
    });
    return list;
  }, [modulesList]);

  // Find active lesson by id or slug match
  const activeItem = React.useMemo(() => {
    // 1. Direct ID match
    const direct = allLessons.find((item) => item.lesson.id === lessonId);
    if (direct) return direct;

    // 2. Slug match like mod-1-lesson-2
    if (lessonId.startsWith("mod-")) {
      const parts = lessonId.split("-");
      const mNum = parseInt(parts[1] || "1", 10);
      const lNum = parseInt(parts[3] || parts[2] || "1", 10);
      const match = allLessons.find(
        (item) => item.module.order === mNum && item.lesson.order === lNum
      );
      if (match) return match;
    }

    // 3. Fallback to first lesson
    return allLessons[0] || null;
  }, [allLessons, lessonId]);

  const currentLesson = activeItem?.lesson;
  const currentModule = activeItem?.module;
  const currentIdx = activeItem ? allLessons.indexOf(activeItem) : 0;

  const prevItem = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextItem = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  const currentLessonId = currentLesson?.id || lessonId;

  const checkIsLessonDone = React.useCallback(
    (lesId: string, modOrder?: number, lesOrder?: number) => {
      if (completedLessons.includes(lesId)) return true;
      if (modOrder !== undefined && lesOrder !== undefined) {
        if (completedLessons.includes(`mod-${modOrder}-lesson-${lesOrder}`)) {
          return true;
        }
      }
      return false;
    },
    [completedLessons]
  );

  const isCurrentCompleted = checkIsLessonDone(
    currentLessonId,
    currentModule?.order,
    currentLesson?.order
  );

  // Distinct completed count across allLessons
  const distinctCompletedCount = React.useMemo(() => {
    let count = 0;
    allLessons.forEach((item) => {
      if (
        checkIsLessonDone(
          item.lesson.id,
          item.module.order,
          item.lesson.order
        )
      ) {
        count++;
      }
    });
    return count;
  }, [allLessons, checkIsLessonDone]);

  const liveProgressPercent =
    allLessons.length > 0
      ? Math.min(
          100,
          Math.round((distinctCompletedCount / allLessons.length) * 100)
        )
      : progressPercent;

  const handleToggleComplete = async (targetId?: string, forceState?: boolean) => {
    const idToToggle = targetId || currentLessonId;
    const currentDone = targetId
      ? checkIsLessonDone(targetId)
      : isCurrentCompleted;
    const nextState = forceState !== undefined ? forceState : !currentDone;

    // Optimistically update local list
    let nextList: string[];
    if (!nextState) {
      nextList = completedLessons.filter(
        (id) =>
          id !== idToToggle &&
          id !== `mod-${currentModule?.order}-lesson-${currentLesson?.order}`
      );
      toast.info("Lesson marked as incomplete.");
    } else {
      const toAdd = [idToToggle];
      if (currentModule?.order && currentLesson?.order) {
        toAdd.push(`mod-${currentModule.order}-lesson-${currentLesson.order}`);
      }
      nextList = Array.from(new Set([...completedLessons, ...toAdd]));
      toast.success("Lesson marked as complete! 🎉");
    }
    setCompletedLessons(nextList);

    try {
      setSavingProgress(true);
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: idToToggle,
          completed: nextState,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.completedLessonIds) {
          setCompletedLessons(data.completedLessonIds);
        }
        if (typeof data.progressPercent === "number") {
          setProgressPercent(data.progressPercent);
        }
        if (data.progressPercent === 100) {
          toast.success("🏆 100% Course Completed! Your certificate is unlocked!");
        }
        router.refresh();
      }
    } catch (e) {
      console.warn("Sync progress notice:", e);
    } finally {
      setSavingProgress(false);
    }
  };

  const videoUrl = currentLesson?.videoUrl || "dQw4w9WgXcQ";
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col -m-5 sm:-m-8 lg:-m-10">
      {/* Player Navigation Bar */}
      <header className="bg-primary text-cream px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 border-b border-[#252522]">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/courses/${courseId}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A1A09A] hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Course Overview</span>
          </Link>
          <span className="hidden sm:inline text-xs font-mono text-[#444]">•</span>
          <span className="text-xs font-mono font-bold uppercase text-accent truncate max-w-[220px] sm:max-w-md">
            {currentModule?.title || "Module"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-cream hover:text-accent focus:outline-none flex items-center gap-1.5 text-xs font-mono"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span>Syllabus</span>
          </button>

          <Link
            href="/dashboard/certificates"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded bg-[#22221F] text-cream hover:text-accent border border-[#333] transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certificate</span>
          </Link>
        </div>
      </header>

      {/* Main Player Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left / Top: Video Player & Lesson Details */}
        <div className="flex-1 p-4 sm:p-8 lg:p-10 space-y-8 overflow-y-auto">
          {/* Responsive 16:9 YouTube Video Embed Container */}
          <div className="w-full bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-primary relative aspect-video">
            <iframe
              key={embedUrl}
              src={embedUrl}
              title={currentLesson?.title || "Video Lesson"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Lesson Action Header */}
          <div className="bg-white border border-border-custom rounded-2xl p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-secondary">
                <span>{currentModule?.title || "Module"}</span>
                <span>•</span>
                <span>
                  Lesson {(activeItem?.lessonIndex ?? 0) + 1} of{" "}
                  {currentModule?.lessons.length || 1}
                </span>
                <span>•</span>
                <span>{currentLesson?.duration || 15} mins</span>
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-4xl text-primary tracking-tight uppercase">
                {currentLesson?.title || "Lesson Overview"}
              </h1>
            </div>

            {/* Mark as Complete & Next CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleToggleComplete()}
                disabled={savingProgress}
                className={`px-5 py-3 rounded-xl font-sans font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isCurrentCompleted
                    ? "bg-accent text-primary border border-primary shadow-[0_0_20px_rgba(217,255,37,0.3)]"
                    : "bg-primary text-cream hover:bg-[#252522] border border-primary"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isCurrentCompleted ? "Completed ✓" : "Mark as Complete"}
                </span>
              </button>

              {nextItem && !isCurrentCompleted && (
                <button
                  onClick={async () => {
                    await handleToggleComplete(currentLessonId, true);
                    router.push(
                      `/dashboard/courses/${courseId}/lessons/${nextItem.lesson.id}`
                    );
                  }}
                  disabled={savingProgress}
                  className="px-5 py-3 rounded-xl font-sans font-bold text-sm bg-accent text-primary hover:bg-accent/90 border border-primary flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <span>Complete & Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Next & Prev Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            {prevItem ? (
              <Button
                href={`/dashboard/courses/${courseId}/lessons/${prevItem.lesson.id}`}
                variant="outline"
                size="md"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>Previous: {prevItem.lesson.title.slice(0, 24)}...</span>
              </Button>
            ) : (
              <div />
            )}

            {nextItem && (
              <Button
                href={`/dashboard/courses/${courseId}/lessons/${nextItem.lesson.id}`}
                variant="primary"
                size="md"
                arrow
              >
                <span>Next: {nextItem.lesson.title.slice(0, 24)}...</span>
              </Button>
            )}
          </div>

          {/* Lesson Overview & Resources Tabs */}
          <div className="bg-white border border-border-custom rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-xl text-primary uppercase">
                Lesson Overview & Action Steps
              </h3>
              <p className="text-secondary text-sm sm:text-base leading-relaxed">
                {currentLesson?.description ||
                  "In this session, we break down real-world brand executions and practical step-by-step frameworks. Complete the video walkthrough, implement the strategy, and check off the action items below to construct your portfolio."}
              </p>
            </div>

            {/* Downloadable Assets */}
            <div className="pt-4 border-t border-border-custom">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-primary mb-3">
                Downloadable Lesson Attachments:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="/resources/30-day-content-calendar"
                  target="_blank"
                  className="p-3.5 rounded-xl border border-border-custom hover:border-primary flex items-center justify-between gap-3 text-xs font-medium text-primary hover:bg-[#F5F3EE] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>30-Day Master Content Calendar (.xlsx)</span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-secondary group-hover:text-primary" />
                </a>

                <a
                  href="/resources/social-media-audit-checklist"
                  target="_blank"
                  className="p-3.5 rounded-xl border border-border-custom hover:border-primary flex items-center justify-between gap-3 text-xs font-medium text-primary hover:bg-[#F5F3EE] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>SMM Audit Checklist & Rubric (.pdf)</span>
                  </div>
                  <Download className="w-3.5 h-3.5 text-secondary group-hover:text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Curriculum Sidebar */}
        <aside
          className={`w-full lg:w-96 bg-white border-l border-border-custom p-6 flex flex-col justify-between overflow-y-auto ${
            sidebarOpen ? "block" : "hidden lg:flex"
          }`}
        >
          <div className="space-y-6">
            <div className="pb-4 border-b border-border-custom space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-secondary">
                  Course Syllabus
                </span>
                <span className="text-xs font-mono font-bold text-primary">
                  {distinctCompletedCount} / {allLessons.length} Done
                </span>
              </div>
              <ProgressBar value={liveProgressPercent} />
            </div>

            {/* Modules List in Sidebar */}
            <div className="space-y-6">
              {modulesList.map((mod, mIdx) => (
                <div key={mod.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-primary pb-1">
                    <span className="uppercase">
                      Mod {mod.order || mIdx + 1}: {mod.title}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {mod.lessons.map((les, lIdx) => {
                      const isCurrent = currentLesson?.id === les.id;
                      const isDone = checkIsLessonDone(
                        les.id,
                        mod.order || mIdx + 1,
                        les.order || lIdx + 1
                      );

                      return (
                        <div
                          key={les.id}
                          className={`flex items-center gap-3 p-2.5 rounded-lg text-xs transition-all group ${
                            isCurrent
                              ? "bg-primary text-cream font-semibold shadow-sm"
                              : isDone
                              ? "hover:bg-[#F5F3EE] text-primary"
                              : "hover:bg-[#F5F3EE] text-secondary"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleToggleComplete(les.id, !isDone);
                            }}
                            title={isDone ? "Mark as incomplete" : "Mark as completed"}
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold transition-all hover:scale-110 cursor-pointer ${
                              isDone
                                ? "bg-accent text-primary hover:bg-accent/80"
                                : isCurrent
                                ? "bg-white/20 text-cream hover:bg-white/40"
                                : "border border-border-custom text-secondary hover:border-primary"
                            }`}
                          >
                            {isDone ? (
                              <Check className="w-3 h-3 stroke-[3]" />
                            ) : (
                              les.order || lIdx + 1
                            )}
                          </button>

                          <Link
                            href={`/dashboard/courses/${courseId}/lessons/${les.id}`}
                            onClick={() => setSidebarOpen(false)}
                            className="flex-1 overflow-hidden"
                          >
                            <span className="leading-snug block truncate group-hover:underline">
                              {les.title}
                            </span>
                            <span className="text-[10px] font-mono opacity-70 block">
                              {les.duration || 15} mins
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
