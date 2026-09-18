import * as React from "react";
import { Check, ArrowRight } from "lucide-react";
import { INCLUSIONS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function Inclusions() {
  return (
    <section className="section-padding bg-cream border-t border-border-custom">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="Everything Included"
            title="More than a video course."
            subtitle="You receive a complete operational toolkit: actionable templates, swipe files, contract terms, and client outreach materials ready for immediate deployment."
          />
        </ScrollReveal>

        <div className="max-w-4xl mx-auto mt-12 bg-white border border-border-custom rounded-2xl p-6 sm:p-10 shadow-subtle">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {INCLUSIONS.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3.5 p-3.5 rounded-lg hover:bg-[#F5F3EE]/60 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-accent text-primary flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-sans text-sm sm:text-base font-medium text-primary">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-border-custom flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#F5F3EE] p-6 rounded-xl">
            <div>
              <span className="text-xs font-mono uppercase text-secondary font-semibold">
                Total Value: Over ₹15,000
              </span>
              <h4 className="font-serif font-bold text-2xl text-primary mt-0.5">
                Yours today for ₹199 only
              </h4>
            </div>
            <Button href="/enroll" size="md" variant="primary" arrow className="whitespace-nowrap">
              Unlock All Inclusions
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
