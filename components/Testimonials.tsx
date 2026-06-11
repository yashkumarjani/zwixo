// FILE: components/Testimonials.tsx
"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The wedding countdown posters were absolutely magical! Built so much hype.",
    author: "Priya S.",
    location: "Pune",
  },
  {
    quote: "My mom cried seeing her old childhood photo restored. Thank you Zwixo.",
    author: "Rahul M.",
    location: "Surat",
  },
  {
    quote: "Baby milestone cards were so stunning, better than any automated app templates!",
    author: "Sneha P.",
    location: "Ahmedabad",
  },
  {
    quote: "Got my parents anniversary portrait restored. Superb quality and quick delivery!",
    author: "Ankit V.",
    location: "Vadodara",
  },
  {
    quote: "Amazing manual coloring on our old family portrait. It feels alive again.",
    author: "Meera K.",
    location: "Ahmedabad",
  },
  {
    quote: "Every day we received a new countdown poster on WhatsApp. The print quality is top notch.",
    author: "Rohan D.",
    location: "Mumbai",
  },
  {
    quote: "Extremely professional restoration. The cracks are gone and face details are crystal clear.",
    author: "Deepa J.",
    location: "Ahmedabad",
  },
  {
    quote: "Quick WhatsApp support, clear pricing, and no AI distortion. Meticulous hand-crafted work.",
    author: "Siddharth S.",
    location: "Bangalore",
  },
];

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  // 2026 Fix: Speed based on number of cards * 4s. 8 cards = 32 seconds duration.
  const marqueeDuration = shouldReduceMotion ? "0s" : "32s";

  const renderCard = (test: Testimonial, keyPrefix: string) => {
    return (
      <div
        key={`${keyPrefix}-${test.author}`}
        className="w-[300px] shrink-0 mx-3 p-6 rounded-[24px] border border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-[#121214]/50 flex flex-col justify-between"
      >
        <div>
          {/* 5 Stars at the top */}
          <div className="flex items-center gap-0.5 mb-4" aria-label="Rated 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-[#F5A623] text-sm select-none">★</span>
            ))}
          </div>
          
          {/* Quote text */}
          <p className="text-neutral-600 dark:text-neutral-400 italic text-sm leading-relaxed mb-6 font-medium">
            &ldquo;{test.quote}&rdquo;
          </p>
        </div>

        {/* Author details at bottom */}
        <div className="text-neutral-900 dark:text-white text-sm font-semibold">
          {test.author} <span className="text-neutral-400 dark:text-neutral-500 font-normal text-xs">• {test.location}</span>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="testimonials" 
      className="pt-24 pb-20 bg-white dark:bg-ink relative overflow-hidden select-none scroll-mt-20 transition-colors duration-300"
    >
      <div className="responsive-container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Redesigned 2026 Section Heading Pattern */}
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-extrabold mb-1 block">
            Real stories
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink dark:text-white leading-none -tracking-[0.02em]">
            Families love Zwixo
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto">
            Read what our customers say about their experiences.
          </p>
        </div>
      </div>

      {/* Single Track Marquee */}
      <div className="relative w-full overflow-x-hidden">
        {/* Left/Right Edge Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white dark:from-ink to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white dark:from-ink to-transparent z-10 pointer-events-none"></div>

        {/* Track 1: Leftward Scroll (normal) */}
        <div 
          className="animate-marquee py-2" 
          tabIndex={0} 
          aria-label="Customer Testimonials. Hover or focus to pause."
          style={{ animationDuration: marqueeDuration }}
        >
          <div className="flex shrink-0">
            {TESTIMONIALS.map((test) => renderCard(test, "orig-t1"))}
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            {TESTIMONIALS.map((test) => renderCard(test, "dup-t1"))}
          </div>
        </div>
      </div>
    </section>
  );
}
