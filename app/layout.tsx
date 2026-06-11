// FILE: app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  // UPDATED: Configured display: swap for improved font rendering performance
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZWIXO | India's WhatsApp-first Memory & Celebration Studio",
  description: "Snap it. Glow it. Deliver it. We restore, edit, and curate your real photos, family moments, and celebrations with hand-curated artistry in Ahmedabad, Gujarat.",
  keywords: ["Zwixo", "photo restoration", "wedding countdown posters", "baby milestone cards", "creative edit", "wedding website", "Ahmedabad studio"],
  authors: [{ name: "Yash & Gautami" }],
  openGraph: {
    title: "ZWIXO | Memory & Celebration Studio",
    description: "Real Photos. Real Memories. Real Emotions. Order wedding countdowns, baby milestone cards, and photo restorations in 30 seconds via WhatsApp.",
    url: "https://zwixo.com",
    siteName: "ZWIXO",
    locale: "en_IN",
    type: "website",
  },
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased text-ink bg-white min-h-screen" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:bg-[#F5A623] focus:text-ink focus:rounded-full focus:outline-none font-black shadow-xl border border-white/20"
        >
          Skip to content
        </a>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
