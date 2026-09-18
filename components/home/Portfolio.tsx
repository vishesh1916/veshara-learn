import * as React from "react";
import {
  FileText,
  Calendar,
  TrendingUp,
  Image as ImageIcon,
  BarChart3,
  Briefcase,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function Portfolio() {
  const portfolioPieces = [
    {
      number: "01",
      icon: FileText,
      title: "Brand Strategy Document",
      tag: "Branding",
      subtitle: "Audience Persona & Positioning Brief",
      deliverables: [
        "Customer avatar & psychographic profiling",
        "Brand voice tone spectrum & word banks",
        "Competitor gap & visual whitespace map",
        "Strategic channel goals & KPI framework",
      ],
    },
    {
      number: "02",
      icon: Calendar,
      title: "30-Day Master Content Calendar",
      tag: "Strategy",
      subtitle: "Multi-Platform Editorial Spreadsheet",
      deliverables: [
        "4-core content pillars balanced monthly",
        "30 specific hooks, formats & caption briefs",
        "Asset links & publishing status workflow",
        "Optimal posting schedule & hashtag sets",
      ],
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Organic Growth Playbook",
      tag: "Reach",
      subtitle: "Algorithmic Reach & Reel Funnel",
      deliverables: [
        "Short-form reel hook architecture",
        "Explore page indexing guidelines",
        "Proactive 30-minute daily engagement SOP",
        "Collaborator outreach & co-authoring plan",
      ],
    },
    {
      number: "04",
      icon: ImageIcon,
      title: "Branded Content Asset Package",
      tag: "Design",
      subtitle: "Canva Pro Social Production Suite",
      deliverables: [
        "5 multi-slide educational carousels",
        "3 high-retention reel visual concept boards",
        "5 interactive daily story template sequences",
        "Consistent brand kit typography & color palette",
      ],
    },
    {
      number: "05",
      icon: BarChart3,
      title: "Monthly Executive Analytics Deck",
      tag: "Analytics",
      subtitle: "Client-Facing ROI Performance Report",
      deliverables: [
        "Engagement rate & follower velocity trends",
        "Top-performing content autopsy & learnings",
        "Website referral & DM lead attribution",
        "Strategic recommendations for contract renewal",
      ],
    },
    {
      number: "06",
      icon: Briefcase,
      title: "High-Ticket Client Proposal Deck",
      tag: "Sales",
      subtitle: "Ready-to-Pitch Retainer Agreement",
      deliverables: [
        "Formal scope of work & deliverables tiering",
        "Monthly pricing table (₹20k, ₹40k, ₹60k/mo)",
        "Standard service agreement & payment terms",
        "Client onboarding checklist & kickoff roadmap",
      ],
    },
  ];

  return (
    <section className="section-padding bg-[#11110F] text-cream relative overflow-hidden" id="portfolio">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      <Container>
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-primary border border-primary/20 mb-4">
              The Real-World Proof
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream tracking-[-0.03em] leading-[0.98] uppercase">
              Don&apos;t finish with just a certificate.
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#A1A09A] font-sans leading-relaxed">
              Build work you can actually show. By the time you complete this course, you will possess a complete 6-piece client-ready portfolio to send to prospects.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 High-Impact Portfolio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {portfolioPieces.map((piece, index) => {
            const Icon = piece.icon;
            return (
              <ScrollReveal key={piece.title} delay={index * 0.1}>
                <div className="bg-[#1C1C19] border border-[#2E2E2A] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full hover:border-accent/60 transition-all duration-300 group shadow-xl">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#74736D] tracking-widest">
                        DELIVERABLE {piece.number}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold block mb-1">
                      {piece.tag} • {piece.subtitle}
                    </span>

                    <h3 className="font-serif font-bold text-2xl text-cream mb-4 uppercase tracking-tight group-hover:text-accent transition-colors">
                      {piece.title}
                    </h3>

                    {/* What goes into this deliverable */}
                    <div className="space-y-2.5 pt-2 mb-6">
                      {piece.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A09A]">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-[#2B2B27] flex items-center justify-between text-xs font-mono text-[#74736D]">
                    <span>Ready to Pitch</span>
                    <span className="text-accent group-hover:underline">Client-Ready Proof →</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Proof Assurance Box */}
        <div className="mt-14 max-w-4xl mx-auto bg-[#1C1C19] border border-accent/40 rounded-2xl p-8 text-center sm:flex items-center justify-between gap-6">
          <div className="text-left space-y-1 mb-4 sm:mb-0">
            <h4 className="font-serif font-bold text-xl text-cream uppercase">
              No previous experience? No problem.
            </h4>
            <p className="text-sm text-[#A1A09A]">
              We provide prompt sheets, step-by-step video walk-throughs, and review checklists for every deliverable.
            </p>
          </div>
          <Button href="/enroll" size="md" variant="primary" arrow className="whitespace-nowrap shrink-0">
            Start Building — ₹199
          </Button>
        </div>
      </Container>
    </section>
  );
}
