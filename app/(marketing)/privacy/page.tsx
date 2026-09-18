import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy — Veshara Learn",
  description: "Privacy policy and data protection practices for Veshara Learn.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-cream py-16 md:py-24">
      <Container narrow>
        <div className="bg-white border border-border-custom rounded-3xl p-8 sm:p-12 shadow-subtle space-y-6 text-secondary text-sm sm:text-base leading-relaxed">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
            Legal Compliance
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-secondary">
            Last Updated: September 2026
          </p>

          <hr className="border-border-custom" />

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            1. Information We Collect
          </h2>
          <p>
            When you register for an account, enroll in our Social Media Manager course, or download our free resources, we collect information including your name, email address, telephone number, and payment transaction metadata provided by our payment gateway (Razorpay).
          </p>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            2. How We Use Your Information
          </h2>
          <p>
            We use your data solely to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Authenticate and provide access to your student dashboard and courses.</li>
            <li>Send order confirmations, access links, and curriculum updates.</li>
            <li>Process transactions securely through authorized payment gateways.</li>
            <li>Respond to student support inquiries and feedback.</li>
          </ul>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            3. Payment Security & Third Parties
          </h2>
          <p>
            We do not store your credit card numbers, debit card PINs, or UPI passwords on our servers. All financial transactions are securely processed by Razorpay in compliance with RBI guidelines and PCI-DSS standards.
          </p>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            4. Cookies & Analytics
          </h2>
          <p>
            We use standard session cookies and privacy-focused analytics to monitor page performance, detect bugs, and improve user navigation. You can disable cookies in your browser settings at any time.
          </p>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            5. Contact Us
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or your personal data, please email us at{" "}
            <a href="mailto:arisharajput100@gmail.com" className="text-primary font-bold underline">
              arisharajput100@gmail.com
            </a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
