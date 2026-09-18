import * as React from "react";
import { HOW_IT_WORKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function HowItWorks() {
  return (
    <section className="section-padding bg-[#ECEAE4] border-t border-border-custom">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="Your Journey"
            title="How it works."
            subtitle="Five clear, streamlined stages from clicking enroll to landing your first paid retainer client."
          />
        </ScrollReveal>

        <div className="max-w-4xl mx-auto mt-14">
          <div className="space-y-6">
            {HOW_IT_WORKS.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.1}>
                <div className="bg-white border border-border-custom rounded-xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle hover:border-primary transition-all">
                  <div className="flex items-center gap-5 sm:gap-6">
                    <span className="w-12 h-12 rounded-xl bg-primary text-accent font-mono font-bold text-lg flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-primary uppercase tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-secondary text-sm sm:text-base mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-semibold px-3 py-1 rounded bg-[#F5F3EE] text-primary border border-border-custom self-start sm:self-center shrink-0">
                    Step {index + 1} of 5
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
