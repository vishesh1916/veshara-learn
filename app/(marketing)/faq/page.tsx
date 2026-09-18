import * as React from "react";
import type { Metadata } from "next";
import { FAQS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Veshara Learn",
  description: "Have questions about the Social Media Manager course, ₹199 pricing, certificate, or lifetime access? Get all your answers here.",
};

export default function FAQPage() {
  const courseFaqs = FAQS.filter((f) => f.category === "course");
  const paymentFaqs = FAQS.filter((f) => f.category === "payment");
  const accessFaqs = FAQS.filter((f) => f.category === "access");
  const supportFaqs = FAQS.filter((f) => f.category === "support");

  const toAccordionItems = (
    list: Array<{ question: string; answer: string }>
  ): AccordionItem[] =>
    list.map((f, i) => ({
      number: `0${i + 1}`,
      title: f.question,
      content: <p className="text-secondary text-sm sm:text-base leading-relaxed">{f.answer}</p>,
    }));

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border-custom bg-cream">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-primary border border-primary/20">
              Clear Answers
            </span>
            <h1 className="font-serif font-bold text-4xl sm:text-6xl text-primary tracking-[-0.04em] uppercase">
              Frequently Asked Questions.
            </h1>
            <p className="text-base sm:text-lg text-secondary leading-relaxed font-sans">
              Have questions about how the course works, certificates, or payments? Find all answers categorized below.
            </p>
          </div>
        </Container>
      </section>

      {/* Grouped Accordions */}
      <section className="section-padding bg-cream">
        <Container narrow>
          <div className="space-y-16">
            {/* Section 1: Course */}
            <div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-primary uppercase tracking-tight mb-6 pb-2 border-b border-border-custom">
                Course & Curriculum Questions
              </h2>
              <div className="bg-white rounded-2xl border border-border-custom shadow-subtle overflow-hidden">
                <Accordion items={toAccordionItems(courseFaqs)} defaultOpenIndex={0} allowMultiple />
              </div>
            </div>

            {/* Section 2: Payment */}
            <div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-primary uppercase tracking-tight mb-6 pb-2 border-b border-border-custom">
                Pricing & Payment Questions
              </h2>
              <div className="bg-white rounded-2xl border border-border-custom shadow-subtle overflow-hidden">
                <Accordion items={toAccordionItems(paymentFaqs)} defaultOpenIndex={0} allowMultiple />
              </div>
            </div>

            {/* Section 3: Access */}
            <div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-primary uppercase tracking-tight mb-6 pb-2 border-b border-border-custom">
                Access & Compatibility Questions
              </h2>
              <div className="bg-white rounded-2xl border border-border-custom shadow-subtle overflow-hidden">
                <Accordion items={toAccordionItems(accessFaqs)} defaultOpenIndex={0} allowMultiple />
              </div>
            </div>

            {/* Section 4: Support */}
            <div>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-primary uppercase tracking-tight mb-6 pb-2 border-b border-border-custom">
                Student Support Questions
              </h2>
              <div className="bg-white rounded-2xl border border-border-custom shadow-subtle overflow-hidden">
                <Accordion items={toAccordionItems(supportFaqs)} defaultOpenIndex={0} allowMultiple />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Ready to begin your Social Media Manager journey?"
        subheadline="Join for just ₹199 and get instant lifetime access."
        buttonText="Enroll Today — ₹199"
        buttonHref="/enroll"
      />
    </div>
  );
}
