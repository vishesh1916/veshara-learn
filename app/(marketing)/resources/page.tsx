import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { FREE_RESOURCES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadCapture } from "@/components/shared/LeadCapture";

export const metadata: Metadata = {
  title: "Free Social Media Management Resources & Templates | Veshara Learn",
  description: "Free downloadable templates: 30-Day Master Content Calendar, Client Proposal Template, and SMM Audit Checklist.",
};

export default function ResourcesPage() {
  const featured = FREE_RESOURCES[0];
  const others = FREE_RESOURCES.slice(1);

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-border-custom bg-cream">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-primary border border-primary/20">
              Free Downloads
            </span>
            <h1 className="font-serif font-bold text-4xl sm:text-6xl text-primary tracking-[-0.04em] uppercase">
              Free SMM Templates & Toolkits.
            </h1>
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              Tested templates, frameworks, and checklists used by professional social media managers. 100% free to download.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Resource Banner */}
      <section className="py-12 bg-white border-b border-border-custom">
        <Container>
          <div className="bg-[#F5F3EE] border-2 border-primary rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider bg-primary text-cream px-3 py-1 rounded-full">
                ★ Featured Toolkit • Instant Free Access
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-primary uppercase">
                {featured.title}
              </h2>
              <p className="text-secondary text-sm sm:text-base leading-relaxed">
                {featured.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-primary pt-2">
                {featured.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Email capture */}
            <div className="w-full md:w-80 bg-white p-6 rounded-2xl border border-border-custom shadow-subtle shrink-0">
              <h4 className="font-sans font-bold text-sm text-primary mb-1">
                Instant Free Access
              </h4>
              <p className="text-xs text-secondary mb-4">
                We will email this guide directly to your inbox.
              </p>
              <LeadCapture
                source={featured.slug}
                buttonText="Send Me PDF"
                placeholder="Enter your email..."
                stacked
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Resources Grid */}
      <section className="section-padding bg-cream">
        <Container>
          <SectionHeading
            badge="Resource Library"
            title="All Free Toolkits & Guides."
            subtitle="Click any resource below to preview its contents and download your free copy."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
            {others.map((res) => (
              <div
                key={res.slug}
                className="bg-white border border-border-custom rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-primary transition-all shadow-subtle group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase text-secondary">
                      {res.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/30 text-primary border border-primary/10">
                      {res.type}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-primary mb-2 group-hover:text-primary transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary leading-relaxed mb-4">
                    {res.description}
                  </p>

                  <div className="space-y-1.5 pt-2 mb-6 border-t border-border-custom/50">
                    {res.benefits.slice(0, 3).map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-[#555]">
                        <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/resources/${res.slug}`}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-border-custom text-xs font-mono font-bold text-primary hover:text-accent transition-colors"
                >
                  <span>Download Free Copy</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
