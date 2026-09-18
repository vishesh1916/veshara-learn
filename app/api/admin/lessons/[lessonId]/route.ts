import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const { title, videoUrl, duration, description, isFreePreview, order } =
      await request.json();

    const updated = await prisma.lesson.update({
      where: { id: params.lessonId },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(videoUrl !== undefined && { videoUrl: videoUrl.trim() }),
        ...(duration !== undefined && { duration: Number(duration) }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(isFreePreview !== undefined && { isFreePreview: Boolean(isFreePreview) }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    return NextResponse.json({ success: true, lesson: updated });
  } catch (error: any) {
    console.error("Update lesson error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update lesson." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    await prisma.lesson.delete({
      where: { id: params.lessonId },
    });

    return NextResponse.json({ success: true, message: "Lesson deleted successfully." });
  } catch (error: any) {
    console.error("Delete lesson error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete lesson." },
      { status: 500 }
    );
  }
}
