// FILE: components/Pricing.tsx
"use client";

import React, { useState, useRef } from "react";
import PricingCard from "./PricingCard";
import { PRICING_GROUPS } from "../constants";

export default function Pricing() {
  const [activeGroup, setActiveGroup] = useState<string>("wedding-posters");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const pricingContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll <= 0) return;
    const scrollRatio = target.scrollLeft / maxScroll;
    const index = Math.round(scrollRatio * (activePricing.tiers.length - 1));
    setActiveCardIndex(index);
  };

  const activePricing = PRICING_GROUPS.find((group) => group.id === activeGroup) || PRICING_GROUPS[0];

  const getPriceUnit = (groupId: string) => {
    switch (groupId) {
      case "wedding-posters": return "/ poster design";
      case "baby-cards": return "/ card design";
      case "photo-restoration": return "/ photo";
      default: return "/ package";
    }
  };

  return (
    <section 
      id="pricing" 
      className="pt-24 pb-20 bg-white dark:bg-ink select-none relative overflow-hidden transition-colors duration-300"
    >
      <div className="responsive-container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Redesigned 2026 Section Heading Pattern */}
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-extrabold mb-1 block">
            Investment
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink dark:text-white leading-none -tracking-[0.02em]">
            Simple, honest pricing
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto">
            No recurring fees, no surprise extras.
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
                        onClick={() => {
                          setActiveGroup(group.id);
                          setIsDropdownOpen(false);
                          setActiveCardIndex(0);
                          if (pricingContainerRef.current) {
                            pricingContainerRef.current.scrollLeft = 0;
                          }
                        }}
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
          <div className="hidden sm:inline-flex p-1 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 rounded-full">
            {PRICING_GROUPS.map((group) => {
              const isActive = group.id === activeGroup;
              return (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveGroup(group.id);
                    setActiveCardIndex(0);
                    if (pricingContainerRef.current) {
                      pricingContainerRef.current.scrollLeft = 0;
                    }
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-ink text-white dark:bg-white dark:text-ink shadow-sm" 
                      : "text-neutral-500 dark:text-neutral-400 hover:text-ink dark:hover:text-white"
                  }`}
                >
                  {group.emoji} {group.label}
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
          {activePricing.tiers.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              activePricingLabel={activePricing.label}
              priceUnit={getPriceUnit(activeGroup)}
            />
          ))}
        </div>

        {/* Pagination Dots (Mobile Only) */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-5">
          {activePricing.tiers.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === idx 
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
