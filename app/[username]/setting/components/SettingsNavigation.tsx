/* eslint-disable @typescript-eslint/no-explicit-any */
// components/SettingsNavigation.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Shield,
  Briefcase,
  GraduationCap,
  Trash2,
} from "lucide-react";

interface NavigationItemProps {
  href: string;
  icon: React.ComponentType<any>;
  label: string;
  isActive?: boolean;
  isDanger?: boolean;
  onClick: (href: string) => void;
}

function NavigationItem({
  href,
  icon: Icon,
  label,
  isActive = false,
  isDanger = false,
  onClick,
}: NavigationItemProps) {
  const baseClasses =
    "flex items-center px-3 py-2 rounded-lg mb-1 cursor-pointer";
  const activeClasses = isActive
    ? "text-white bg-orange-300/20 border-l-4 border-orange-400"
    : "text-gray-300 hover:text-white hover:bg-[#0D1117]";
  const dangerClasses = isDanger
    ? "text-red-400 hover:text-red-300 hover:bg-red-900/20 bg-red-900/20"
    : activeClasses;

  const handleClick = () => {
    onClick(href);
  };

  return (
    <div onClick={handleClick} className={`${baseClasses} ${dangerClasses}`}>
      <Icon className="w-4 h-4 mr-3" />
      {label}
    </div>
  );
}

const sections = [
  { id: "profile", label: "Profile", icon: User, isDanger: false },
  { id: "account", label: "Account & Security", icon: Lock, isDanger: false },
  { id: "privacy", label: "Privacy", icon: Shield, isDanger: false },
  {
    id: "experience",
    label: "Work Experience",
    icon: Briefcase,
    isDanger: false,
  },
  { id: "education", label: "Education", icon: GraduationCap, isDanger: false },
  { id: "danger", label: "Danger Zone", icon: Trash2, isDanger: true },
];

export default function SettingsNavigation() {
  const [activeSection, setActiveSection] = useState("profile");

  // Handle navigation click
  const handleNavigationClick = (href: string) => {
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Scroll offset - you can adjust this value to fine-tune the scroll position
      const scrollOffset = 88; // Increase this value to scroll more to the top, decrease to scroll less

      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - scrollOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update active section immediately
      setActiveSection(targetId);
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Adjust this value to change when sections become active

      let current = "profile";

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            current = section.id;
          }
        }
      });

      setActiveSection(current);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#161B22] rounded-lg border border-gray-800 sticky top-28">
      <div className="p-4 border-b border-gray-800">
        <h2 className="font-semibold text-lg">Settings</h2>
      </div>
      <nav className="p-2">
        {sections.map((section) => (
          <NavigationItem
            key={section.id}
            href={`#${section.id}`}
            icon={section.icon}
            label={section.label}
            isActive={activeSection === section.id}
            isDanger={section.isDanger}
            onClick={handleNavigationClick}
          />
        ))}
      </nav>
    </div>
  );
}
