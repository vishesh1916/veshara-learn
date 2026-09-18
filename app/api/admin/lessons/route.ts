import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { moduleId, courseId, title, videoUrl, duration, description, isFreePreview } =
      await request.json();

    if (!moduleId || !title || !videoUrl) {
      return NextResponse.json(
        { error: "Module ID, Title, and Video URL/ID are required." },
        { status: 400 }
      );
    }

    let moduleRecord = await prisma.module.findUnique({
      where: { id: moduleId },
      include: { lessons: true },
    });

    // If moduleId was a slug like "mod-1", resolve it
    if (!moduleRecord) {
      const orderNum = parseInt(moduleId.replace(/\D/g, ""), 10) || 1;
      const course = await prisma.course.findFirst({
        where: courseId
          ? { OR: [{ id: courseId }, { slug: courseId }] }
          : undefined,
      });

      if (course) {
        moduleRecord = await prisma.module.findFirst({
          where: { courseId: course.id, order: orderNum },
          include: { lessons: true },
        });
      }
    }

    if (!moduleRecord) {
      return NextResponse.json({ error: "Module not found." }, { status: 404 });
    }

    const nextOrder = moduleRecord.lessons.length + 1;
    let cleanVideo = videoUrl.trim();

    const lesson = await prisma.lesson.create({
      data: {
        moduleId: moduleRecord.id,
        title: title.trim(),
        videoUrl: cleanVideo,
        duration: duration ? Number(duration) : 15,
        description: description?.trim() || null,
        isFreePreview: Boolean(isFreePreview),
        order: nextOrder,
      },
    });

    return NextResponse.json({ success: true, lesson });
  } catch (error: any) {
    console.error("Create lesson error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create lesson." },
      { status: 500 }
    );
  }
}
