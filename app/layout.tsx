// FILE: app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";
import "./globals.css";
import Script from "next/script";
import { LazyMotion, domAnimation } from "framer-motion";
import LoaderWrapper from "../components/LoaderWrapper";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zwixo-memory-studio.netlify.app"),
  alternates: {
    canonical: "/",
  },
  title: "ZWIXO | WhatsApp-First Memory & Business Studio",
  description: "ZWIXO is India's premier WhatsApp-first Memory & Business Studio. Photo Restorations, Wedding Countdowns, Baby Milestones & Product Marketing Posters + FREE AI Video Reels. Express 24h WhatsApp delivery.",
  keywords: [
    "ZWIXO", 
    "Zwixo", 
    "ZWIXO Memory Studio", 
    "Zwixo Studio", 
    "ZWIXO Photo Restoration", 
    "Zwixo Countdown", 
    "photo restoration", 
    "wedding countdown posters", 
    "baby milestone cards", 
    "product marketing posters",
    "product marketing AI video",
    "AI reel ads",
    "D2C product posters",
    "creative edit", 
    "Ahmedabad studio"
  ],
  authors: [{ name: "Gautami" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "ZWIXO | Memory & Business Studio 🚀",
    description: "India's premier WhatsApp-first studio. Photo Restorations, Wedding Countdowns, Baby Milestones & Product Marketing Posters + FREE AI Video Reels. Express 24h WhatsApp delivery!",
    url: "https://zwixo-memory-studio.netlify.app",
    siteName: "ZWIXO",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://zwixo-memory-studio.netlify.app/images/logo_preview.png",
        width: 1200,
        height: 630,
        alt: "ZWIXO Memory & Business Studio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZWIXO | Memory & Business Studio 🚀",
    description: "India's premier WhatsApp-first studio. Photo Restorations, Wedding Countdowns, Baby Milestones & Product Marketing Posters + FREE AI Video Reels. Express 24h WhatsApp delivery!",
    images: ["https://zwixo-memory-studio.netlify.app/images/logo_preview.png"],
  },
  verification: {
    google: "rYN0_KoOlOzVqesAOdcC7W4a4FDVa9lDq7kWWWtOFS4",
  },
};

// Tracking IDs (Read from environment variables, or leave empty to disable)
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Structured Data (JSON-LD) for LocalBusiness/ProfessionalService and WebSite SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://zwixo-memory-studio.netlify.app/#website",
      "url": "https://zwixo-memory-studio.netlify.app",
      "name": "ZWIXO",
      "alternateName": ["Zwixo", "ZWIXO Memory Studio", "Zwixo Studio"],
      "description": "ZWIXO is India's premium WhatsApp-first Memory & Celebration Studio.",
      "publisher": {
        "@id": "https://zwixo-memory-studio.netlify.app/#organization"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://zwixo-memory-studio.netlify.app/#organization",
      "name": "ZWIXO",
      "image": "https://zwixo-memory-studio.netlify.app/images/logo_preview.png",
      "url": "https://zwixo-memory-studio.netlify.app",
      "telephone": "+918320870517",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Satellite",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "postalCode": "380015",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.0305,
        "longitude": 72.5076
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      },
      "sameAs": [
        "https://wa.me/918320870517"
      ]
    }
  ]
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Google Analytics (gtag.js) */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}

        {/* SEO Structured Schema (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-ink bg-white min-h-screen" suppressHydrationWarning>
        {/* GTM Noscript Fallback for non-JS clients */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-2.5 focus:bg-[#F5A623] focus:text-ink focus:rounded-full focus:outline-none font-black shadow-xl border border-white/20"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <LazyMotion features={domAnimation} strict>
            <LoaderWrapper>
              {children}
            </LoaderWrapper>
          </LazyMotion>
        </SmoothScroll>
      </body>
    </html>
  );
}
