import * as React from "react";
import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { Solution } from "@/components/home/Solution";
import { Skills } from "@/components/home/Skills";
import { Curriculum } from "@/components/home/Curriculum";
import { Portfolio } from "@/components/home/Portfolio";
import { Tools } from "@/components/home/Tools";
import { Audience } from "@/components/home/Audience";
import { Inclusions } from "@/components/home/Inclusions";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SocialProof } from "@/components/home/SocialProof";
import { Pricing } from "@/components/home/Pricing";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Problem />
      <Solution />
      <Skills />
      <Curriculum />
      <Portfolio />
      <Tools />
      <Audience />
      <Inclusions />
      <HowItWorks />
      <SocialProof />
      <Pricing />
      <HomeFAQ />
      <FinalCTA />
    </div>
  );
}
