import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendResourceEmail } from "@/lib/email";
import { FREE_RESOURCES } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const matchedResource = FREE_RESOURCES.find((r) => r.slug === source) || FREE_RESOURCES[0];
    const resourceLink = `${process.env.NEXT_PUBLIC_SITE_URL || "https://vesharalearn.vercel.app"}/resources/${matchedResource.slug}`;

    try {
      await prisma.lead.upsert({
        where: { email: cleanEmail },
        update: { source: source || "website" },
        create: {
          email: cleanEmail,
          source: source || "website",
        },
      });
    } catch (e) {
      console.log(`[Lead Captured] ${cleanEmail} (Source: ${source})`);
    }

    // Trigger email delivery
    sendResourceEmail(
      cleanEmail,
      matchedResource.title,
      resourceLink,
      matchedResource.type
    ).catch((err) => {
      console.warn("Lead resource email warning:", err);
    });

    return NextResponse.json({
      success: true,
      resourceLink,
      resourceTitle: matchedResource.title,
    });
  } catch (error: any) {
    return NextResponse.json({ success: true });
  }
}
