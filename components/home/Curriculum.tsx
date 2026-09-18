"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Sparkles, Clock, BookOpen, ArrowRight } from "lucide-react";
import { CURRICULUM } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function Curriculum() {
  const accordionItems: AccordionItem[] = CURRICULUM.map((mod) => ({
    number: mod.number,
    title: mod.title,
    badge: `${mod.lessonsCount} Lessons • ${mod.duration}`,
    content: (
      <div className="space-y-4 pt-2">
        <div>
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-primary mb-3">
            What you&apos;ll master:
          </h5>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-secondary">
            {mod.lessons.map((lesson, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3.5 bg-accent/20 border border-primary/15 rounded-lg flex items-start gap-2.5 text-xs sm:text-sm text-primary">
          <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Hands-on Capstone Project: </strong>
            <span>{mod.project}</span>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section className="section-padding bg-[#F5F3EE] border-t border-border-custom" id="curriculum">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="8 Comprehensive Modules"
            title="Your Social Media Manager roadmap."
            subtitle="From absolute ground zero to landing your first retainer. Click on any module below to inspect the breakdown and practical assignments."
          />
        </ScrollReveal>

        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl border border-border-custom shadow-subtle overflow-hidden">
          <Accordion items={accordionItems} defaultOpenIndex={0} allowMultiple />
        </div>

        {/* Action button below curriculum */}
        <div className="mt-12 text-center">
          <Button href="/enroll" size="lg" variant="primary" arrow>
            Enroll in All 8 Modules for ₹199
          </Button>
          <p className="mt-3 text-xs font-mono text-secondary">
            Includes all 45 video lessons, templates, capstones & certificate
          </p>
        </div>
      </Container>
    </section>
  );
}
