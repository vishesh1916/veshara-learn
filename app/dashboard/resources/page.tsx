import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileText, Table, CheckSquare, Sparkles, ExternalLink } from "lucide-react";
import { FREE_RESOURCES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Student Resource Library — Veshara Learn",
  description: "Download all templates, calendars, checklists, and pitch decks included with your course.",
};

export default function StudentResourcesPage() {
  const proprietaryResources = [
    {
      title: "30-Day Master Content Calendar (Google Sheets)",
      category: "Planning & Batching",
      type: "Google Sheet",
      desc: "Complete editorial spreadsheet with 4-pillar balance, hook columns, status trackers, and automated hashtag managers.",
      link: "/resources/30-day-content-calendar",
    },
    {
      title: "High-Ticket Client Proposal Pitch Deck",
      category: "Sales & Retainers",
      type: "Canva + PDF",
      desc: "Ready-to-customize presentation with scope breakdown, retainer pricing tiers (₹20k–₹60k), and contract terms.",
      link: "/resources/client-proposal-template",
    },
    {
      title: "25-Point Professional Social Media Audit Rubric",
      category: "Client Acquisition",
      type: "PDF Checklist",
      desc: "Diagnostic checklist to audit any brand's bio, aesthetic consistency, reels pacing, and engagement funnel.",
      link: "/resources/social-media-audit-checklist",
    },
    {
      title: "Cold Outreach DM & Email Scripts Pack",
      category: "Client Acquisition",
      type: "Word / Google Doc",
      desc: "Word-for-word scripts to pitch brand founders on Instagram DMs, LinkedIn, and cold email without sounding spammy.",
      link: "/resources/client-proposal-template",
    },
    {
      title: "Freelance Retainer & Pricing Calculator",
      category: "Business Operations",
      type: "Spreadsheet Tool",
      desc: "Input your target monthly income and hours to calculate optimal hourly and monthly retainer rates for Indian clients.",
      link: "/resources/30-day-content-calendar",
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      <div className="space-y-2 pb-6 border-b border-border-custom">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
          Student Toolkit
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
          Resource Library & Templates
        </h1>
        <p className="text-secondary text-sm sm:text-base font-sans">
          All proprietary spreadsheets, swipe files, outreach scripts, and Canva templates included with your enrollment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proprietaryResources.map((res, i) => (
          <div
            key={i}
            className="bg-white border border-border-custom rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-subtle hover:border-primary transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase text-secondary">
                  {res.category}
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-accent/30 text-primary border border-primary/15 font-semibold">
                  {res.type}
                </span>
              </div>

              <h3 className="font-serif font-bold text-2xl text-primary mb-2 uppercase tracking-tight">
                {res.title}
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-6">
                {res.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-border-custom flex items-center justify-between">
              <span className="text-xs font-mono text-primary font-bold">Included in Course</span>
              <a
                href={res.link}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-cream text-xs font-bold hover:bg-accent hover:text-primary transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Asset</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
