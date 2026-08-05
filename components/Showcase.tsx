// FILE: components/Showcase.tsx
"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import CompareSlider from "./CompareSlider";
import { SHOWCASE_ITEMS } from "../lib/constants";

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Official ZWIXO AI Memory Video YouTube Shorts ID
  const [youtubeVideoId] = useState<string>("eg8P8rim-WE");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll <= 0) return;
    const scrollRatio = target.scrollLeft / maxScroll;
    const index = Math.round(scrollRatio * (SHOWCASE_ITEMS.length - 1));
    setActiveIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.key === " ") && !isPlaying) {
      e.preventDefault();
      setIsPlaying(true);
    }
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

        {/* 🎁 NEW: FREE AI Memory Video Showcase Feature Card */}
        <div className="mt-20 p-8 sm:p-12 rounded-[36px] bg-neutral-900 text-white relative overflow-hidden border border-neutral-800 shadow-2xl">
          {/* Subtle Ambient Radial Background Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#F5A623]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Copy & Value Proposition */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/15 border border-[#F5A623]/30 text-[#F5A623] text-[11px] font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> 100% Free Bonus Gift
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight -tracking-[0.02em]">
                Every photo restoration comes with a <span className="text-[#F5A623]">Free AI Memory Video</span>
              </h3>
              
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Some memories are too precious to stay still. Beyond restoring damaged details, we animate your restored portraits with natural motion, subtle blinks, and warm smiles.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-400">
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-[#F5A623]" /> 100% Free with ₹499+ orders
                </span>
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-[#F5A623]" /> Delivered in HD MP4
                </span>
              </div>

              <div className="pt-4">
                <a
                  href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi, I want to restore a photo and get the FREE AI Memory Video!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#F5A623] text-ink font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-amber-400 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                >
                  Get Your Restored Photo + Free Video →
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Video Showcase Player (Strict 9:16 Aspect Ratio with Instant Click-to-Play) */}
            <div className="lg:col-span-6 flex justify-center">
              <div 
                role="button"
                tabIndex={0}
                aria-label="Play ZWIXO AI Memory Video Showcase"
                onClick={() => !isPlaying && setIsPlaying(true)}
                onKeyDown={handleKeyDown}
                className="w-full max-w-[310px] sm:max-w-[340px] aspect-[9/16] rounded-[32px] bg-neutral-950 border border-neutral-800 overflow-hidden relative shadow-2xl group flex items-center justify-center cursor-pointer select-none z-20 transition-all duration-300 hover:border-[#F5A623]/50 hover:shadow-[#F5A623]/10 focus-visible:ring-2 focus-visible:ring-[#F5A623] outline-none"
              >
                {!isPlaying ? (
                  /* Initial State: Poster Thumbnail + Single Perfectly Centered Glowing Play Button */
                  <div className="w-full h-full relative flex items-center justify-center cursor-pointer group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`} 
                      alt="ZWIXO AI Memory Video Showcase"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-100"
                      onError={(e) => {
                        // Fallback image if YouTube thumbnail is loading
                        (e.target as HTMLImageElement).src = "/images/afterRestore.PNG";
                      }}
                    />

                    {/* 70% dark overlay for optimal cinematic contrast and button highlight */}
                    <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-colors duration-300" />

                    {/* Single 100% Perfectly Centered Glowing Saffron Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-30">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F5A623] text-ink flex items-center justify-center shadow-2xl shadow-[#F5A623]/50 ring-4 ring-[#F5A623]/20 group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                        <svg 
                          className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5 text-neutral-950" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Active State: Responsive YouTube Embed Video Player */
                  youtubeVideoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                      title="ZWIXO AI Memory Video Showcase"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0 relative z-30 cursor-pointer"
                    />
                  ) : (
                    <video
                      controls
                      autoPlay
                      playsInline
                      poster="/images/afterRestore.PNG"
                      className="w-full h-full object-cover relative z-30 cursor-pointer"
                    >
                      <source src="/videos/memory-video.mp4" type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

