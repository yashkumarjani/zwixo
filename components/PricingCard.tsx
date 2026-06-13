// FILE: components/PricingCard.tsx
"use client";

import React from "react";
import { Check, MessageSquare } from "lucide-react";
import type { PricingCardProps } from "../types";

export default function PricingCard({ tier, activePricingLabel, priceUnit }: PricingCardProps) {
  const waMessage = `Hi, I want to order the ${tier.name} (${activePricingLabel}) package.`;
  const waButtonLabel = `Order ${tier.name} on WhatsApp`;

  return (
    <div
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
              <span className="text-neutral-500 dark:text-neutral-400 text-xs font-semibold">{priceUnit}</span>
            </div>
            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium tracking-wide mt-1">
              One-time • No subscription
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-100 dark:bg-neutral-900 my-6"></div>

        {/* Features List */}
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

        {/* Direct customer social proof below button */}
        <div className="mt-3 text-center">
          <span className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold flex items-center justify-center gap-1">
            <span className="text-[#F5A623]">★</span> 4.9 · 200+ happy clients
          </span>
        </div>
      </div>

    </div>
  );
}
