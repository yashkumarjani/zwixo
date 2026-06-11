// FILE: components/Pricing.tsx
"use client";

import React, { useState, useRef } from "react";
import { Check, MessageSquare } from "lucide-react";

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface ServicePricingGroup {
  id: string;
  label: string;
  emoji: string;
  tiers: PricingTier[];
}

const PRICING_GROUPS: ServicePricingGroup[] = [
  {
    id: "wedding-posters",
    label: "Wedding Countdown",
    emoji: "💑",
    tiers: [
      {
        name: "5 Days Countdown",
        price: "₹2,499",
        features: [
          "5 Personalized daily posters",
          "HD Quality PNG delivery",
          "1 Revision per design",
          "Delivered daily on WhatsApp"
        ]
      },
      {
        name: "10 Days Countdown",
        price: "₹3,999",
        isPopular: true,
        features: [
          "10 Personalized daily posters",
          "HD Quality PNG delivery",
          "1 Revision per design",
          "Delivered daily on WhatsApp"
        ]
      },
      {
        name: "15 Days Countdown",
        price: "₹5,999",
        features: [
          "15 Personalized daily posters",
          "HD Quality PNG delivery",
          "1 Revision per design",
          "Delivered daily on WhatsApp"
        ]
      }
    ]
  },
  {
    id: "baby-cards",
    label: "Baby Milestones",
    emoji: "👶",
    tiers: [
      {
        name: "3 Cards Pack",
        price: "₹1,299",
        features: [
          "3 Unique milestone designs",
          "Real baby photos (not templates)",
          "Delivered within 48 hours",
          "Print-ready HD files"
        ]
      },
      {
        name: "6 Cards Pack",
        price: "₹1,999",
        isPopular: true,
        features: [
          "6 Unique milestone designs",
          "Real baby photos (not templates)",
          "Delivered within 48 hours",
          "Print-ready HD files"
        ]
      },
      {
        name: "12 Cards Pack",
        price: "₹2,999",
        features: [
          "12 Unique milestone designs",
          "Real baby photos (not templates)",
          "Delivered within 48 hours",
          "Print-ready HD files"
        ]
      }
    ]
  },
  {
    id: "photo-restoration",
    label: "Photo Restoration",
    emoji: "🖼",
    tiers: [
      {
        name: "Standard Restore",
        price: "₹499",
        features: [
          "Mild scratch & dust removal",
          "Color enhancement & contrast",
          "Delivered within 24 hours",
          "HD digital delivery"
        ]
      },
      {
        name: "Premium Restore",
        price: "₹699",
        isPopular: true,
        features: [
          "Heavy scratch & tear repair",
          "Skin texture & face detail restoration",
          "Delivered within 24 hours",
          "HD digital delivery"
        ]
      },
      {
        name: "Heavy Restore",
        price: "₹999",
        features: [
          "Complete face/element reconstruction",
          "Advanced manual coloring",
          "Delivered within 24 hours",
          "HD digital delivery"
        ]
      }
    ]
  }
];

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
          {activePricing.tiers.map((tier) => {
            const waMessage = `Hi, I want to order the ${tier.name} (${activePricing.label}) package.`;
            const waButtonLabel = `Order ${tier.name} on WhatsApp`;

            return (
              <div
                key={tier.name}
                className={`relative flex flex-col justify-between p-8 rounded-[32px] border transition-colors duration-200 snap-center shrink-0 w-[82vw] xs:w-[76vw] md:w-auto ${
                  tier.isPopular
                    ? "border-2 border-[#F5A623] bg-white dark:bg-[#121214]/50 z-10"
                    : "border-neutral-100 dark:border-neutral-900 bg-neutral-50/20 dark:bg-[#121214]/10"
                }`}
              >
                <div>
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-ink dark:text-white">{tier.name}</h3>
                      {tier.isPopular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-[9px] font-bold uppercase tracking-widest border border-[#F5A623]/20">
                          Most Popular
                        </span>
                      )}
                    </div>
                    
                    {/* Price and duration context */}
                    <div className="flex flex-col mt-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-ink dark:text-white tracking-tight">{tier.price}</span>
                        <span className="text-neutral-500 dark:text-neutral-400 text-xs font-semibold">{getPriceUnit(activeGroup)}</span>
                      </div>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium tracking-wide mt-1">
                        One-time • No subscription
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-neutral-100 dark:bg-neutral-900 my-6"></div>

                  {/* 2026 Fix: Features List visual hierarchy */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feat, idx) => {
                      const isCore = idx < 2; // first two features are core
                      return (
                        <li 
                          key={feat} 
                          className={`flex items-start gap-3 leading-tight ${
                            isCore 
                              ? "text-sm text-neutral-700 dark:text-neutral-300 font-semibold" 
                              : "text-xs text-neutral-400 dark:text-neutral-500 font-medium pl-1"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isCore 
                              ? "text-[#F5A623]" 
                              : "text-neutral-300 dark:text-neutral-700"
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Button and rating support */}
                <div>
                  <a
                    href={`https://wa.me/918320870517?text=${encodeURIComponent(waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full min-h-[44px] py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all duration-150 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 outline-none px-4 cursor-pointer ${
                      tier.isPopular
                        ? "bg-[#F5A623] text-white hover:bg-amber-500"
                        : "bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-[#F5A623] hover:text-white"
                    }`}
                    aria-label={waButtonLabel}
                  >
                    <span>{waButtonLabel}</span>
                    <MessageSquare className="w-4 h-4" />
                  </a>

                  {/* 2026 Fix: Direct customer social proof below button */}
                  <div className="mt-3 text-center">
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold flex items-center justify-center gap-1">
                      <span className="text-[#F5A623]">★</span> 4.9 · 200+ happy clients
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
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
