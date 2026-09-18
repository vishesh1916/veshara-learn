import * as React from "react";
import { ShieldCheck, FileCheck2, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function SocialProof() {
  const standards = [
    {
      icon: FileCheck2,
      tag: "PORTFOLIO GUARANTEE",
      title: "6 Client-Ready Deliverables",
      description:
        "You don't just watch videos. Every student graduates with an executive 30-day content calendar, brand brief, high-ticket proposal deck, and monthly ROI analytics report ready to pitch.",
      badge: "Real Portfolio Deliverables",
    },
    {
      icon: ShieldCheck,
      tag: "ZERO FAKE REVIEWS POLICY",
      title: "Authentic & Verified Feedback",
      description:
        "We never manufacture fake reviews or purchase artificial ratings. All student reviews on Veshara Learn will be published exclusively from verified enrolled learners upon finishing their projects.",
      badge: "100% Genuine Transparency",
    },
    {
      icon: Award,
      tag: "CREDENTIAL INTEGRITY",
      title: "Earned Digital Certification",
      description:
        "Certificates are unlocked only after completing all 45 lessons across 8 modules. Every certificate carries a unique tamper-proof ID that employers and freelance clients can independently verify.",
      badge: "Verified Proof of Competence",
    },
  ];

  return (
    <section className="section-padding bg-cream border-t border-border-custom">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="The Veshara Learning Standard"
            title="The proof is in the work."
            subtitle="We don't manufacture fake testimonials. Veshara Learn is dedicated to real outcomes, genuine portfolio creation, and authentic career advancement for every enrolled student."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 max-w-5xl mx-auto">
          {standards.map((standard, index) => {
            const Icon = standard.icon;
            return (
              <ScrollReveal key={standard.title} delay={index * 0.12}>
                <div className="bg-white border-2 border-primary/20 hover:border-primary rounded-2xl p-7 flex flex-col justify-between h-full shadow-subtle transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-secondary bg-[#F5F3EE] px-2.5 py-1 rounded">
                        {standard.tag}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-primary mb-3 uppercase tracking-tight">
                      {standard.title}
                    </h3>
                    <p className="text-secondary text-sm leading-relaxed font-sans">
                      {standard.description}
                    </p>
                  </div>
                  <div className="pt-5 mt-6 border-t border-border-custom/60 flex items-center gap-2 text-xs font-mono font-bold text-primary">
                    <CheckCircle2 className="w-4 h-4 text-accent stroke-[3]" />
                    <span>{standard.badge}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Commitment Badge */}
        <div className="mt-12 text-center text-xs font-mono text-secondary flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Veshara Transparency Guarantee: Built for serious learners, freelancers, and future managers.</span>
        </div>
      </Container>
    </section>
  );
}
