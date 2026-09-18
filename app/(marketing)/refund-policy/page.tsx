import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Refund Policy — Veshara Learn",
  description: "Refund terms and conditions for the Social Media Manager course on Veshara Learn.",
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-cream py-16 md:py-24">
      <Container narrow>
        <div className="bg-white border border-border-custom rounded-3xl p-8 sm:p-12 shadow-subtle space-y-6 text-secondary text-sm sm:text-base leading-relaxed">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
            Satisfaction & Transparency
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
            Refund Policy
          </h1>
          <p className="text-xs font-mono text-secondary">
            Last Updated: September 2026
          </p>

          <hr className="border-border-custom" />

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            1. Overview
          </h2>
          <p>
            At Veshara Learn, we price our flagship Social Media Manager course at just <strong>₹199</strong> to remove financial hurdles and give ambitious learners access to world-class practical skills. We want you to feel confident in your decision to learn with us.
          </p>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            2. Refund Eligibility Window
          </h2>
          <p>
            You are eligible to request a full refund within <strong>7 days</strong> of your initial purchase date, provided that you have completed less than <strong>25%</strong> of the video curriculum and have not yet downloaded our proprietary client proposal or calendar template packs.
          </p>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            3. Non-Refundable Scenarios
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Requests made after the 7-day purchase window has elapsed.</li>
            <li>Accounts that have watched more than 25% of course lessons.</li>
            <li>Accounts where an official Certificate of Completion has already been generated.</li>
          </ul>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            4. How to Request a Refund
          </h2>
          <p>
            To request a refund, please send an email to{" "}
            <a href="mailto:arisharajput100@gmail.com" className="text-primary font-bold underline">
              arisharajput100@gmail.com
            </a>{" "}
            with:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your full name and enrolled email address.</li>
            <li>Your Razorpay payment reference ID (from your receipt).</li>
            <li>A brief explanation of why the course didn&apos;t meet your expectations (we appreciate genuine feedback).</li>
          </ul>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            5. Processing Timeline
          </h2>
          <p>
            Once verified and approved, refunds are initiated immediately through Razorpay and typically reflect in your original bank account or UPI within 5 to 7 working days.
          </p>
        </div>
      </Container>
    </div>
  );
}
