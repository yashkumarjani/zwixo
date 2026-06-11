// FILE: components/Footer.tsx
"use client";

import React from "react";

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="bg-neutral-50 dark:bg-ink text-neutral-800 dark:text-white border-t border-neutral-100 dark:border-neutral-900 select-none relative overflow-hidden"
    >
      {/* Main Footer Container */}
      <div className="responsive-container max-w-5xl mx-auto px-6 pt-24 pb-12 relative z-10 flex flex-col items-center">
        
        {/* CTA Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-center mb-4 max-w-3xl leading-none text-ink dark:text-white">
          Your Memory Deserves Zwixo
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-8 max-w-md">
          Every celebration deserves beautiful memories. Every memory deserves Zwixo.
        </p>

        {/* WhatsApp Button (Variant A) */}
        <a
          href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi, I want to order a design package.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#F5A623] text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition-colors inline-flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 cursor-pointer text-sm mb-16"
          aria-label="Order on WhatsApp"
        >
          Order on WhatsApp
        </a>

        {/* Structured Grid Directory */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-t border-neutral-100 dark:border-neutral-900 pt-16 pb-12">
          {/* Column 1: Brand details */}
          <div className="flex flex-col items-start gap-4">
            <button 
              className="flex flex-col cursor-pointer select-none text-left focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded-xl p-1"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Zwixo Home"
            >
              <span className="text-2xl font-black text-ink dark:text-white leading-none -tracking-[0.04em]">
                ZWI<span className="text-[#F5A623]">X</span>O
              </span>
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest leading-none mt-1">
                Memory Studio
              </span>
            </button>
            <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 leading-relaxed mt-2 max-w-sm">
              We reject AI presets. We curate restored memories, celebrations, and wedding designs with meticulous studio craftsmanship.
            </p>
          </div>

          {/* Column 2: Quick Directory links */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Directory</span>
            <ul className="space-y-2.5 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
              <li>
                <button onClick={() => handleScrollTo("services")} className="hover:text-[#F5A623] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded px-1 text-left">
                  What We Create
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("showcase")} className="hover:text-[#F5A623] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded px-1 text-left">
                  Restoration Showcase
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("pricing")} className="hover:text-[#F5A623] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded px-1 text-left">
                  Investment &amp; Packages
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("testimonials")} className="hover:text-[#F5A623] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded px-1 text-left">
                  Client Love
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Ahmedabad HQ</span>
            <address className="not-italic text-sm font-semibold text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
              <p>Ahmedabad, Gujarat, India</p>
              <p className="font-bold text-ink dark:text-white">Founded by Yash &amp; Gautami</p>
              <div className="flex items-center gap-4 pt-2 font-bold text-ink dark:text-white">
                <a
                  href="https://instagram.com/zwixo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5A623] transition-colors focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded px-1"
                  aria-label="ZWIXO Instagram page"
                >
                  Instagram
                </a>
                <a
                  href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi Zwixo! I would like to chat about your memory studio services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5A623] transition-colors focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded px-1"
                  aria-label="Chat on WhatsApp about Zwixo"
                >
                  WhatsApp
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* 2026 Fix: Static Large wordmark with saffron X and no mouse physics */}
        <div className="w-full text-center overflow-hidden py-4 select-none cursor-default border-t border-neutral-100 dark:border-neutral-900 mb-8">
          <div className="text-[clamp(3rem,12vw,8rem)] font-black tracking-tighter leading-none flex justify-center text-neutral-200/40 dark:text-white/5 whitespace-nowrap">
            ZWI<span className="text-[#F5A623]/40 dark:text-[#F5A623]/15">X</span>O
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-100 dark:border-neutral-900 pt-8 text-xs font-bold text-neutral-400 dark:text-neutral-500">
          <span>&copy; 2026 Zwixo. All rights reserved.</span>
          <span>Designed with Love in Ahmedabad by Yash &amp; Gautami.</span>
        </div>
      </div>
    </footer>
  );
}
