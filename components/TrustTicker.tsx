// FILE: components/TrustTicker.tsx
"use client";

import React from "react";
import { Star, Zap, ShieldCheck, Palette, Sparkles, Award } from "lucide-react";

export default function TrustTicker() {
  const TRUST_ITEMS = [
    {
      icon: <Star className="w-4 h-4 text-[#F5A623] fill-current" />,
      title: "4.9/5 Rating",
      highlight: "200+ Studio Orders",
    },
    {
      icon: <Zap className="w-4 h-4 text-[#F5A623] fill-current" />,
      title: "24h Express Delivery",
      highlight: "Direct on WhatsApp",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#F5A623] fill-current" />,
      title: "100% Private & Secure",
      highlight: "Zero Public Photo Sharing",
    },
    {
      icon: <Palette className="w-4 h-4 text-[#F5A623] fill-current" />,
      title: "Studio Craftsmanship",
      highlight: "No AI Face Distortion",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-[#F5A623] fill-current" />,
      title: "FREE AI Video Reel",
      highlight: "Included with Restoration & Marketing",
    },
    {
      icon: <Award className="w-4 h-4 text-[#F5A623] fill-current" />,
      title: "Hand-Refined Art",
      highlight: "By Gautami",
    },
  ];

  // Doubling the array for seamless infinite marquee loop
  const marqueeItems = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <section className="w-full bg-gradient-to-r from-white via-neutral-50 to-white dark:from-ink dark:via-[#121215] dark:to-ink border-y border-neutral-200/60 dark:border-neutral-850 py-4 select-none overflow-hidden relative transition-colors duration-300">
      
      {/* Subtle Side Blur Overlays for Infinite Fade Edge Effect */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-ink to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-ink to-transparent z-10 pointer-events-none" />

      {/* Infinite Marquee Track */}
      <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
        {marqueeItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[#F5A623]/50 hover:shadow-md hover:scale-[1.02] shrink-0"
          >
            <div className="w-7 h-7 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/25 flex items-center justify-center shrink-0">
              {item.icon}
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-ink dark:text-white whitespace-nowrap">
              <span>{item.title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              <span className="text-neutral-500 dark:text-neutral-400 font-semibold text-xs">
                {item.highlight}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
