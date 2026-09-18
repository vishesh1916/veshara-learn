import * as React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { LockedCoursePaywall } from "@/components/dashboard/LockedCoursePaywall";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const email = session.user.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
    include: { enrollments: true },
  });

  const isAdmin =
    user?.role === "ADMIN" || email === "arisharajput100@gmail.com";
  const hasEnrollment = user?.enrollments && user.enrollments.length > 0;
  const isAccessAllowed = isAdmin || Boolean(hasEnrollment);

  if (!isAccessAllowed) {
    return (
      <LockedCoursePaywall
        studentName={user?.name || session.user.name || "Student"}
        studentEmail={email}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col lg:flex-row">
      <DashboardSidebar />
      <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
