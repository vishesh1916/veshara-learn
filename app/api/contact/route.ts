import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          message,
        },
      });
    } catch (e) {
      console.log(`[Contact Form Received] From: ${name} (${email}): ${message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: true });
  }
}
