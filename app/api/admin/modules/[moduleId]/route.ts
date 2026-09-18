import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    const { title, description, order } = await request.json();

    const updated = await prisma.module.update({
      where: { id: params.moduleId },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order: Number(order) }),
      },
    });

    return NextResponse.json({ success: true, module: updated });
  } catch (error: any) {
    console.error("Update module error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update module" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { moduleId: string } }
) {
  try {
    await prisma.module.delete({
      where: { id: params.moduleId },
    });

    return NextResponse.json({ success: true, message: "Module deleted" });
  } catch (error: any) {
    console.error("Delete module error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete module" },
      { status: 500 }
    );
  }
}
