import * as React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function Tools() {
  const tools = [
    {
      name: "Instagram",
      role: "Platform Growth & Algorithm Indexing",
      type: "Distribution",
      badge: "Mobile & Web",
    },
    {
      name: "Meta Suite",
      role: "Unified Scheduling, Moderation & DMs",
      type: "Operations",
      badge: "Official Meta Tool",
    },
    {
      name: "Google Sheets",
      role: "Content Calendars & Retainer Metrics",
      type: "Planning",
      badge: "Templates Provided",
    },
    {
      name: "ChatGPT & AI",
      role: "Hook Copywriting & Audience Research",
      type: "Efficiency",
      badge: "Prompt Kits Included",
    },
  ];

  return (
    <section className="section-padding bg-cream border-t border-border-custom">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="Industry Workflows"
            title="Learn the tools modern social media teams use."
            subtitle="Master the exact, practical software stack required by modern brands, marketing agencies, and top creators."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {tools.map((tool, index) => (
            <ScrollReveal key={tool.name} delay={index * 0.08}>
              <div className="bg-white border border-border-custom rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-primary transition-all duration-200 shadow-subtle group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-secondary">
                      {tool.type}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F3EE] border border-border-custom text-primary font-medium">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-primary mb-2 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">
                    {tool.role}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-border-custom/50 flex items-center justify-between text-xs font-mono text-secondary">
                  <span>Zero expensive tools</span>
                  <span className="text-primary font-semibold">100% Practical</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
