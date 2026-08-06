// FILE: components/Services.tsx
"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";
import { Sparkles, Heart, Baby, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useScrollTo } from "../hooks/useScrollTo";
import { SERVICES } from "../lib/constants";

export default function Services() {
  const shouldReduceMotion = useReducedMotion();
  const scrollTo = useScrollTo();

  const handlePricingClick = (serviceId: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("switchPricingTab", { detail: serviceId }));
    }
    scrollTo("pricing");
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "sparkles": return <Sparkles className="w-6 h-6 text-[#F5A623]" />;
      case "heart": return <Heart className="w-6 h-6 text-[#F5A623]" />;
      case "baby": return <Baby className="w-6 h-6 text-[#F5A623]" />;
      case "bag": return <ShoppingBag className="w-6 h-6 text-[#F5A623]" />;
      default: return null;
    }
  };

  return (
    <section 
      id="services" 
      className="pt-24 pb-20 bg-white dark:bg-ink select-none relative overflow-hidden transition-colors duration-300"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="responsive-container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Redesigned 2026 Section Heading Pattern */}
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-extrabold mb-1 block">
            Crafted for Celebrations & Business
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink dark:text-white leading-none -tracking-[0.02em]">
            Four Studio Services. Zero Hassle.
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto">
            From restored heritage photos to business marketing reel ads — ordered in 30 seconds on WhatsApp.
          </p>
        </div>

        {/* 2026 Balanced 4-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <m.div
              key={service.id}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col justify-between p-7 sm:p-9 rounded-[32px] border border-neutral-200/80 dark:border-neutral-850 bg-neutral-50/60 dark:bg-[#121215]/80 relative overflow-hidden group shadow-lg transition-all duration-300 hover:border-[#F5A623]/40 hover:shadow-xl"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#F5A623]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-neutral-900/90 text-[#F5A623] border border-[#F5A623]/20 flex items-center justify-center shadow-md">
                    {getIcon(service.iconName)}
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/25 text-[#F5A623] text-[10px] font-extrabold uppercase tracking-widest">
                    {service.tagBadge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-black text-ink dark:text-white mb-2 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              {/* Bottom Action Row */}
              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/80 flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 truncate">
                  {service.benefit}
                </span>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handlePricingClick(service.id)}
                    className="text-xs font-bold text-neutral-400 hover:text-[#F5A623] dark:text-neutral-500 dark:hover:text-[#F5A623] transition-colors cursor-pointer"
                  >
                    Pricing
                  </button>

                  <a
                    href={`https://wa.me/918320870517?text=${encodeURIComponent(service.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold bg-[#F5A623] text-ink px-3.5 py-1.5 rounded-full hover:bg-amber-400 transition-all duration-200 cursor-pointer shadow-sm group-hover:scale-105"
                  >
                    Order <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* Section level unified CTA */}
        <div className="flex justify-center mt-12">
          <a
            href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi ZWIXO, I want to chat about ordering a design package.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 dark:text-neutral-400 hover:text-[#F5A623] dark:hover:text-[#F5A623] font-semibold text-sm transition-colors duration-200 cursor-pointer flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded-lg p-1"
          >
            Ready to order? <span className="text-[#F5A623]">→ Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
