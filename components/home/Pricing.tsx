import * as React from "react";
import { Check, ShieldCheck, Zap, Sparkles, Clock, Lock } from "lucide-react";
import { COURSE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function Pricing() {
  const features = [
    "Full 8-Module Video Curriculum (45 Practical Lessons)",
    "6 Hands-on Portfolio Capstone Projects",
    "Plug-and-play 30-Day Content Calendar (Google Sheets)",
    "High-Ticket Client Proposal Deck (Canva + PDF)",
    "Executive Monthly Analytics & Reporting Deck",
    "Direct Client Outreach Scripts (DM, Email, LinkedIn)",
    "Official Veshara Learn Course Completion Certificate",
    "Instant Lifetime Access with All Future Updates",
  ];

  return (
    <section className="section-padding bg-[#ECEAE4] border-t border-border-custom" id="pricing">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="Simple, Transparent Pricing"
            title="Start building your skill today."
            subtitle="Zero monthly subscriptions. Zero hidden upsells. Get lifetime access to the complete flagship course for less than the cost of a weekend pizza."
          />
        </ScrollReveal>

        <div className="max-w-xl mx-auto mt-12">
          <ScrollReveal delay={0.15}>
            <div className="bg-white border-2 border-primary rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              {/* Highlight ribbon */}
              <div className="absolute -top-1 right-8">
                <span className="bg-accent text-primary text-[11px] font-mono font-bold uppercase tracking-wider px-4 py-1.5 rounded-b-lg border-x border-b border-primary shadow-sm">
                  {COURSE.discountPercentage}
                </span>
              </div>

              {/* Title & Badge */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
                  {COURSE.badge}
                </span>
                <h3 className="font-serif font-bold text-3xl sm:text-4xl text-primary uppercase tracking-tight">
                  {COURSE.title}
                </h3>
                <p className="text-sm text-secondary">
                  {COURSE.subtitle}
                </p>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 pb-6 mb-8 border-b border-border-custom">
                <span className="font-serif font-bold text-6xl sm:text-7xl text-primary tracking-tight">
                  {COURSE.priceDisplay}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-secondary line-through font-mono">
                    {COURSE.originalPriceDisplay}
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wide text-primary">
                    One-time payment • Lifetime access
                  </span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3.5 mb-8">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                  What&apos;s Included In Your Enrollment:
                </h4>
                {features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-sm sm:text-base text-primary font-medium">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="space-y-3">
                <Button
                  href="/enroll"
                  size="lg"
                  variant="primary"
                  arrow
                  className="w-full text-base py-4 shadow-[0_4px_24px_rgba(217,255,37,0.4)]"
                >
                  ENROLL NOW — {COURSE.priceDisplay}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-secondary pt-1">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>Secure 256-bit encrypted checkout with Razorpay</span>
                </div>
              </div>

              {/* Payment Methods Pill */}
              <div className="mt-6 pt-6 border-t border-border-custom/60 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-secondary">
                <span>UPI (GPay, PhonePe, Paytm)</span>
                <span>•</span>
                <span>All Debit & Credit Cards</span>
                <span>•</span>
                <span>Net Banking</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
