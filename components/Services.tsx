// FILE: components/Services.tsx
"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";
import { Sparkles, Heart, Baby } from "lucide-react";
import { useScrollTo } from "../hooks/useScrollTo";
import { SERVICES } from "../lib/constants";

export default function Services() {
  const shouldReduceMotion = useReducedMotion();
  const scrollTo = useScrollTo();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "sparkles": return <Sparkles className="w-6 h-6 text-[#F5A623]" />;
      case "heart": return <Heart className="w-5 h-5 text-[#F5A623]" />;
      case "baby": return <Baby className="w-5 h-5 text-[#F5A623]" />;
      default: return null;
    }
  };

  return (
    <section 
      id="services" 
      className="pt-24 pb-20 bg-white dark:bg-ink select-none relative overflow-hidden transition-colors duration-300"
    >
      <div className="responsive-container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Redesigned 2026 Section Heading Pattern */}
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-extrabold mb-1 block">
            Our services
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink dark:text-white leading-none -tracking-[0.02em]">
            What we make for you
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto">
            Three services, one WhatsApp message away.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="services-bento-grid">
          {SERVICES.map((service) => (
            <m.div
              key={service.id}
              whileHover={shouldReduceMotion ? undefined : { 
                borderColor: "rgba(245, 166, 35, 0.4)",
                boxShadow: "0 0 0 2px rgba(245, 166, 35, 0.25)"
              }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`flex flex-col justify-between p-8 rounded-[32px] border border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-[#121214]/50 transition-colors duration-200 ${service.gridClass}`}
            >
              <div>
                {/* Icon wrapper inside 12x12 (48px) neutral box */}
                <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-6">
                  {getIcon(service.iconName)}
                </div>

                <h3 className="text-xl font-bold text-ink dark:text-white mb-2">
                  {service.title}
                </h3>
                
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  {service.benefit}
                </span>
                
                <button
                  onClick={() => scrollTo("pricing")}
                  className="text-xs text-neutral-400 hover:text-[#F5A623] dark:text-neutral-500 dark:hover:text-[#F5A623] transition-colors font-medium flex items-center gap-1 cursor-pointer"
                >
                  → See pricing
                </button>
              </div>
            </m.div>
          ))}
        </div>

        {/* Section level unified CTA */}
        <div className="flex justify-center mt-12">
          <a
            href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi, I want to chat about ordering a design package.")}`}
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
