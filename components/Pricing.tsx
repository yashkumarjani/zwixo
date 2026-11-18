// FILE: components/Pricing.tsx
"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Clock, ShieldCheck } from "lucide-react";
import PricingCard from "./PricingCard";
import { PRICING_GROUPS } from "../lib/constants";

export default function Pricing() {
  const [activeGroup, setActiveGroup] = useState<string>("forever-club");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const pricingContainerRef = useRef<HTMLDivElement>(null);

  const activePricing = PRICING_GROUPS.find((group) => group.id === activeGroup) || PRICING_GROUPS[0];
  const initialPopularIndex = activePricing.tiers.findIndex((t) => t.isPopular);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(initialPopularIndex >= 0 ? initialPopularIndex : 1);

  const handleGroupChange = (groupId: string) => {
    setActiveGroup(groupId);
    setIsDropdownOpen(false);
    setActiveCardIndex(0);
    const found = PRICING_GROUPS.find((g) => g.id === groupId);
    const popIdx = found ? found.tiers.findIndex((t) => t.isPopular) : 1;
    setSelectedCardIndex(popIdx >= 0 ? popIdx : 1);
    if (pricingContainerRef.current) {
      pricingContainerRef.current.scrollLeft = 0;
    }
  };

  React.useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        handleGroupChange(customEvent.detail);
      }
    };
    window.addEventListener("switchPricingTab", handleSwitchTab);
    return () => window.removeEventListener("switchPricingTab", handleSwitchTab);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll <= 0) return;
    const scrollRatio = target.scrollLeft / maxScroll;
    const index = Math.round(scrollRatio * (activePricing.tiers.length - 1));
    setActiveCardIndex(index);
    setSelectedCardIndex(index);
  };

  const scrollToCard = (index: number) => {
    setSelectedCardIndex(index);
    setActiveCardIndex(index);
    if (pricingContainerRef.current) {
      const cardWidth = pricingContainerRef.current.scrollWidth / activePricing.tiers.length;
      pricingContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth"
      });
    }
  };

  const getPriceUnit = (groupId: string) => {
    switch (groupId) {
      case "forever-club": return "/ year";
      case "wedding-posters": return "/ poster design";
      case "baby-cards": return "/ card design";
      case "photo-restoration": return "/ photo";
      case "product-marketing": return "/ package";
      default: return "/ package";
    }
  };

  return (
    <section 
      id="pricing" 
      className="pt-24 pb-20 bg-white dark:bg-ink relative overflow-hidden transition-colors duration-300"
    >
      <div className="responsive-container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Redesigned 2026 Section Heading Pattern */}
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-extrabold mb-1 block">
            {activeGroup === "forever-club" ? "VIP Annual Membership" : "Investment"}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink dark:text-white leading-none -tracking-[0.02em]">
            {activeGroup === "forever-club" ? "Forever Moments Club" : "Simple, honest pricing"}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto">
            {activeGroup === "forever-club"
              ? "Year-round personal occasion posters & exclusive member discounts."
              : "No recurring fees, no surprise extras."}
          </p>
        </div>

        {/* Category selection (Mobile dropdown vs Desktop tabs) */}
        <div className="w-full mb-12 flex justify-center">
          {/* Mobile custom dropdown select */}
          <div className="sm:hidden w-full max-w-xs relative z-30">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 rounded-2xl px-5 py-3.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#F5A623] text-neutral-800 dark:text-neutral-200 transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{activePricing.emoji}</span>
                <span>{activePricing.label}</span>
              </span>
              <svg
                className={`w-4 h-4 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {isDropdownOpen && (
              <>
                {/* Backdrop click overlay to close dropdown */}
                <div 
                  className="fixed inset-0 z-20 cursor-default" 
                  onClick={() => setIsDropdownOpen(false)}
                />
                
                {/* Dropdown Options */}
                <div className="absolute left-0 right-0 mt-2 bg-white/95 dark:bg-[#121214]/95 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/80 rounded-2xl shadow-xl overflow-hidden z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                  {PRICING_GROUPS.map((group) => {
                    const isSelected = group.id === activeGroup;
                    return (
                      <button
                        key={group.id}
                        onClick={() => handleGroupChange(group.id)}
                        className={`w-full flex items-center justify-between px-5 py-3.5 text-left text-sm font-semibold transition-colors duration-150 cursor-pointer border-b last:border-0 border-neutral-100 dark:border-neutral-900 ${
                          isSelected
                            ? "bg-neutral-50 dark:bg-neutral-900/50 text-[#F5A623]"
                            : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900/30"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{group.emoji}</span>
                          <span>{group.label}</span>
                        </span>
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Desktop tabs select (hidden on mobile) */}
          <div className="hidden sm:inline-flex items-center p-1 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 rounded-full max-w-full overflow-x-auto scrollbar-none">
            {PRICING_GROUPS.map((group) => {
              const isActive = group.id === activeGroup;
              return (
                <button
                  key={group.id}
                  onClick={() => handleGroupChange(group.id)}
                  className={`px-4 lg:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive 
                      ? "bg-ink text-white dark:bg-white dark:text-ink shadow-sm" 
                      : "text-neutral-500 dark:text-neutral-400 hover:text-ink dark:hover:text-white"
                  }`}
                >
                  <span className="mr-1.5">{group.emoji}</span>
                  <span>{group.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Cards Grid: Mobile Snap-scroll with peeking, Desktop 3-column Grid */}
        <div 
          ref={pricingContainerRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-5 scrollbar-none pb-4 md:pb-0 px-6 -mx-6 md:px-0 md:mx-0 items-stretch"
        >
          {activePricing.tiers.map((tier, idx) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              activePricingLabel={activePricing.label}
              priceUnit={getPriceUnit(activeGroup)}
              isSelected={selectedCardIndex === idx}
              onSelect={() => scrollToCard(idx)}
            />
          ))}
        </div>

        {/* Instant Family ROI Savings Proof Bar */}
        {activeGroup === "forever-club" && (
          <div className="mt-8 p-4 sm:p-5 rounded-[24px] border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-2xl bg-[#F5A623] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                ₹
              </div>
              <div>
                <h5 className="text-sm font-bold text-ink dark:text-white flex items-center justify-center sm:justify-start gap-2">
                  <span>Family Keepsake Economics</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-wide border border-emerald-500/25">
                    Save up to 75%
                  </span>
                </h5>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  12 custom occasion posters outside cost ~₹1,800. In Forever Club, pay just ₹499/yr + unlock 10% studio discounts.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-ink dark:text-white shrink-0 bg-white dark:bg-neutral-900 px-4 py-2 rounded-full border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
              <span className="text-neutral-400 line-through">₹1,950+ Value</span>
              <span className="text-[#F5A623] font-black text-sm">₹499 / yr</span>
            </div>
          </div>
        )}

        {/* Forever Club Info Note - Bento Design matching Zwixo UI */}
        {activeGroup === "forever-club" && (
          <div className="mt-8 p-6 sm:p-8 rounded-[32px] border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#121215]/80 backdrop-blur-sm transition-all duration-300">
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-neutral-200/60 dark:border-neutral-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/25 text-[#F5A623] text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                  <Sparkles className="w-3 h-3" /> Occasions You Can Celebrate
                </div>
                <h4 className="text-base sm:text-lg font-bold text-ink dark:text-white">
                  Included under your annual poster credits
                </h4>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#F5A623]" /> 24h Advance Notice
                </span>
                <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" /> 365 Days Validity
                </span>
              </div>
            </div>

            {/* Micro-Pills Occasion Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {[
                { emoji: "🎂", label: "Birthday Wishes" },
                { emoji: "💑", label: "Wedding Anniversary" },
                { emoji: "💍", label: "Engagement Wishes" },
                { emoji: "👶", label: "Baby Welcome & Shower" },
                { emoji: "🏡", label: "Griha Pravesh (Housewarming)" },
                { emoji: "✈️", label: "Visa & Going Abroad" },
                { emoji: "🎓", label: "Exam & Convocation" },
                { emoji: "🎖️", label: "Retirement & Farewell" },
                { emoji: "🙏", label: "Shradhanjali & Tributes" },
                { emoji: "🕯️", label: "Punyatithi Remembrance" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 shadow-2xs hover:border-[#F5A623]/40 transition-colors"
                >
                  <span className="text-sm">{item.emoji}</span>
                  <span>{item.label}</span>
                </span>
              ))}
            </div>

            {/* Bottom mini perks pill */}
            <div className="mt-6 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 gap-2 font-medium">
              <span>🎁 1 Credit = 1 HD Mobile/Story Poster (9:16 format)</span>
              <span>💎 Member discounts applicable on Photo Restoration, Wedding Countdown & Reels</span>
            </div>
          </div>
        )}

        {/* Pagination Dots (Mobile Only - Clickable) */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-5">
          {activePricing.tiers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Select ${activePricing.tiers[idx]?.name || "tier"}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                selectedCardIndex === idx 
                  ? "w-6 bg-[#F5A623]" 
                  : "w-2 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
