import * as React from "react";
import { GraduationCap, Sparkles, Briefcase, Video, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function Audience() {
  const personas = [
    {
      icon: GraduationCap,
      title: "College Students",
      tag: "Skill + Degree",
      description:
        "Learn an in-demand, high-income digital skill alongside your degree. Start freelancing from your hostel room and graduate with real client experience and savings.",
    },
    {
      icon: Sparkles,
      title: "Complete Beginners",
      tag: "Zero to One",
      description:
        "You don't need marketing degrees, fancy hardware, or prior followers. We start from absolute fundamentals and guide you through every click and process.",
    },
    {
      icon: Briefcase,
      title: "Aspiring Freelancers",
      tag: "High Retainers",
      description:
        "Move away from one-off low-ticket graphic design gigs. Package monthly social media management retainers (₹20k–₹50k/mo) for predictable, recurring income.",
    },
    {
      icon: Video,
      title: "Content Creators",
      tag: "Monetize Skills",
      description:
        "Turn your creative intuition into a structured B2B service. Help busy brand founders, local doctors, real estate firms, and eCommerce stores grow their accounts.",
    },
    {
      icon: Compass,
      title: "Career Switchers",
      tag: "New Direction",
      description:
        "Pivot from saturated traditional corporate or technical roles into creative, flexible, work-from-anywhere digital marketing with real portfolio proof.",
    },
  ];

  return (
    <section className="section-padding bg-[#ECEAE4] border-t border-border-custom">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="Tailored For You"
            title="Built for beginners. Designed for ambition."
            subtitle="Whether you're starting from absolute zero or leveling up your freelance business, Veshara Learn provides the exact roadmap."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {personas.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={index * 0.1}>
                <div className="bg-white border border-border-custom rounded-xl p-7 flex flex-col justify-between h-full shadow-subtle hover:border-primary transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary text-cream flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider text-secondary">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-2xl text-primary mb-3 uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border-custom/50 flex items-center justify-between text-xs font-mono text-secondary">
                    <span>Target Outcome</span>
                    <span className="text-primary font-bold">Client-Ready ✓</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          {/* Quick Summary Card */}
          <ScrollReveal delay={personas.length * 0.1}>
            <div className="bg-primary text-cream border border-primary rounded-xl p-7 flex flex-col justify-between h-full shadow-lg">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                  ONE COMMON GOAL
                </span>
                <h3 className="font-serif font-bold text-2xl text-cream mt-3 mb-4 uppercase tracking-tight">
                  Learn practical skills that pay.
                </h3>
                <p className="text-sm text-[#A1A09A] leading-relaxed">
                  No fluff, no abstract theory. Just high-impact execution that brands in India and abroad pay monthly retainers for.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#2B2B27] flex items-center justify-between text-xs font-mono text-accent">
                <span>Fee: ₹199 only</span>
                <span>Lifetime Access →</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
