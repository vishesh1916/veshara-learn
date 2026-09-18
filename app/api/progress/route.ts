import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getAuthenticatedUser(session: any) {
  let email = session?.user?.email;
  if (!email) {
    return null;
  }
  return await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user = await getAuthenticatedUser(session);

    // Fetch all lessons with modules to map IDs and aliases
    const allModules = await prisma.module.findMany({
      orderBy: { order: "asc" },
      include: {
        lessons: {
          orderBy: { order: "asc" },
        },
      },
    });

    const totalLessonsCount =
      allModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 45;

    if (!user) {
      return NextResponse.json({
        success: true,
        completedLessonIds: [],
        completedCount: 0,
        totalLessonsCount,
        progressPercent: 0,
      });
    }

    const progressRecords = await prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        completed: true,
      },
      include: {
        lesson: {
          include: {
            module: true,
          },
        },
      },
    });

    const completedLessonIds: string[] = [];
    progressRecords.forEach((pr) => {
      // Add DB cuid
      completedLessonIds.push(pr.lessonId);
      // Add slug alias if module and lesson are available
      if (pr.lesson && pr.lesson.module) {
        completedLessonIds.push(
          `mod-${pr.lesson.module.order}-lesson-${pr.lesson.order}`
        );
      }
    });

    const completedCount = progressRecords.length;
    const progressPercent = Math.min(
      100,
      Math.round((completedCount / (totalLessonsCount || 1)) * 100)
    );

    return NextResponse.json({
      success: true,
      completedLessonIds,
      completedCount,
      totalLessonsCount,
      progressPercent,
    });
  } catch (error: any) {
    console.error("GET /api/progress error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { lessonId, completed } = await request.json();

    const user = await getAuthenticatedUser(session);
    if (!user) {
      return NextResponse.json({
        success: true,
        local: true,
        lessonId,
        completed: Boolean(completed),
      });
    }

    let dbLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: true },
    });

    if (!dbLesson && typeof lessonId === "string" && lessonId.startsWith("mod-")) {
      const parts = lessonId.split("-");
      const mNum = parseInt(parts[1] || "1", 10);
      const lNum = parseInt(parts[3] || parts[2] || "1", 10);
      const moduleRecord = await prisma.module.findFirst({
        where: { order: mNum },
        include: { lessons: true },
      });
      if (moduleRecord) {
        dbLesson =
          (moduleRecord.lessons.find((l) => l.order === lNum) as any) || null;
      }
    }

    if (dbLesson) {
      await prisma.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: user.id,
            lessonId: dbLesson.id,
          },
        },
        update: {
          completed: Boolean(completed),
          completedAt: completed ? new Date() : null,
        },
        create: {
          userId: user.id,
          lessonId: dbLesson.id,
          completed: Boolean(completed),
          completedAt: completed ? new Date() : null,
        },
      });
    }

    // Recalculate stats for response
    const allModules = await prisma.module.findMany({
      include: { lessons: true },
    });
    const totalLessonsCount =
      allModules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 45;

    const progressRecords = await prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        completed: true,
      },
      include: {
        lesson: {
          include: {
            module: true,
          },
        },
      },
    });

    const completedLessonIds: string[] = [];
    progressRecords.forEach((pr) => {
      completedLessonIds.push(pr.lessonId);
      if (pr.lesson && pr.lesson.module) {
        completedLessonIds.push(
          `mod-${pr.lesson.module.order}-lesson-${pr.lesson.order}`
        );
      }
    });

    const completedCount = progressRecords.length;
    const progressPercent = Math.min(
      100,
      Math.round((completedCount / (totalLessonsCount || 1)) * 100)
    );

    // If reached 100%, award certificate automatically
    if (completedCount >= totalLessonsCount && totalLessonsCount > 0) {
      const course = await prisma.course.findFirst();
      if (course) {
        const certExists = await prisma.certificate.findFirst({
          where: { userId: user.id, courseId: course.id },
        });
        if (!certExists) {
          const certNo = `VL-${new Date().getFullYear()}-${Math.floor(
            10000 + Math.random() * 90000
          )}`;
          await prisma.certificate.create({
            data: {
              userId: user.id,
              courseId: course.id,
              certificateNo: certNo,
            },
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      lessonId,
      completed: Boolean(completed),
      completedLessonIds,
      completedCount,
      totalLessonsCount,
      progressPercent,
    });
  } catch (error: any) {
    console.error("POST /api/progress error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update progress" },
      { status: 500 }
    );
  }
}
