"use client";

import * as React from "react";
import Link from "next/link";
import { FAQS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function HomeFAQ() {
  const faqItems: AccordionItem[] = FAQS.slice(0, 8).map((item, index) => ({
    number: `0${index + 1}`,
    title: item.question,
    content: (
      <p className="text-secondary text-sm sm:text-base leading-relaxed">
        {item.answer}
      </p>
    ),
  }));

  return (
    <section className="section-padding bg-cream border-t border-border-custom" id="faq">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="Got Questions?"
            title="Frequently asked questions."
            subtitle="Everything you need to know before enrolling in the Veshara Learn Social Media Manager course."
          />
        </ScrollReveal>

        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl border border-border-custom shadow-subtle overflow-hidden">
          <Accordion items={faqItems} defaultOpenIndex={0} allowMultiple />
        </div>

        {/* Support Link */}
        <div className="mt-10 text-center text-sm text-secondary">
          Still have a question? Reach us directly at{" "}
          <a
            href="mailto:arisharajput100@gmail.com"
            className="text-primary font-bold hover:underline"
          >
            arisharajput100@gmail.com
          </a>{" "}
          or view our{" "}
          <Link href="/faq" className="text-primary font-bold hover:underline">
            full FAQ page →
          </Link>
        </div>
      </Container>
    </section>
  );
}
