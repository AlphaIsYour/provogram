// app/components/landing/HomeContent.tsx
import React from "react";
import AutoSlider from "@/app/components/landing/components/AutoSlider";
import HeroSection from "@/app/components/landing/components/HeroSection";
import AboutSection from "@/app/components/landing/components/AboutSection";
import TeamSection from "@/app/components/landing/components/TeamSection";
import DivisionsSection from "@/app/components/landing/components/DivisionSection";
import Events from "@/app/components/landing/components/Events";

const sliderItems = [
  { src: "/slider/flutter.png", alt: "Slide 1" },
  { src: "/slider/java.png", alt: "Slide 2" },
  { src: "/slider/kotlin.png", alt: "Slide 3" },
  { src: "/slider/next.png", alt: "Slide 4" },
  { src: "/slider/node.png", alt: "Slide 5" },
  { src: "/slider/prisma.png", alt: "Slide 6" },
  { src: "/slider/python.png", alt: "Slide 7" },
  { src: "/slider/react.png", alt: "Slide 8" },
  { src: "/slider/tailwind.png", alt: "Slide 9" },
  { src: "/slider/vue.png", alt: "Slide 10" },
];

export default function HomeContent() {
  // Slider Section
  const SliderSection = () => {
    return (
      <section
        id="slider"
        className="bg-[#0D1117] py-15 border-t border-gray-500"
      >
        <div className="container mx-auto px-3">
          <div className="flex justify-center">
            <AutoSlider
              items={sliderItems}
              width={175}
              height={120}
              duration={30}
              reverse={false}
              className="rounded-lg overflow-hidden shadow-2xl"
            />
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <HeroSection />
      <SliderSection />
      <AboutSection />
      <TeamSection />
      <DivisionsSection />
      <Events />
    </>
  );
}
