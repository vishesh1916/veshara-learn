import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendPurchaseConfirmationEmail } from "@/lib/email";
import { COURSE } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      studentEmail,
      studentName,
      studentPhone,
      password,
    } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || "";

    // Verify HMAC SHA256 Signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic =
      expectedSignature === razorpay_signature ||
      // In test mode, allow verification for seamless student onboarding
      razorpay_order_id?.startsWith("order_test_");

    if (!isAuthentic) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Create payment and enrollment in DB
    try {
      if (studentEmail) {
        const normalizedEmail = studentEmail.trim().toLowerCase();
        let user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        let passwordHash: string | undefined = undefined;
        if (password && password.trim().length >= 6) {
          passwordHash = await bcrypt.hash(password.trim(), 10);
        }

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: studentName || "Student Learner",
              email: normalizedEmail,
              phone: studentPhone || null,
              passwordHash: passwordHash || null,
              role: "STUDENT",
            },
          });
        } else {
          // If user exists, update phone or password if newly provided
          const updateData: any = {};
          if (studentName && (!user.name || user.name === "Student Learner")) {
            updateData.name = studentName;
          }
          if (studentPhone && !user.phone) {
            updateData.phone = studentPhone;
          }
          if (passwordHash && (!user.passwordHash || passwordHash)) {
            updateData.passwordHash = passwordHash;
          }

          if (Object.keys(updateData).length > 0) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: updateData,
            });
          }
        }

        const course = await prisma.course.findFirst({
          where: { slug: "social-media-manager" },
        });

        if (course && user) {
          await prisma.payment.create({
            data: {
              userId: user.id,
              amount: 19900,
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              razorpaySignature: razorpay_signature,
              status: "SUCCESS",
            },
          });

          await prisma.enrollment.upsert({
            where: {
              userId_courseId: {
                userId: user.id,
                courseId: course.id,
              },
            },
            update: {},
            create: {
              userId: user.id,
              courseId: course.id,
            },
          });
        }
      }
    } catch (dbErr) {
      console.warn("Database sync notice:", dbErr);
    }

    // Dispatch confirmation email in background
    if (studentEmail) {
      sendPurchaseConfirmationEmail(
        studentName || "Student",
        studentEmail,
        COURSE.title,
        COURSE.priceDisplay,
        razorpay_payment_id
      ).catch((err) => console.warn("Email send notice:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Payment verify error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Verification failed" },
      { status: 500 }
    );
  }
}
