// FILE: components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence, useReducedMotion, useScroll } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useScrollTo } from "../hooks/useScrollTo";
import { NAV_ITEMS } from "../lib/constants";
import { getDrawerVariants } from "../lib/animations";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const scrollTo = useScrollTo();

  const shouldReduceMotion = useReducedMotion();



  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Trap focus inside drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      
      const drawer = document.querySelector('[data-mobile-drawer]');
      if (!drawer) return;
      
      const focusableElements = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      );
      
      const hamburger = document.querySelector('[data-hamburger-btn]');
      if (hamburger) {
        focusableElements.unshift(hamburger as HTMLElement);
      }
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleScrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <header
        // 2026 Fix: Header on scroll = bg-white/80 dark:bg-ink/80 backdrop-blur-md border-neutral-100 dark:border-neutral-800
        // At top = bg-transparent, no border
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-200 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/80 dark:bg-ink/80 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-900 py-3.5 shadow-sm"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="responsive-container flex items-center justify-between">
          {/* Logo 2026 Fix: ZWI[X]O brackets removed, X in saffron with tight letter-spacing */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 cursor-pointer select-none text-left focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded-xl p-1"
            aria-label="ZWIXO Homepage"
          >
            <svg viewBox="0 0 76 76" className="w-9 h-9 shrink-0 transition-transform duration-300 hover:rotate-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="76" height="76" rx="18" fill="#1C1C1E"/>
              <rect x="14" y="16" width="48" height="10" rx="5" fill="#F5A623"/>
              <polygon points="52,26 62,26 24,50 14,50" fill="#F5A623"/>
              <rect x="14" y="50" width="48" height="10" rx="5" fill="#F5A623"/>
              <rect x="50" y="54" width="12" height="8" rx="2" fill="#1C1C1E"/>
              <polygon points="50,56 68,58 50,60" fill="#1C1C1E"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-ink dark:text-white font-sans leading-none -tracking-[0.04em]">
                ZWI<span className="text-[#F5A623]">X</span>O
              </span>
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest leading-none mt-1">
                Memory Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation links 2026 Fix: gap-8, text-sm font-medium tracking-wide, opacity hover transitions */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-400">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleScrollToSection(item)}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 cursor-pointer capitalize py-1 focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded-md px-1"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Action Buttons & Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-neutral-600 dark:text-neutral-400 cursor-pointer w-9 h-9 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2"
              aria-label={theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
            >
              {theme === "light" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              )}
            </button>

            {/* 2026 Fix: Outlined small "Order Now" CTA button styling */}
            <a
              href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi, I want to order a design package.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center text-sm px-4 py-1.5 rounded-full border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-white transition-all duration-200 font-semibold focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 cursor-pointer"
              aria-label="Order on WhatsApp"
            >
              Order Now
            </a>

            {/* Mobile Hamburger Trigger with Morphing Animation */}
            <button
              data-hamburger-btn
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-ink dark:text-white focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 z-[60] relative flex items-center justify-center w-10 h-10 cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span
                  className={`w-5 h-0.5 bg-ink dark:bg-white rounded-full transition-all duration-200 origin-center ${
                    isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-ink dark:bg-white rounded-full transition-all duration-200 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-ink dark:bg-white rounded-full transition-all duration-200 origin-center ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            data-mobile-drawer
            data-lenis-prevent
            variants={getDrawerVariants(shouldReduceMotion ?? false)}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-white dark:bg-ink flex flex-col pt-24 pb-8 px-6 overflow-y-auto md:hidden"
          >
            <nav className="flex flex-col gap-5 text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleScrollToSection(item)}
                  className="text-left py-4 hover:text-[#F5A623] dark:hover:text-[#F5A623] transition-colors capitalize border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 rounded-lg px-1"
                >
                  <span>{item}</span>
                  <svg className="w-4 h-4 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              ))}
            </nav>

            <div className="mt-12">
              <a
                href={`https://wa.me/918320870517?text=${encodeURIComponent("Hi, I want to order a design package.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#F5A623] text-white hover:bg-amber-500 text-sm font-semibold rounded-full flex items-center justify-center gap-2 shadow-sm focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 min-h-[44px] cursor-pointer"
                aria-label="Order on WhatsApp"
              >
                <span>Order Now</span>
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
