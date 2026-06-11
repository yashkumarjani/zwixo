// FILE: components/MobileStickyCTA.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function MobileStickyCTA() {
  const [isTopVisible, setIsTopVisible] = useState(true);
  const [ctaText, setCtaText] = useState("Chat with us on WhatsApp →");

  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Dynamic text based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.3) {
      setCtaText("Chat with us on WhatsApp →");
    } else if (latest < 0.7) {
      setCtaText("See our work · Order in 2 min →");
    } else {
      setCtaText("Ready? Order now on WhatsApp →");
    }
  });

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTopVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      aria-live="polite"
      initial="hidden"
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: shouldReduceMotion ? 0 : 100, opacity: 0 }
      }}
      animate={isTopVisible ? "hidden" : "visible"}
      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-5 left-4 right-4 z-40 md:hidden flex justify-center pointer-events-none"
    >
      <a
        href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi, I want to order a design package.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="w-full max-w-sm pointer-events-auto h-12 flex items-center justify-center gap-2.5 px-6 rounded-full bg-[#F5A623] text-white font-semibold text-xs border border-white/25 focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 shadow-lg"
      >
        <MessageSquare className="w-4 h-4 fill-current shrink-0" />
        <span>{ctaText}</span>
      </a>
    </motion.div>
  );
}
