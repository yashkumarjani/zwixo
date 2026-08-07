// FILE: components/TopAnnouncement.tsx
"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";

export default function TopAnnouncement() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-neutral-900 dark:bg-[#121215] text-white font-medium text-xs py-2 px-3 sm:px-6 relative z-50 shadow-md flex items-center justify-between select-none border-b border-[#F5A623]/30 backdrop-blur-md">
      
      {/* Central Announcement Container */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 text-center text-[11px] sm:text-xs leading-tight pr-6 sm:pr-0">
        
        {/* Sparkle Icon */}
        <Sparkles className="w-3 h-3 text-[#F5A623] fill-current shrink-0" />

        {/* Crisp White Text with Saffron Highlights */}
        <span className="text-neutral-200 font-semibold leading-tight">
          <span className="sm:hidden">
            Get <strong className="text-[#F5A623] font-bold">100% FREE AI Video Reel</strong> on Restoration & Marketing!
          </span>
          <span className="hidden sm:inline">
            Get a <strong className="text-[#F5A623] font-bold">100% FREE AI Video Reel</strong> with Photo Restoration & Product Marketing orders!
          </span>
        </span>

        {/* Claim Link */}
        <a
          href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi ZWIXO, I want to claim the FREE AI Video Reel offer.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 sm:gap-1 font-extrabold text-[#F5A623] hover:text-amber-300 transition-colors cursor-pointer shrink-0 ml-1 text-[11px] sm:text-xs underline decoration-[#F5A623]/40"
        >
          <span>Claim</span> <ArrowRight className="w-3 h-3 stroke-[3]" />
        </a>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-neutral-400 hover:text-white shrink-0 focus:outline-none"
        aria-label="Close announcement bar"
      >
        <X className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>
    </div>
  );
}
