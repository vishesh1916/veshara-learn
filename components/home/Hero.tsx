"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  BarChart3,
  FileText,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-cream">
      {/* Background ambient accents with subtle Veshara warm orange & lime glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-r from-orange-500/10 via-accent/15 to-orange-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <Container>
        <div className="text-center max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Main Editorial H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-primary tracking-[-0.04em] leading-[0.92] uppercase"
          >
            Become A Social <br className="hidden sm:inline" />
            Media Manager.
          </motion.h1>

          {/* Supporting Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="space-y-3 max-w-2xl mx-auto"
          >
            <p className="font-serif italic text-2xl sm:text-3xl text-primary/90">
              Learn the skills brands actually pay for.
            </p>
            <p className="font-sans text-base sm:text-lg text-secondary leading-relaxed">
              Strategy. Content creation. Organic growth. Analytics. Client proposals. Go from someone who scrolls social media to someone who gets paid to manage it.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Button
              href="/enroll"
              size="lg"
              variant="primary"
              arrow
              className="w-full sm:w-auto text-base shadow-[0_4px_20px_rgba(217,255,37,0.35)]"
            >
              Start Learning Now — ₹199
            </Button>
            <Button
              href="/course"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base bg-white"
            >
              Explore Full Curriculum
            </Button>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-secondary font-medium"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>45 Practical Video Lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>6 Portfolio Capstone Projects</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Verified Certificate Included</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual Mockup: The 4 Outcome Pillars (No stock photos!) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-14 sm:mt-20 max-w-5xl mx-auto"
        >
          <div className="bg-[#11110F] p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-primary/20 shadow-2xl relative overflow-hidden text-cream">
            {/* Window header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#252522] mb-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <span className="ml-3 font-mono text-xs text-[#74736D]">
                  veshara-portfolio-deliverables.app
                </span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                Client-Ready Proof
              </span>
            </div>

            {/* 4 Outcome Deliverables Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-[#1C1C19] border border-[#2D2D29] rounded-xl p-5 hover:border-accent/40 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent text-primary flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] text-[#A1A09A]">PROJECT 01</span>
                </div>
                <h4 className="font-sans font-bold text-base text-cream mb-1">
                  30-Day Content Calendar
                </h4>
                <p className="text-xs text-[#A1A09A] leading-relaxed">
                  Pillar distribution, hooks, formats & auto-scheduling blueprint.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#1C1C19] border border-[#2D2D29] rounded-xl p-5 hover:border-accent/40 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent text-primary flex items-center justify-center font-bold">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] text-[#A1A09A]">PROJECT 02</span>
                </div>
                <h4 className="font-sans font-bold text-base text-cream mb-1">
                  Brand Growth Strategy
                </h4>
                <p className="text-xs text-[#A1A09A] leading-relaxed">
                  Organic reach playbook, competitor whitespace & audience profile.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#1C1C19] border border-[#2D2D29] rounded-xl p-5 hover:border-accent/40 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent text-primary flex items-center justify-center font-bold">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] text-[#A1A09A]">PROJECT 03</span>
                </div>
                <h4 className="font-sans font-bold text-base text-cream mb-1">
                  Monthly Analytics Report
                </h4>
                <p className="text-xs text-[#A1A09A] leading-relaxed">
                  Clean executive ROI dashboard translating metrics into renewals.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#1C1C19] border border-accent/60 rounded-xl p-5 bg-gradient-to-b from-[#1C1C19] to-[#25251F]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent text-primary flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[10px] text-accent font-bold">FINAL PITCH</span>
                </div>
                <h4 className="font-sans font-bold text-base text-cream mb-1">
                  Client Proposal Deck
                </h4>
                <p className="text-xs text-[#A1A09A] leading-relaxed">
                  Ready-to-send retainer proposal with pricing, scope & contract terms.
                </p>
              </div>
            </div>

            {/* Bottom Proof Strip */}
            <div className="mt-6 pt-5 border-t border-[#252522] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A1A09A]">
              <span className="font-mono text-accent">
                Outcome: You don&apos;t just finish a course — you finish with tangible client proof.
              </span>
              <span className="text-[#74736D]">
                Built for Indian Students, Freelancers & Creators
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
