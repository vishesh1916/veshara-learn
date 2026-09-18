import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({
        authenticated: false,
        isEnrolled: false,
        role: "GUEST",
        user: null,
      });
    }

    const email = session.user.email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        enrollments: true,
      },
    });

    if (!user) {
      return NextResponse.json({
        authenticated: false,
        isEnrolled: false,
        role: "GUEST",
        user: null,
      });
    }

    const isAdmin = user.role === "ADMIN" || email === "arisharajput100@gmail.com";
    const hasEnrollment = user.enrollments && user.enrollments.length > 0;
    const isEnrolled = isAdmin || hasEnrollment;

    return NextResponse.json({
      authenticated: true,
      isEnrolled,
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error: any) {
    console.error("GET /api/user/status error:", error);
    return NextResponse.json({
      authenticated: false,
      isEnrolled: false,
      role: "GUEST",
      user: null,
    });
  }
}
