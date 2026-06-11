// FILE: components/Hero.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import FloatingOrb from "./FloatingOrb";


export interface SpringCounterProps {
  value: number;
}

// Spring Ticker Counter
function SpringCounter({ value }: SpringCounterProps) {
  const [isMounted, setIsMounted] = useState(false);
  const motionValue = useMotionValue(0);
  const springVal = useSpring(motionValue, { stiffness: 60, damping: 18 });
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    motionValue.set(value);
  }, [value, motionValue, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    return springVal.on("change", (latest) => {
      setCurrentVal(Math.round(latest));
    });
  }, [springVal, isMounted]);

  return <span>{isMounted ? currentVal.toLocaleString() : "0"}</span>;
}

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-white dark:bg-ink select-none pt-24 pb-8 transition-colors duration-300"
    >
      {/* Subtle Dot Grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e7_1px,transparent_1px)] dark:bg-[radial-gradient(#2c2c2e_1px,transparent_1px)] [background-size:32px_32px] opacity-40 dark:opacity-60 pointer-events-none z-0"></div>

      <div className="responsive-container flex-1 flex items-center justify-center relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Right Column: Moves above text on tablet (sm+), hidden on mobile, has warm tint background */}
          <div className="hidden sm:flex lg:order-2 w-full h-[350px] lg:h-[600px] items-center justify-center relative select-none z-10 p-6">
            <FloatingOrb />
          </div>

          {/* Mobile-only Static Image: shown below 640px viewport */}
          <div className="flex sm:hidden w-full max-w-[200px] aspect-[2/3] mx-auto relative rounded-2xl overflow-hidden mb-6 z-10">
            <Image
              src="/images/iphone_orange_mockup.png"
              alt="Zwixo Mobile Preview"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Left Column: Headline copy */}
          <div className="lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start w-full">
            
            {/* Level 1 (eyebrow badge): 11px uppercase mb-4, split into live badge + plain subtitle */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 text-[11px] font-extrabold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse"></span>
                Live studio
              </span>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-wide mt-2">
                WhatsApp-first • Ahmedabad
              </div>
            </div>

            {/* Level 2 (wordmark): clamp(3.5rem, 8vw, 7rem) font-black tracking-tighter leading-none */}
            <h1 
              className="font-black tracking-tighter text-ink dark:text-white leading-none select-none -tracking-[0.04em]"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
            >
              ZWI<span className="text-[#F5A623]">X</span>O
            </h1>

            {/* Level 3 (tagline): clamp(1rem, 2vw, 1.25rem) font-normal text-neutral-500 mt-3 */}
            <p 
              className="font-normal text-neutral-500 dark:text-neutral-400 mt-3 mb-6 max-w-xl leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
            >
              Restore memories. Design celebrations. Delivered in 48h via WhatsApp.
            </p>

            {/* Stat counters: wrapped in flex row with vertical divider */}
            <div className="flex items-center gap-6 my-6 text-left">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                  <SpringCounter value={1250} />+
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  photos restored
                </span>
              </div>
              <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                  <SpringCounter value={48} />h
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  avg delivery
                </span>
              </div>
            </div>

            {/* CTAs: Primary Saffron fill, Secondary text link */}
            <div className="flex flex-row items-center gap-6 mt-2">
              <a
                href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi, I want to order a design package.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F5A623] text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition-colors inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 cursor-pointer text-sm"
                aria-label="Order on WhatsApp"
              >
                Order on WhatsApp
              </a>

              <button
                onClick={() => handleScrollTo("services")}
                className="text-neutral-600 dark:text-neutral-400 underline-offset-4 hover:underline text-sm font-medium cursor-pointer"
              >
                See Our Work
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="w-full flex justify-center pb-4 z-10">
        <button 
          onClick={() => handleScrollTo("services")}
          className="group text-neutral-400 hover:text-[#F5A623] transition-colors cursor-pointer flex flex-col items-center gap-2 text-[10px] font-black uppercase tracking-widest focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded-lg p-1"
        >
          <span>Scroll Down</span>
          <div className="w-5 h-9 rounded-full border border-neutral-300 dark:border-neutral-700 p-1 flex justify-center">
            <motion.div 
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
