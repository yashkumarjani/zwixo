// FILE: components/ClubModal.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Gift, Percent, Zap, ShieldCheck } from "lucide-react";
import { useScrollTo } from "../hooks/useScrollTo";

export default function ClubModal() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollTo = useScrollTo();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasSeen = sessionStorage.getItem("zwixo_forever_club_modal_seen");
    if (hasSeen) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const startFiveSecondTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
    };

    // If loader has already finished before this runs, start timer immediately
    if ((window as unknown as { __zwixo_loader_done?: boolean }).__zwixo_loader_done) {
      startFiveSecondTimer();
    } else {
      // Otherwise, wait until loader completes and homepage is visible
      const handleLoaderComplete = () => {
        startFiveSecondTimer();
      };
      window.addEventListener("zwixo_loader_completed", handleLoaderComplete, { once: true });

      // Fallback: in case loader event is missed or reduced motion, trigger after 6s
      const fallbackTimer = setTimeout(() => {
        startFiveSecondTimer();
      }, 6000);

      return () => {
        window.removeEventListener("zwixo_loader_completed", handleLoaderComplete);
        clearTimeout(fallbackTimer);
        if (timer) clearTimeout(timer);
      };
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("zwixo_forever_club_modal_seen", "true");
    }
  }, []);

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const handleExplore = useCallback(() => {
    handleClose();
    // Dispatch event to switch pricing tab to forever-club
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("switchPricingTab", { detail: "forever-club" }));
    }
    // Smooth scroll to pricing section
    scrollTo("pricing");
  }, [handleClose, scrollTo]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Frosted Dark Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container with 2026 Luxury Framing */}
          <m.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="club-modal-title"
            className="relative w-full max-w-[500px] bg-gradient-to-b from-white via-neutral-50/95 to-neutral-100/90 dark:from-[#18181b]/98 dark:via-[#121214]/98 dark:to-[#0c0c0e] border border-[#F5A623]/35 dark:border-[#F5A623]/25 rounded-[36px] p-6 sm:p-8 shadow-[0_25px_80px_rgba(245,166,35,0.2)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10"
          >
            {/* Top Amber Light Beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F5A623] to-transparent opacity-90" />
            
            {/* Ambient Background Radial Glows */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#F5A623]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar: Eyebrow + Close Button */}
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#F5A623]/20 to-amber-500/10 border border-[#F5A623]/40 text-[#F5A623] text-[10px] font-black uppercase tracking-widest shadow-xs">
                <Sparkles className="w-3 h-3 text-[#F5A623] animate-pulse" />
                <span>Exclusive Invitation</span>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-ink dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Heading & Subtext */}
            <div className="relative z-10 text-left">
              <h3 
                id="club-modal-title"
                className="text-2xl sm:text-[26px] font-black text-ink dark:text-white tracking-tight leading-tight"
              >
                Unlock 365 Days of <br className="hidden xs:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-amber-400 to-[#F5A623]">
                  Family Memories.
                </span>
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                One annual pass for your family. Celebrate every birthday, anniversary, and milestone without last-minute panic.
              </p>
            </div>

            {/* 3D-Style Metallic Gold VIP Pass Visual */}
            <div className="mt-5 relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#241e12] via-[#16140e] to-[#0a0907] border border-[#F5A623]/40 shadow-xl overflow-hidden z-10 group">
              {/* Refractive Light Sweep Line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              {/* Card Header: Micro EMV Chip + Pass Branding */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-3">
                <div className="flex items-center gap-2">
                  {/* Miniature Metallic Smart Chip */}
                  <div className="w-6 h-4.5 rounded-sm bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-300/80 p-0.5 shadow-xs flex flex-col justify-between">
                    <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
                    <div className="h-0.5 w-full bg-amber-800/40 rounded-full" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black tracking-wider text-amber-200 block leading-none">
                      FOREVER PASS
                    </span>
                    <span className="text-[8px] font-mono tracking-widest text-amber-400/80 uppercase">
                      VIP 2026 EDITION
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  365 DAYS ACCESS
                </span>
              </div>

              {/* 3 Luxury Bento Micro-Perks */}
              <div className="grid grid-cols-3 gap-2 text-left mb-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                  <Gift className="w-4 h-4 text-[#F5A623] mb-1.5" />
                  <span className="text-[11px] font-bold text-white leading-tight">5 to 25</span>
                  <span className="text-[9px] text-neutral-400 leading-tight">Free Posters</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                  <Percent className="w-4 h-4 text-[#F5A623] mb-1.5" />
                  <span className="text-[11px] font-bold text-white leading-tight">10% - 15%</span>
                  <span className="text-[9px] text-neutral-400 leading-tight">Studio OFF</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
                  <Zap className="w-4 h-4 text-[#F5A623] mb-1.5" />
                  <span className="text-[11px] font-bold text-white leading-tight">24-Hour</span>
                  <span className="text-[9px] text-neutral-400 leading-tight">WA Express</span>
                </div>
              </div>

              {/* Eligible Occasions Pill Ticker */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 text-[10px] text-amber-200/90 font-medium">
                <span className="px-2 py-0.5 rounded-md bg-amber-400/10 shrink-0">🎂 Birthdays</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-400/10 shrink-0">💑 Anniversaries</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-400/10 shrink-0">✈️ Visa Wishes</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-400/10 shrink-0">🙏 Tributes</span>
              </div>
            </div>

            {/* Instant ROI Savings Proof Strip */}
            <div className="mt-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-left relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ✓
                </div>
                <div>
                  <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 block leading-tight">
                    Instant ₹1,450+ Family Savings
                  </span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-tight">
                    12 custom posters outside cost ~₹1,800+
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[9px] text-neutral-400 block line-through">₹1,950</span>
                <span className="text-xs font-black text-[#F5A623]">₹499 / yr</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex flex-col items-center gap-2 relative z-10">
              <button
                onClick={handleExplore}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#F5A623] via-amber-500 to-[#F5A623] hover:from-amber-500 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(245,166,35,0.35)] hover:shadow-[0_15px_30px_rgba(245,166,35,0.45)] transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Claim Your Family Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="flex items-center justify-between w-full px-2 pt-1">
                <span className="text-[10px] text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#F5A623]" /> 365 Days Unconditional Validity
                </span>
                <button
                  onClick={handleClose}
                  className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 font-medium transition-colors cursor-pointer"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
