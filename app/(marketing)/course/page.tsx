import * as React from "react";
import type { Metadata } from "next";
import { Check, Sparkles, Clock, ShieldCheck, ArrowRight, Play, BookOpen } from "lucide-react";
import { COURSE, CURRICULUM, INCLUSIONS, PORTFOLIO_PROJECTS, TOOLS, FAQS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Social Media Manager Course — Complete Curriculum & Enrollment | Veshara Learn",
  description: "Comprehensive 8-module Social Media Manager curriculum. Learn strategy, content creation, organic growth, analytics and client retainers for ₹199.",
};

export default function CoursePage() {
  const curriculumAccordion: AccordionItem[] = CURRICULUM.map((mod) => ({
    number: mod.number,
    title: mod.title,
    badge: `${mod.lessonsCount} Lessons • ${mod.duration}`,
    content: (
      <div className="space-y-4 pt-2">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-secondary">
          {mod.lessons.map((lesson, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{lesson}</span>
            </li>
          ))}
        </ul>
        <div className="p-3.5 bg-accent/20 border border-primary/15 rounded-lg flex items-start gap-2.5 text-xs sm:text-sm text-primary">
          <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Capstone Deliverable: </strong>
            <span>{mod.project}</span>
          </div>
        </div>
      </div>
    ),
  }));

  const courseFaqs: AccordionItem[] = FAQS.map((f, i) => ({
    number: `0${i + 1}`,
    title: f.question,
    content: <p className="text-secondary text-sm leading-relaxed">{f.answer}</p>,
  }));

  return (
    <div className="bg-cream">
      {/* Course Hero Section */}
      <section className="py-16 md:py-24 border-b border-border-custom bg-cream relative">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-custom shadow-subtle">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                8 Modules • 45 Lessons • Verified Certification
              </span>
            </div>

            <h1 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-primary tracking-[-0.04em] leading-[0.95] uppercase">
              Social Media Manager: <br className="hidden sm:inline" />
              <span className="italic font-normal">Beginner to Client-Ready</span>
            </h1>

            <p className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
              {COURSE.description}
            </p>

            {/* Price & CTA row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="bg-white border-2 border-primary rounded-xl px-6 py-3 flex items-center gap-3">
                <span className="font-serif font-bold text-3xl text-primary">₹199</span>
                <span className="text-xs font-mono text-secondary line-through">₹2,499</span>
                <span className="text-xs font-mono font-bold text-primary bg-accent px-2 py-0.5 rounded">
                  92% OFF
                </span>
              </div>
              <Button href="/enroll" size="lg" variant="primary" arrow className="w-full sm:w-auto">
                Enroll Now For ₹199
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Course Promise */}
      <section className="section-padding bg-white border-b border-border-custom">
        <Container>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="p-6 rounded-xl bg-[#F5F3EE] border border-border-custom">
              <span className="text-xs font-mono font-bold text-secondary uppercase">Promise 01</span>
              <h3 className="font-serif font-bold text-2xl text-primary mt-2 mb-2 uppercase">
                Tangible Proof
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                You won&apos;t just watch videos. You will finish with 6 client-ready deliverables in your Google Drive.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#F5F3EE] border border-border-custom">
              <span className="text-xs font-mono font-bold text-secondary uppercase">Promise 02</span>
              <h3 className="font-serif font-bold text-2xl text-primary mt-2 mb-2 uppercase">
                Zero Fluff
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                Taught directly by practitioners. No outdated 2019 advice or theoretical marketing textbook definitions.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#F5F3EE] border border-border-custom">
              <span className="text-xs font-mono font-bold text-secondary uppercase">Promise 03</span>
              <h3 className="font-serif font-bold text-2xl text-primary mt-2 mb-2 uppercase">
                Client Blueprint
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                Includes exact pricing guidelines, cold outreach scripts, and proposal templates to land paying retainers.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Full Curriculum Deep Dive */}
      <section className="section-padding bg-cream border-b border-border-custom">
        <Container>
          <SectionHeading
            badge="Full Syllabus"
            title="Complete Course Curriculum."
            subtitle="Explore every lesson across all 8 modules. Designed to be completed in 2 to 4 weeks at your own pace."
          />

          <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl border border-border-custom shadow-subtle overflow-hidden">
            <Accordion items={curriculumAccordion} defaultOpenIndex={0} allowMultiple />
          </div>
        </Container>
      </section>

      {/* Projects Showcase */}
      <section className="section-padding bg-[#11110F] text-cream">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
              The 6 Portfolio Deliverables
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-cream mt-4 uppercase">
              What You Will Actually Build.
            </h2>
            <p className="mt-3 text-secondary text-base sm:text-lg">
              Every single module culminates in a client-ready asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PORTFOLIO_PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className="bg-[#1C1C19] border border-[#2E2E2A] rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-accent font-bold">
                    Project 0{i + 1} • {p.tag}
                  </span>
                  <h4 className="font-serif font-bold text-2xl text-cream mt-2 mb-2 uppercase">
                    {p.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A1A09A] leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-[#2B2B27] text-xs font-mono text-[#74736D]">
                  ✓ Verified Capstone Deliverable
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Inclusions Checklist */}
      <section className="section-padding bg-cream border-b border-border-custom">
        <Container>
          <SectionHeading
            badge="Included Free"
            title="What's included in your enrollment."
            subtitle="Get unrestricted lifetime access to all course materials and operational toolkits for ₹199."
          />

          <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl border border-border-custom p-8 sm:p-10 shadow-subtle space-y-4">
            {INCLUSIONS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center shrink-0 border border-primary/20">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-sm sm:text-base font-medium text-primary">{item}</span>
              </div>
            ))}

            <div className="pt-8 mt-6 border-t border-border-custom text-center">
              <Button href="/enroll" size="lg" variant="primary" arrow className="w-full sm:w-auto">
                Enroll Now For ₹199
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Course FAQ */}
      <section className="section-padding bg-[#ECEAE4]">
        <Container>
          <SectionHeading
            badge="Course FAQ"
            title="Questions about the course?"
            subtitle="Everything answered clearly before you join."
          />

          <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl border border-border-custom shadow-subtle overflow-hidden">
            <Accordion items={courseFaqs} defaultOpenIndex={0} allowMultiple />
          </div>
        </Container>
      </section>

      {/* Final CTA Banner */}
      <CTABanner
        headline="Ready to become a client-ready Social Media Manager?"
        subheadline="Join now for ₹199. Lifetime access to all 8 modules, 45 lessons, projects, and templates."
        buttonText="Enroll Now — ₹199"
        buttonHref="/enroll"
      />
    </div>
  );
}
