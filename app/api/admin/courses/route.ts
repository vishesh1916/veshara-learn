import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subtitle, description, price, isPublished } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Course title is required." },
        { status: 400 }
      );
    }

    let slug = slugify(title);
    // Check if slug exists
    const existing = await prisma.course.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newCourse = await prisma.course.create({
      data: {
        title: title.trim(),
        slug,
        shortDesc: subtitle?.trim() || null,
        description: description?.trim() || "",
        price: Math.round(Number(price || 199) * 100),
        isPublished: Boolean(isPublished),
      },
    });

    return NextResponse.json({ success: true, course: newCourse });
  } catch (error: any) {
    console.error("Create course error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create course." },
      { status: 500 }
    );
  }
}
