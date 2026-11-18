// FILE: components/Hero.tsx
"use client";

import React from "react";
import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import FloatingOrb from "./FloatingOrb";
import SpringCounter from "./SpringCounter";
import { useScrollTo } from "../hooks/useScrollTo";
import { Sparkles, MessageSquare } from "lucide-react";

export default function Hero() {
  const scrollTo = useScrollTo();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-white dark:bg-ink select-none pt-28 pb-8 transition-colors duration-300"
    >
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Subtle Dot Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e7_1px,transparent_1px)] dark:bg-[radial-gradient(#2c2c2e_1px,transparent_1px)] [background-size:32px_32px] opacity-40 dark:opacity-60 pointer-events-none z-0" />

      <div className="responsive-container flex-1 flex items-center justify-center relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          
          {/* Right Column: Floating 3D Interactive Canvas + Live Studio Card */}
          <div className="hidden sm:flex lg:order-2 w-full h-[360px] lg:h-[540px] items-center justify-center relative select-none z-10 p-4">
            <FloatingOrb />
          </div>

          {/* Mobile-only Preview Image (shown below 640px) */}
          <div className="flex sm:hidden w-full max-w-[200px] aspect-[2/3] mx-auto relative rounded-2xl overflow-hidden mb-4 z-10 shadow-none">
            <Image
              src="/images/iphone_orange_mockup.png"
              alt="Zwixo Mobile Preview"
              fill
              priority
              sizes="(max-width: 640px) 200px, 200px"
              className="object-contain"
            />
          </div>

          {/* Left Column: Core Value Proposition */}
          <div className="lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
            
            {/* Live Studio Eyebrow Badge */}
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-[11px] font-extrabold text-neutral-600 dark:text-neutral-300 uppercase tracking-widest shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
                Live Studio • Ahmedabad
              </span>
            </div>

            {/* ZWIXO Main Wordmark */}
            <h1 
              className="font-black tracking-tighter text-ink dark:text-white leading-none select-none -tracking-[0.04em]"
              style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
            >
              ZWI<span className="text-[#F5A623]">X</span>O
            </h1>

            {/* Tagline Subtitle */}
            <p 
              className="font-normal text-neutral-600 dark:text-neutral-300 mt-4 mb-6 max-w-xl leading-relaxed text-balance"
              style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
            >
              Photo Restoration, Product Marketing & Celebration Art — Restored & Designed directly on WhatsApp.
            </p>

            {/* Stat Counters: 1,250+ Restored, 24h Delivery, 4.9 Rating */}
            <div className="flex items-center gap-5 sm:gap-8 my-4 text-left">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-ink dark:text-white">
                  <SpringCounter value={1250} />+
                </span>
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Photos Restored
                </span>
              </div>
              <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-ink dark:text-white">
                  <SpringCounter value={24} />h
                </span>
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Express Delivery
                </span>
              </div>
              <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#F5A623]">
                  4.9 ★
                </span>
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  200+ Client Reviews
                </span>
              </div>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 w-full sm:w-auto">
              <a
                href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi ZWIXO, I want to order a design package.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#F5A623] text-ink font-bold px-7 py-3.5 rounded-full hover:bg-amber-400 transition-all duration-200 inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 cursor-pointer text-sm shadow-md active:scale-95"
                aria-label="Order on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Order on WhatsApp</span>
              </a>

              <button
                onClick={() => scrollTo("showcase")}
                className="w-full sm:w-auto text-neutral-600 dark:text-neutral-300 hover:text-ink dark:hover:text-white px-6 py-3.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-sm font-semibold transition-all duration-200 cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                <span>See Showcase</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="w-full flex justify-center pb-2 z-10">
        <button 
          onClick={() => scrollTo("services")}
          className="group text-neutral-400 hover:text-[#F5A623] transition-colors cursor-pointer flex flex-col items-center gap-2 text-[10px] font-black uppercase tracking-widest focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded-lg p-1"
        >
          <span>Explore Services</span>
          <div className="w-5 h-9 rounded-full border border-neutral-300 dark:border-neutral-700 p-1 flex justify-center">
            <m.div 
              initial={{ y: 0 }}
              animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"
            />
          </div>
        </button>
      </div>
    </section>
  );
}
