// FILE: components/FAQ.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How do I send my photos for restoration or product marketing?",
    answer: "Simply click any WhatsApp button on our website! Attach your raw photo or product image directly in the WhatsApp chat along with your package choice. No complex sign-up or app downloads required — Gautami will respond within minutes."
  },
  {
    question: "Will my personal family photos and product designs stay private?",
    answer: "100% Confidential & Secure. Your personal family photographs, baby pictures, and unreleased business product designs are strictly private. We never publish or feature customer photos without your explicit written consent."
  },
  {
    question: "Is the AI Animated Memory & Product Video Reel really 100% FREE?",
    answer: "Yes! Every Photo Restoration order includes a 100% FREE AI Animated Memory Video bonus gift. Similarly, all Product Marketing packages include FREE 10s Full HD AI Product Video Reel Ads!"
  },
  {
    question: "What file format and resolution will I receive?",
    answer: "You will receive Full HD Print-Ready Digital Master Files (PNG/JPG up to A3/A2 print sizes) + 1080p Full HD MP4 Video Reels delivered directly over WhatsApp."
  },
  {
    question: "What if I need modifications or changes after delivery?",
    answer: "Every design package includes 1 FREE revision! If you need any tweaks to color correction, detail restoration, or poster text, Gautami will refine it for you within 4-6 hours."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="pt-20 pb-20 bg-white dark:bg-ink text-ink dark:text-white relative overflow-hidden select-none transition-colors duration-300"
    >
      {/* Background Ambient Radial Glows */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="responsive-container max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Heading Pattern */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/25 text-[#F5A623] text-[11px] font-extrabold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-ink dark:text-white leading-none -tracking-[0.02em]">
            Everything you need to know
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto">
            Got questions? We&apos;ve got answers. Simple, transparent, and hassle-free.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-[24px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#F5A623]/50 bg-neutral-50 dark:bg-[#121214] shadow-lg shadow-[#F5A623]/5"
                    : "border-neutral-200/80 dark:border-neutral-850 bg-neutral-50/40 dark:bg-[#121215]/50 hover:border-neutral-300 dark:hover:border-neutral-800"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-ink dark:text-white leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#F5A623] text-white rotate-180"
                        : "bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-500"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-neutral-200/60 dark:border-neutral-850/80 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Section bottom WhatsApp support callout */}
        <div className="mt-12 text-center p-6 rounded-[28px] bg-neutral-900 text-white border border-neutral-800 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-bold text-[#F5A623] uppercase tracking-wider block mb-1">
              Still have questions?
            </span>
            <p className="text-sm text-neutral-300 font-medium">
              Gautami is live on WhatsApp to assist you instantly.
            </p>
          </div>
          <a
            href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi ZWIXO, I have a question before ordering.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F5A623] text-ink font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-amber-400 transition-colors duration-200 shrink-0 cursor-pointer shadow-md"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Ask Us on WhatsApp →</span>
          </a>
        </div>

      </div>
    </section>
  );
}
