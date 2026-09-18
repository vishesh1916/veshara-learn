import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface CTABannerProps {
  headline?: string;
  subheadline?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CTABanner({
  headline = "Learn the skill. Build the proof. Create the opportunity.",
  subheadline = "Join the flagship Social Media Manager course today for just ₹199. One-time payment, lifetime access.",
  buttonText = "Start Learning Now — ₹199",
  buttonHref = "/enroll",
}: CTABannerProps) {
  return (
    <section className="bg-primary text-cream py-20 md:py-28 relative overflow-hidden">
      {/* Subtle decorative grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#F5F3EE_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <Container className="relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-block">
            <span className="text-xs font-mono font-bold tracking-widest uppercase bg-accent text-primary px-3 py-1 rounded-full">
              Get Started Today
            </span>
          </div>

          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream tracking-[-0.03em] leading-[1.02] uppercase">
            {headline}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#A1A09A] max-w-2xl mx-auto font-sans leading-relaxed">
            {subheadline}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={buttonHref}
              size="lg"
              variant="primary"
              arrow
              className="w-full sm:w-auto text-base"
            >
              {buttonText}
            </Button>
            <Button
              href="/course"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#74736D] text-cream hover:bg-white/10 hover:border-white"
            >
              Explore Curriculum
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
