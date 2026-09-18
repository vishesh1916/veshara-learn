import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const course = await prisma.course.findFirst({
      where: {
        OR: [{ id: params.courseId }, { slug: params.courseId }],
      },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ course });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const body = await request.json();
    const { title, price, description, shortDesc, isPublished } = body;

    const course = await prisma.course.findFirst({
      where: {
        OR: [{ id: params.courseId }, { slug: params.courseId }],
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const updated = await prisma.course.update({
      where: { id: course.id },
      data: {
        ...(title !== undefined && { title }),
        ...(price !== undefined && { price: Math.round(Number(price) * 100) }),
        ...(description !== undefined && { description }),
        ...(shortDesc !== undefined && { shortDesc }),
        ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, course: updated });
  } catch (error: any) {
    console.error("Update course error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
