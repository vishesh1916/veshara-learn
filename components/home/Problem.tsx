import * as React from "react";
import { Compass, FolderX, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function Problem() {
  const problems = [
    {
      number: "01",
      icon: Compass,
      title: "No Strategy",
      description:
        "You know what content looks like, but not what to create or why. You post randomly without content pillars, audience positioning, or business goals.",
    },
    {
      number: "02",
      icon: FolderX,
      title: "No Portfolio",
      description:
        "You watch hours of video tutorials but finish without meaningful work to show. When a potential client asks for proof, you have nothing tangible to send.",
    },
    {
      number: "03",
      icon: HelpCircle,
      title: "No Direction",
      description:
        "You don't know how to turn your digital skill into an actual service. You don't know what to charge, how to pitch brands, or how to package a monthly retainer.",
    },
  ];

  return (
    <section className="section-padding bg-cream border-t border-border-custom">
      <Container>
        <ScrollReveal>
          <SectionHeading
            badge="The Problem With Most Courses"
            title="Watching tutorials isn't enough."
            subtitle="Knowing how to scroll social media or create a random post is very different from knowing how to professionally manage a business brand."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <ScrollReveal key={problem.title} delay={index * 0.15}>
                <Card className="h-full flex flex-col justify-between border-border-custom bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-xl bg-primary text-cream flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-mono text-xs font-bold text-secondary tracking-widest">
                        {problem.number}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-2xl text-primary mb-3 uppercase tracking-tight">
                      {problem.title}
                    </h3>
                    <p className="text-secondary text-base leading-relaxed">
                      {problem.description}
                    </p>
                  </div>

                  <div className="pt-8 mt-8 border-t border-border-custom/50 text-xs font-mono font-medium text-secondary">
                    Gap: Casual User → Professional Manager
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
