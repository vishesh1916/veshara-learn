import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Payment Successful — Welcome to Veshara Learn! 🚀",
  description: "Your enrollment is confirmed. Welcome to the Social Media Manager course.",
};

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { payment_id?: string; email?: string };
}) {
  return (
    <div className="bg-cream py-20 md:py-32">
      <Container narrow>
        <div className="bg-white border-2 border-primary rounded-3xl p-8 sm:p-14 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center mx-auto border-2 border-primary shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-secondary">
              Enrollment Confirmed
            </span>
            <h1 className="font-serif font-bold text-4xl sm:text-6xl text-primary tracking-tight uppercase">
              You&apos;re officially in. 🚀
            </h1>
          </div>

          <p className="text-base sm:text-lg text-secondary max-w-md mx-auto leading-relaxed">
            Welcome to Veshara Learn. Your Social Media Manager journey starts now. Your course access has been unlocked in your dashboard.
          </p>

          {searchParams?.email && (
            <div className="p-4 bg-accent/20 border border-primary/20 rounded-2xl max-w-md mx-auto text-xs text-primary space-y-1 text-center">
              <p className="font-bold text-sm">Student Account Active & Ready</p>
              <p className="font-mono text-secondary font-semibold">{searchParams.email}</p>
              <p className="text-[11px] text-secondary pt-0.5">
                Your course is unlocked. You can sign in anytime using your email and password.
              </p>
            </div>
          )}

          {searchParams?.payment_id && (
            <div className="p-2.5 bg-[#F5F3EE] rounded-lg border border-border-custom max-w-xs mx-auto text-[11px] font-mono text-secondary">
              Reference ID: {searchParams.payment_id}
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/dashboard"
              size="lg"
              variant="primary"
              arrow
              className="w-full sm:w-auto text-base"
            >
              Access My Course →
            </Button>
            <Button
              href="/"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base"
            >
              Back to Homepage
            </Button>
          </div>

          <div className="pt-6 border-t border-border-custom text-xs text-secondary">
            A confirmation receipt and login link have been dispatched to your email.
          </div>
        </div>
      </Container>
    </div>
  );
}
