// FILE: app/page.tsx
"use client";

import React from "react";
// UPDATED: Imported next/dynamic to dynamically load heavy components
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Footer from "../components/Footer";
import MobileStickyCTA from "../components/MobileStickyCTA";
import ErrorBoundary from "../components/ErrorBoundary";
import FloatingEmoji from "../components/FloatingEmoji";

// UPDATED: Dynamically import heavy below-fold components with loading skeletons to prevent layout shift
const Showcase = dynamic(() => import("../components/Showcase"), {
  ssr: false,
  loading: () => (
    <div className="responsive-container py-24">
      <div className="w-full min-h-[600px] bg-ink animate-pulse rounded-[32px] border border-gray-800" />
    </div>
  ),
});

const Pricing = dynamic(() => import("../components/Pricing"), {
  ssr: false,
  loading: () => (
    <div className="responsive-container py-24">
      <div className="w-full min-h-[600px] bg-gray-light dark:bg-gray-dark/20 animate-pulse rounded-[32px] border border-gray-100 dark:border-gray-800" />
    </div>
  ),
});

const Testimonials = dynamic(() => import("../components/Testimonials"), {
  ssr: false,
  loading: () => (
    <div className="responsive-container py-24">
      <div className="w-full min-h-[400px] bg-gray-light dark:bg-gray-dark/20 animate-pulse rounded-[32px] border border-gray-100 dark:border-gray-800" />
    </div>
  ),
});

export default function Page() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen w-full bg-white dark:bg-ink text-ink dark:text-foreground overflow-x-hidden focus:outline-none"
    >
      {/* UPDATED: Added top-sentinel div to observe top viewport scroll threshold for MobileStickyCTA */}
      <div id="top-sentinel" className="absolute top-0 left-0 w-px h-px pointer-events-none" />

      {/* Sticky frosted navigation header */}
      <ErrorBoundary sectionName="Header">
        <Header />
      </ErrorBoundary>

      {/* Section 1: Hero (integrates localized 3D Canvas) */}
      <ErrorBoundary sectionName="Hero">
        <Hero />
      </ErrorBoundary>

      {/* Section 2: Services */}
      <ErrorBoundary sectionName="Services">
        <Services />
      </ErrorBoundary>

      {/* Section 3: Before/After Showcase */}
      <ErrorBoundary sectionName="Showcase">
        <Showcase />
      </ErrorBoundary>

      {/* Section 4: Pricing */}
      <ErrorBoundary sectionName="Pricing">
        <Pricing />
      </ErrorBoundary>

      {/* Section 5: Testimonials */}
      <ErrorBoundary sectionName="Testimonials">
        <Testimonials />
      </ErrorBoundary>

      {/* Section 6: Final CTA + Footer */}
      <ErrorBoundary sectionName="Footer">
        <Footer />
      </ErrorBoundary>

      {/* Mobile-only Sticky bottom CTA bar */}
      <ErrorBoundary sectionName="MobileStickyCTA">
        <MobileStickyCTA />
      </ErrorBoundary>

      {/* Floating interactive Emoji */}
      <ErrorBoundary sectionName="FloatingEmoji">
        <FloatingEmoji />
      </ErrorBoundary>
    </main>
  );
}
