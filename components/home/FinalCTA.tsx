import * as React from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-primary text-cream py-24 sm:py-32 relative overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/15 blur-[140px] rounded-full pointer-events-none" />

      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transform Your Career For ₹199</span>
          </div>

          <h2 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-cream tracking-[-0.04em] leading-[0.92] uppercase">
            Learn the skill. <br />
            Build the proof. <br />
            Create the opportunity.
          </h2>

          <p className="text-base sm:text-xl text-[#A1A09A] max-w-2xl mx-auto font-sans leading-relaxed">
            Stop passively consuming content. Join hundreds of ambitious learners mastering real social media management and building a portfolio that commands retainers.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/enroll"
              size="lg"
              variant="primary"
              arrow
              className="w-full sm:w-auto text-base py-4 px-8 shadow-[0_4px_30px_rgba(217,255,37,0.4)]"
            >
              Start Learning Now — ₹199
            </Button>
            <Button
              href="/course"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#555] text-cream hover:bg-white/10 hover:border-white"
            >
              Review Syllabus
            </Button>
          </div>

          {/* Quick reassurance points */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#A1A09A]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Instant Lifetime Access</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>All 8 Modules & 45 Lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Verified Certificate Included</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
