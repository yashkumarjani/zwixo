// FILE: types/index.ts
import type { ReactNode } from "react";

export interface ShowcaseExample {
  title: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface ServicePricingGroup {
  id: string;
  label: string;
  emoji: string;
  tiers: PricingTier[];
}

export interface ServiceItem {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  benefit: string;
  gridClass: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

export interface CartoonFaceProps {
  state: "neutral" | "happy" | "grin" | "celebrate";
}

export interface PricingCardProps {
  tier: PricingTier;
  activePricingLabel: string;
  priceUnit: string;
}

export interface SpringCounterProps {
  value: number;
}

export interface SmoothScrollProps {
  children: ReactNode;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
