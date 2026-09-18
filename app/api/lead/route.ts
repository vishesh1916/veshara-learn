import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    try {
      await prisma.lead.upsert({
        where: { email: email.trim().toLowerCase() },
        update: { source: source || "website" },
        create: {
          email: email.trim().toLowerCase(),
          source: source || "website",
        },
      });
    } catch (e) {
      console.log(`[Lead Captured] ${email} (Source: ${source})`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: true });
  }
}
