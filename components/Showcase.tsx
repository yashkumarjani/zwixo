// FILE: components/Showcase.tsx
"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import CompareSlider from "./CompareSlider";
import { SHOWCASE_ITEMS } from "../constants";

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll <= 0) return;
    const scrollRatio = target.scrollLeft / maxScroll;
    const index = Math.round(scrollRatio * (SHOWCASE_ITEMS.length - 1));
    setActiveIndex(index);
  };

  return (
    <section 
      id="showcase" 
      className="pt-24 pb-20 bg-white dark:bg-ink text-ink dark:text-white relative overflow-hidden select-none"
    >
      <div className="responsive-container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Redesigned 2026 Section Heading Pattern */}
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-extrabold mb-1 block">
            See the difference
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink dark:text-white leading-none -tracking-[0.02em]">
            Before & after showcase
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto">
            Drag the handle to compare before and after.
          </p>
        </div>

        {/* Sliders Grid: Mobile Snap-scroll with peeking, Desktop 3-column Grid */}
        <div 
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-5 scrollbar-none pb-4 md:pb-0 px-6 -mx-6 md:px-0 md:mx-0"
        >
          {SHOWCASE_ITEMS.map((item) => (
            <div 
              key={item.title}
              className="snap-center shrink-0 w-[80vw] xs:w-[75vw] md:w-auto flex flex-col items-center pl-1 first:pl-0 last:pr-1"
            >
              <CompareSlider {...item} />
              
              {/* Label below each */}
              <div className="mt-4 text-center">
                <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 block mb-1">
                  {item.title}
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-[#F5A623] flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" /> Before → After
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots (Mobile Only) */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-5">
          {SHOWCASE_ITEMS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? "w-4 bg-[#F5A623]" 
                  : "w-1.5 bg-neutral-200 dark:bg-neutral-800"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
