/* eslint-disable @next/next/no-img-element */
"use client";

import { Code, Users, Zap, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import AutoSlider from "@/app/components/landing/components/AutoSlider";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
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

  // Slider Section
  const SliderSection = () => {
    return (
      <section id="slider" className="bg-transparent py-10">
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

  const tabs = ["Code", "Plan", "Collaborate", "Automate", "Secure"];
  const images = [
    "/events/img1.jpg",
    "/events/img2.jpg",
    "/events/img3.jpg",
    "/events/img4.jpg",
    "/events/img5.jpg",
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle tab change with perfect smooth transition
  const handleTabChange = (index: number) => {
    if (index !== activeTab && !isTransitioning) {
      setIsTransitioning(true);
      setIsDropdownOpen(false); // Close dropdown when tab changes

      // Setelah 500ms, ganti tab dan selesaikan transisi
      setTimeout(() => {
        setActiveTab(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  // Update indicator positioning
  useEffect(() => {
    if (tabsRef.current[activeTab] && containerRef.current) {
      const activeButton = tabsRef.current[activeTab];
      const container = containerRef.current;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      const left = buttonRect.left - containerRect.left;
      const width = buttonRect.width;

      setIndicatorStyle({
        left: `${left}px`,
        width: `${width}px`,
      });
    }
  }, [activeTab]);

  // Scroll effects
  const maxScroll = typeof window !== "undefined" ? window.innerHeight : 1;
  const scrollProgress = Math.min(scrollY / maxScroll, 1);
  const heroScale = 1 - scrollProgress * 0.05;
  const heroOpacity = 1 - scrollProgress * 1.5;
  const glassOpacity = Math.min(0.5 + scrollProgress * 0.7, 1);

  return (
    <main
      id="hero"
      style={{
        background:
          "linear-gradient(to bottom, #040642 0%, #161b3d 70%, #000000 100%)",
        fontFamily: "mona-sans",
      }}
    >
      <div className="relative" style={{ height: "195.3vh" }}>
        {/* Panel 1: Hero Content */}
        <section
          id="hero-content"
          className="sticky top-0 h-screen w-full flex items-center justify-center z-10"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div
            className="relative text-center text-white px-4"
            style={{
              transform: `scale(${heroScale})`,
              opacity: heroOpacity,
              transition: scrollY === 0 ? "all 0.3s ease-out" : "none",
            }}
          >
            <div className="w-34 h-34 flex items-center justify-center mx-auto mb-8">
              <Image
                src="/logo.svg"
                alt="Provoks Logo"
                width={126}
                height={126}
              />
            </div>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl mb-2 leading-tight"
              style={{ fontFamily: "ASTERA" }}
            >
              Provoks
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Komunitas Programmer Vokasi Universitas Brawijaya.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Code className="w-5 h-5" />
                <span className="text-sm sm:text-base">Open Source</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-5 h-5" />
                <span className="text-sm sm:text-base">Collaborative</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm sm:text-base">Innovative</span>
              </div>
            </div>
            <button className="bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors">
              Mulai Berkontribusi
            </button>
          </div>
        </section>

        {/* Glass Panel */}
        <div
          id="glass-panel"
          className="sticky top-0 h-screen w-full flex items-end justify-center z-20"
          style={{
            paddingBottom: "4.5vh",
            opacity: glassOpacity,
            transition: scrollY === 0 ? "opacity 0.3s ease-out" : "none",
          }}
        >
          <div
            className="w-full max-w-[1280px] mx-4 rounded-t-4xl flex items-end justify-center overflow-hidden"
            style={{
              height: "min(660px, 85vh)",
              background:
                "linear-gradient(to bottom, rgba(115, 107, 175, 1) 60%, rgba(69, 114, 158, 1) 100%)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid #7375C3",
              borderBottom: "none",
              boxShadow: "0px -30px 650px 40px rgba(115, 107, 175, 0.4)",
            }}
          >
            {/* Perfect Slide Up Transition Container */}
            <div className="relative w-full h-full overflow-hidden rounded-t-xl">
              {/* Render semua gambar dengan positioning absolute */}
              {images.map((src, index) => {
                const isActive = index === activeTab;
                const shouldShow = isActive && !isTransitioning;
                const isExiting = isActive && isTransitioning;

                return (
                  <div
                    key={index}
                    className="absolute inset-0 w-full h-full flex items-end justify-center"
                    style={{
                      opacity: shouldShow ? 1 : 0,
                      transform: shouldShow
                        ? "translateY(0)"
                        : isExiting
                        ? "translateY(0)"
                        : "translateY(40px)",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      pointerEvents: shouldShow ? "auto" : "none",
                    }}
                  >
                    <img
                      src={src}
                      alt={`${tabs[index]} Image`}
                      className="w-full h-full pl-2 pt-2 pr-2 object-cover object-bottom rounded-t-4xl"
                      loading="eager"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section
        className="switcher w-full bg-gradient-to-b from-[#03072f] to-[#0D1117] relative z-30 border-t border-gray-500"
        style={{
          marginTop: "-1px",
          boxShadow: "0 -240px 250px 80px rgba(69, 114, 158, 0.3)",
        }}
      >
        <div className="mx-auto max-w-5xl p-4 sm:p-8 flex justify-center items-center">
          {/* Desktop Tab Switcher */}
          <div className="relative hidden md:block">
            <div
              ref={(el) => {
                if (el && !containerRef.current) {
                  containerRef.current = el;
                }
              }}
              className="relative bg-slate-800/40 backdrop-blur-md rounded-4xl p-1.5 border border-slate-600/50 shadow-2xl"
            >
              <div
                className="absolute top-1.5 bottom-1.5 bg-gradient-to-b from-[#2A2E3E] to-[#1D202D] border-2 border-gray-300 rounded-4xl transition-all duration-1000 ease-out shadow-xl"
                style={indicatorStyle}
              />

              {/* Tab Buttons */}
              <div className="relative flex gap-1">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    ref={(el) => {
                      tabsRef.current[index] = el;
                    }}
                    onClick={() => handleTabChange(index)}
                    disabled={isTransitioning}
                    className={`
                      relative z-10 px-3 py-3 rounded-4xl text-sm font-semibold 
                      transition-all duration-1000 ease-out min-w-[110px] text-center
                      ${isTransitioning ? "pointer-events-none" : ""}
                      ${
                        activeTab === index
                          ? "text-white transform scale-[1.02]"
                          : "text-slate-300 hover:text-white hover:bg-gradient-to-b from-[#2A2E3E] to-[#1D202D]"
                      }
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10 opacity-60" />
          </div>

          {/* Mobile Dropdown */}
          <div className="relative md:hidden w-full max-w-xs">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={isTransitioning}
              className="w-full bg-slate-800/40 backdrop-blur-md rounded-2xl p-4 border border-slate-600/50 shadow-2xl flex items-center justify-between text-white font-semibold"
            >
              <span>{tabs[activeTab]}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-md rounded-2xl border border-slate-600/50 shadow-2xl overflow-hidden z-50">
                {tabs.map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(index)}
                    disabled={isTransitioning}
                    className={`
                      w-full px-4 py-3 text-left font-semibold transition-all duration-300
                      ${isTransitioning ? "pointer-events-none" : ""}
                      ${
                        activeTab === index
                          ? "text-white bg-gradient-to-r from-[#2A2E3E] to-[#1D202D]"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }
                    `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            {/* Mobile Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10 opacity-60" />
          </div>
        </div>

        {/* Content Preview Section */}
        <div className="mx-auto max-w-4xl px-4 sm:px-8 pb-10">
          <div className="text-center">
            <h3
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning
                  ? "translateY(8px)"
                  : "translateY(0)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {tabs[activeTab]}
            </h3>
            <p
              className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning
                  ? "translateY(8px)"
                  : "translateY(0)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
              }}
            >
              Explore our {tabs[activeTab].toLowerCase()} initiatives and see
              how we&apos;re building the future of programming together.
            </p>
          </div>
        </div>

        {/* Spacer */}
        <SliderSection />
      </section>
    </main>
  );
};

export default HeroSection;
