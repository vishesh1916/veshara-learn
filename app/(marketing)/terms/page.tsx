import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service — Veshara Learn",
  description: "Terms of service and usage conditions for Veshara Learn.",
};

export default function TermsPage() {
  return (
    <div className="bg-cream py-16 md:py-24">
      <Container narrow>
        <div className="bg-white border border-border-custom rounded-3xl p-8 sm:p-12 shadow-subtle space-y-6 text-secondary text-sm sm:text-base leading-relaxed">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
            User Agreement
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-secondary">
            Last Updated: September 2026
          </p>

          <hr className="border-border-custom" />

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing Veshara Learn, purchasing the Social Media Manager course, or using any of our free materials, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
          </p>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            2. Intellectual Property & Prohibited Sharing
          </h2>
          <p>
            All video lectures, project prompts, downloadable spreadsheets, templates, and text materials provided on Veshara Learn are the copyrighted property of Veshara Learn.
          </p>
          <p className="font-semibold text-primary">
            You are strictly prohibited from redistributing, re-uploading, selling, sharing student credentials, or publicly publishing any course video content or proprietary templates.
          </p>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            3. Lifetime Access Terms
          </h2>
          <p>
            &ldquo;Lifetime Access&rdquo; grants you access to the Social Media Manager course and any future curriculum updates for the operational lifetime of the Veshara Learn platform.
          </p>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            4. No Earnings or Client Guarantee
          </h2>
          <p>
            Veshara Learn provides education, practical assignments, and client acquisition frameworks. However, we do not guarantee employment, client retainers, or specific income figures. Student results depend entirely on individual effort, market conditions, and execution.
          </p>

          <h2 className="font-serif font-bold text-xl text-primary uppercase pt-2">
            5. Governing Law
          </h2>
          <p>
            These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
        </div>
      </Container>
    </div>
  );
}
