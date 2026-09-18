import * as React from "react";
import type { Metadata } from "next";
import { Sparkles, CheckCircle2, Shield, Target, Compass, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "About Veshara Learn — Practical Education for the Digital Economy",
  description: "Learn skills. Build proof. Create opportunities. Learn about our mission to provide high-impact, career-focused digital education for India.",
};

export default function AboutPage() {
  const principles = [
    {
      icon: Target,
      title: "Practical",
      subtitle: "Learn through direct application",
      description:
        "Information without execution is useless. Every concept taught in Veshara Learn is paired with an assignment, a template, or a live exercise that forces you to build.",
    },
    {
      icon: Compass,
      title: "Relevant",
      subtitle: "Master workflows that matter in 2026",
      description:
        "The digital economy moves quickly. We teach modern, in-demand workflows: Meta Business Suite, Canva design systems, short-form reel hooks, and AI-assisted research.",
    },
    {
      icon: Award,
      title: "Outcome-Focused",
      subtitle: "Finish with tangible client proof",
      description:
        "You don't finish our courses with just a digital certificate to bury on LinkedIn. You finish with an actual 6-piece portfolio ready to pitch to paying clients.",
    },
  ];

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="py-20 md:py-28 border-b border-border-custom bg-cream">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-primary border border-primary/20">
              Our Vision
            </span>

            <h1 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-primary tracking-[-0.04em] leading-[0.95] uppercase">
              We&apos;re building practical education for the digital economy.
            </h1>

            <p className="text-lg sm:text-xl text-secondary leading-relaxed font-sans">
              Most online learning gives people passive information. Veshara Learn is built around what happens next: applying the skill, creating real work, and building genuine confidence through practice.
            </p>
          </div>
        </Container>
      </section>

      {/* Brand Story Section */}
      <section className="section-padding bg-white border-b border-border-custom">
        <Container narrow>
          <div className="space-y-6 text-base sm:text-lg text-secondary leading-relaxed font-sans">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-primary uppercase tracking-tight">
              Why we started Veshara Learn
            </h2>

            <p>
              In India today, millions of college students and ambitious beginners are eager to earn their first income online. They scroll social media for hours, watch endless YouTube tutorials on digital marketing, and enroll in ₹10,000 coaching institutes that promise everything and deliver generic slides.
            </p>

            <p>
              When they finish, they face the exact same frustrating reality: <em>“I have a certificate, but I don&apos;t know how to create a 30-day content calendar for a local gym or pitch a D2C fashion brand.”</em>
            </p>

            <div className="p-6 sm:p-8 bg-[#F5F3EE] rounded-2xl border-l-4 border-accent space-y-3">
              <h3 className="font-serif font-bold text-2xl text-primary uppercase">
                Our Core Proposition
              </h3>
              <p className="font-serif italic text-xl sm:text-2xl text-primary">
                &ldquo;Learn skills. Build proof. Create opportunities.&rdquo;
              </p>
              <p className="text-sm text-secondary">
                We believe that true confidence comes from having tangible proof of your abilities. If you can show a client a complete strategic plan and high-quality creative assets before asking for a contract, winning the retainer is almost inevitable.
              </p>
            </div>

            <p>
              That is why our flagship course — <strong>Social Media Manager: From Beginner to Client-Ready</strong> — is priced at just ₹199. We removed every financial barrier so that anyone with motivation, a smartphone or laptop, and an internet connection can build a real skill that pays.
            </p>
          </div>
        </Container>
      </section>

      {/* 3 Core Principles */}
      <section className="section-padding bg-cream border-b border-border-custom">
        <Container>
          <SectionHeading
            badge="Guiding Principles"
            title="What drives every course we build."
            subtitle="Three non-negotiable pillars embedded into every lesson, assignment, and template."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-white border border-border-custom rounded-2xl p-8 flex flex-col justify-between shadow-subtle hover:border-primary transition-colors"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary text-cream flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-primary uppercase mb-1">
                      {p.title}
                    </h3>
                    <h4 className="text-xs font-mono font-semibold uppercase text-secondary mb-3">
                      {p.subtitle}
                    </h4>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-border-custom/50 text-xs font-mono text-primary font-bold">
                    ✓ Core Veshara Standard
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTABanner
        headline="Join the movement of practical learners."
        subheadline="Start mastering Social Media Management today for ₹199."
        buttonText="Start Learning — ₹199"
        buttonHref="/enroll"
      />
    </div>
  );
}
