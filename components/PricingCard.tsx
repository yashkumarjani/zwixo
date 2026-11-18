// FILE: components/PricingCard.tsx
"use client";

import React from "react";
import { Check, MessageSquare } from "lucide-react";
import type { PricingCardProps } from "../types";

export default function PricingCard({ tier, activePricingLabel, priceUnit, isSelected, onSelect }: PricingCardProps) {
  const isClub = priceUnit === "/ year";
  const waMessage = isClub
    ? `Hi ZWIXO, I want to join the ${tier.name} (${activePricingLabel}) membership plan.`
    : `Hi ZWIXO, I want to order the ${tier.name} (${activePricingLabel}) package.`;
  const waButtonLabel = isClub
    ? `Join ${tier.name} on WhatsApp`
    : `Order ${tier.name} on WhatsApp`;

  const active = isSelected !== undefined ? isSelected : !!tier.isPopular;

  // Pass-specific 2026 aesthetics
  const isGold = tier.passType === "gold" || (!tier.passType && tier.isPopular);
  const isObsidian = tier.passType === "obsidian";

  const getCardStyle = () => {
    if (!isClub) {
      return active
        ? "border-2 border-[#F5A623] bg-white dark:bg-[#121214]/80 shadow-xl md:-translate-y-1.5 z-10 ring-1 ring-[#F5A623]/25"
        : "border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-[#121214]/20 hover:border-neutral-300 dark:hover:border-neutral-700 opacity-90 hover:opacity-100 hover:-translate-y-0.5";
    }

    if (isGold) {
      return active
        ? "border-2 border-[#F5A623] bg-gradient-to-b from-[#F5A623]/12 via-white dark:via-[#161619] to-amber-500/5 dark:to-[#121214] shadow-2xl md:-translate-y-2 z-10 ring-2 ring-[#F5A623]/35"
        : "border-amber-400/50 dark:border-amber-500/30 bg-gradient-to-b from-[#F5A623]/5 via-white dark:via-[#151518] to-neutral-50/20 dark:to-[#121214]/40 hover:border-[#F5A623] hover:shadow-lg hover:-translate-y-1";
    }

    if (isObsidian) {
      return active
        ? "border-2 border-neutral-700 dark:border-amber-400/50 bg-gradient-to-b from-neutral-900 via-[#141416] to-black text-white shadow-2xl md:-translate-y-2 z-10 ring-1 ring-amber-400/20"
        : "border-neutral-700/60 dark:border-neutral-800 bg-gradient-to-b from-neutral-900/90 via-[#121214] to-black/90 text-neutral-100 hover:border-neutral-500 hover:shadow-lg hover:-translate-y-1";
    }

    // Silver pass default
    return active
      ? "border-2 border-neutral-400 dark:border-neutral-500 bg-gradient-to-b from-neutral-100/80 via-white dark:via-[#151518] to-neutral-50/50 dark:to-[#121214] shadow-xl md:-translate-y-1.5 z-10 ring-1 ring-neutral-400/20"
      : "border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-[#121214]/20 hover:border-neutral-300 dark:hover:border-neutral-700 opacity-90 hover:opacity-100 hover:-translate-y-0.5";
  };

  return (
    <div
      onClick={onSelect}
      className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-[32px] border transition-all duration-300 snap-center shrink-0 w-[82vw] xs:w-[76vw] md:w-auto cursor-pointer ${getCardStyle()}`}
    >
      <div>
        {/* 2026 Digital Member Pass Header Bar */}
        {isClub && (
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-mono text-neutral-400 dark:text-neutral-500 mb-4 border-b border-neutral-200/50 dark:border-neutral-800/80 pb-2.5">
            <div className="flex items-center gap-2">
              {/* Micro EMV Chip Graphic */}
              <div className="w-5 h-3.5 rounded bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                <div className="w-2.5 h-1.5 border border-amber-400/60 rounded-2xs" />
              </div>
              <span className={`font-bold ${isObsidian ? "text-amber-300" : isGold ? "text-[#F5A623]" : "text-neutral-500 dark:text-neutral-300"}`}>
                {tier.passType === "gold" ? "GOLD PASS • TIER 02" : tier.passType === "obsidian" ? "VIP OBSIDIAN • TIER 03" : "SILVER PASS • TIER 01"}
              </span>
            </div>
            <span className="text-[9px] text-neutral-400 dark:text-neutral-500">2026 PASS</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-bold flex items-center gap-2 ${isObsidian && isClub ? "text-white" : "text-ink dark:text-white"}`}>
              <span>{tier.name}</span>
            </h3>
            {tier.badge ? (
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                isGold 
                  ? "bg-[#F5A623]/15 text-[#F5A623] border-[#F5A623]/30" 
                  : isObsidian 
                  ? "bg-amber-400/10 text-amber-300 border-amber-400/30"
                  : "bg-neutral-200/50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700"
              }`}>
                {tier.badge}
              </span>
            ) : tier.isPopular ? (
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-[9px] font-bold uppercase tracking-widest border border-[#F5A623]/20">
                Most Popular
              </span>
            ) : active ? (
              <span className="px-2.5 py-0.5 rounded-full bg-[#F5A623]/10 text-[#F5A623] text-[9px] font-bold uppercase tracking-widest border border-[#F5A623]/20">
                Selected
              </span>
            ) : null}
          </div>
          
          {/* Price and duration context */}
          <div className="flex flex-col mt-4">
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-black tracking-tight ${isObsidian && isClub ? "text-white" : "text-ink dark:text-white"}`}>{tier.price}</span>
              <span className={`text-xs font-semibold ${isObsidian && isClub ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400"}`}>{priceUnit}</span>
            </div>
            <span className={`text-xs font-medium tracking-wide mt-1 ${isObsidian && isClub ? "text-neutral-400" : "text-neutral-400 dark:text-neutral-500"}`}>
              {isClub ? "Annual Pass • 365 Days Validity" : "One-time • No subscription"}
            </span>

            {/* Savings Pill */}
            {isClub && tier.savingsText && (
              <div className="mt-2.5 inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                <span>⚡</span>
                <span>{tier.savingsText}</span>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className={`w-full h-px my-6 ${isObsidian && isClub ? "bg-neutral-800" : "bg-neutral-100 dark:bg-neutral-900"}`}></div>

        {/* Features List */}
        <ul className="space-y-4 mb-8">
          {tier.features.map((feat, idx) => {
            const isCore = idx < 2; // first two features are core
            return (
              <li 
                key={feat} 
                className={`flex items-start gap-3 leading-tight ${
                  isObsidian && isClub
                    ? (isCore ? "text-sm text-neutral-100 font-semibold" : "text-xs text-neutral-400 font-medium pl-1")
                    : (isCore 
                        ? "text-sm text-neutral-700 dark:text-neutral-300 font-semibold" 
                        : "text-xs text-neutral-400 dark:text-neutral-500 font-medium pl-1")
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isCore 
                    ? "text-[#F5A623]" 
                    : (isObsidian && isClub ? "text-neutral-600" : "text-neutral-300 dark:text-neutral-700")
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
          onClick={(e) => e.stopPropagation()}
          className={`w-full min-h-[44px] py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-all duration-150 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 outline-none px-4 cursor-pointer ${
            active || isGold
              ? "bg-[#F5A623] text-white hover:bg-amber-500 shadow-md hover:shadow-lg"
              : isObsidian && isClub
              ? "bg-neutral-800 text-white hover:bg-[#F5A623] hover:text-white"
              : "bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-[#F5A623] hover:text-white"
          }`}
          aria-label={waButtonLabel}
        >
          <span>{waButtonLabel}</span>
          <MessageSquare className="w-4 h-4" />
        </a>

        {/* Direct customer social proof below button */}
        <div className="mt-3 text-center">
          <span className={`text-xs font-semibold flex items-center justify-center gap-1 ${isObsidian && isClub ? "text-neutral-400" : "text-neutral-400 dark:text-neutral-500"}`}>
            <span className="text-[#F5A623]">★</span> 4.9 · 200+ happy clients
          </span>
        </div>
      </div>

    </div>
  );
}
