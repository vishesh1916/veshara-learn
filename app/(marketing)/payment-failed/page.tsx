import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, RefreshCw, Mail, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Payment Unsuccessful — Veshara Learn",
  description: "Your payment did not go through. Try again or reach support.",
};

export default function PaymentFailedPage() {
  return (
    <div className="bg-cream py-20 md:py-32">
      <Container narrow>
        <div className="bg-white border-2 border-primary rounded-3xl p-8 sm:p-14 text-center shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto border border-red-200">
            <XCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-secondary">
              Transaction Incomplete
            </span>
            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary tracking-tight uppercase">
              Your payment didn&apos;t go through.
            </h1>
          </div>

          <p className="text-base sm:text-lg text-secondary max-w-md mx-auto leading-relaxed">
            Don&apos;t worry — no money has been deducted or course access has been activated. Please try again with UPI or an alternative card.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/enroll"
              size="lg"
              variant="primary"
              arrow
              className="w-full sm:w-auto text-base"
            >
              Try Again
            </Button>
            <Button
              href="/contact"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base"
            >
              Contact Support
            </Button>
          </div>

          <div className="pt-6 border-t border-border-custom text-xs text-secondary">
            If money was debited by your bank, it will automatically reverse within 3-5 business days.
          </div>
        </div>
      </Container>
    </div>
  );
}
