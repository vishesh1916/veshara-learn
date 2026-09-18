import * as React from "react";
import { ArrowRight, BookOpen, PenTool, LayoutGrid, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function Solution() {
  const steps = [
    {
      step: "01",
      name: "LEARN",
      icon: BookOpen,
      title: "Actionable Frameworks",
      desc: "Zero fluff. Master how modern algorithms, buyer psychology, and platform workflows actually operate.",
    },
    {
      step: "02",
      name: "PRACTICE",
      icon: PenTool,
      title: "Guided Exercises",
      desc: "Apply each concept immediately using provided templates, prompt libraries, and design guidelines.",
    },
    {
      step: "03",
      name: "BUILD",
      icon: LayoutGrid,
      title: "Real Client Assets",
      desc: "Construct an impressive 6-piece portfolio: Content calendars, growth strategies, and analytics decks.",
    },
    {
      step: "04",
      name: "PITCH",
      icon: Send,
      title: "Land Retainers",
      desc: "Use our plug-and-play pitch decks, outreach scripts, and pricing guides to sign your first paying client.",
    },
  ];

  return (
    <section className="section-padding bg-[#ECEAE4] border-t border-border-custom">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="The Veshara Method"
            title="Learn by doing."
            subtitle="Veshara Learn combines structured video lessons with hands-on projects so you don't just finish a course — you finish with indisputable proof of what you can build."
          />
        </ScrollReveal>

        {/* 4-Step Horizontal Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.name} delay={index * 0.12}>
                <div className="bg-white border border-border-custom rounded-2xl p-6 sm:p-7 relative flex flex-col justify-between h-full shadow-subtle hover:border-primary transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-accent text-primary border border-primary/20">
                        STAGE {item.step}
                      </span>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    <h3 className="font-serif font-bold text-3xl text-primary tracking-tight mb-2">
                      {item.name}
                    </h3>
                    <h4 className="font-sans font-semibold text-sm text-primary mb-2">
                      {item.title}
                    </h4>
                    <p className="text-secondary text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border-custom/60 flex items-center justify-between text-xs font-mono text-secondary">
                    <span>Deliverable ready</span>
                    {index < steps.length - 1 ? (
                      <span className="text-primary font-bold">→ Next Stage</span>
                    ) : (
                      <span className="text-primary font-bold">✓ Client Ready</span>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Philosophy Banner */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 bg-white rounded-xl border border-border-custom p-6 sm:p-8 text-center max-w-3xl mx-auto shadow-subtle">
            <p className="font-serif italic text-xl sm:text-2xl text-primary mb-2">
              &ldquo;Don&apos;t just learn social media. Learn how to actually manage it.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-secondary font-sans">
              The exact bridge from hobbyist content creator to sought-after freelance professional.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
