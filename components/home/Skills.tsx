import * as React from "react";
import { Target, PenTool, Palette, TrendingUp, BarChart3, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const skillIcons = {
  Target: Target,
  PenTool: PenTool,
  Palette: Palette,
  TrendingUp: TrendingUp,
  BarChart3: BarChart3,
  Users: Users,
};

export function Skills() {
  const skills = [
    {
      title: "Strategy",
      icon: Target,
      tag: "Foundation",
      description:
        "Build target-driven social media plans. Define content pillars, posting schedules, and measurable goals aligned with client revenue.",
    },
    {
      title: "Content Creation",
      icon: PenTool,
      tag: "Production",
      description:
        "Design eye-catching carousels, script thumb-stopping reels, write persuasive captions, and format interactive stories using Canva & modern tools.",
    },
    {
      title: "Branding & Audience",
      icon: Palette,
      tag: "Positioning",
      description:
        "Understand buyer demographics, psycho-graphic triggers, tone of voice, visual aesthetic guidelines, and competitor positioning.",
    },
    {
      title: "Organic Growth",
      icon: TrendingUp,
      tag: "Distribution",
      description:
        "Master the Instagram recommendation algorithms, explore page indexing, audio curation, and outbound engagement strategies without paid ads.",
    },
    {
      title: "Analytics & Reporting",
      icon: BarChart3,
      tag: "Retention",
      description:
        "Extract key insights from Meta dashboards, calculate engagement rates, and build monthly executive decks that justify client retainers.",
    },
    {
      title: "Client Acquisition",
      icon: Users,
      tag: "Monetization",
      description:
        "Master cold DM outreach, write compelling proposals, package ₹20k–₹60k/month retainers, and manage ongoing client expectations professionally.",
    },
  ];

  return (
    <section className="section-padding bg-cream border-t border-border-custom">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="The Complete Skill Suite"
            title="Everything you need to become client-ready."
            subtitle="Six core competencies that separate amateur poster accounts from six-figure social media managers."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <ScrollReveal key={skill.title} delay={index * 0.1}>
                <Card className="h-full flex flex-col justify-between group hover:border-primary">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary text-cream flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider text-secondary">
                        {skill.tag}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-2xl text-primary mb-3 uppercase tracking-tight">
                      {skill.title}
                    </h3>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border-custom/50 flex items-center justify-between text-xs font-mono text-secondary">
                    <span>Module Verified</span>
                    <span className="text-primary font-bold">Practical Project ✓</span>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
