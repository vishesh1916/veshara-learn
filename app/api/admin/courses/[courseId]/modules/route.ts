import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { title, description } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Module title is required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findFirst({
      where: {
        OR: [{ id: params.courseId }, { slug: params.courseId }],
      },
      include: {
        modules: true,
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const nextOrder = course.modules.length + 1;

    const newModule = await prisma.module.create({
      data: {
        courseId: course.id,
        title: title.trim(),
        description: description?.trim() || null,
        order: nextOrder,
      },
      include: {
        lessons: true,
      },
    });

    return NextResponse.json({ success: true, module: newModule });
  } catch (error: any) {
    console.error("Create module error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create module" },
      { status: 500 }
    );
  }
}
