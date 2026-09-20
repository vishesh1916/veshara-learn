import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, phone, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing user
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      if (!existing.passwordHash) {
        // User enrolled during checkout without password - complete their account setup!
        const passwordHash = await bcrypt.hash(password, 10);
        const updated = await prisma.user.update({
          where: { id: existing.id },
          data: {
            name: existing.name || name,
            phone: existing.phone || phone,
            passwordHash,
          },
        });
        return NextResponse.json({
          success: true,
          user: {
            id: updated.id,
            name: updated.name,
            email: updated.email,
            role: updated.role,
          },
        });
      }

      return NextResponse.json(
        { error: "An account already exists with this email address. Please sign in instead." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        phone,
        passwordHash,
        role: "STUDENT",
      },
    });

    // Send welcome email asynchronously
    sendWelcomeEmail(user.name, user.email).catch((err) =>
      console.warn("Welcome email background error:", err)
    );

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create account." },
      { status: 500 }
    );
  }
}
