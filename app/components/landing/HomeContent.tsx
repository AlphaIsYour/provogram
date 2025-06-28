// app/components/landing/HomeContent.tsx
import React from "react";
import HeroSection from "@/app/components/landing/components/HeroSection";
import AboutSection from "@/app/components/landing/components/AboutSection";
import TeamSection from "@/app/components/landing/components/TeamSection";
import DivisionsSection from "@/app/components/landing/components/DivisionSection";
import Events from "@/app/components/landing/components/Events";

export default function HomeContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <DivisionsSection />
      <Events />
    </>
  );
}
