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
  title: "ZWIXO | WhatsApp-First Memory & Business Studio (Starts ₹249)",
  description: "ZWIXO: India's premier WhatsApp-first studio. Photo Restorations (+ FREE AI Video), Wedding Countdowns, Baby Milestones, Product Marketing & Forever Moments Club. Express 24h WhatsApp delivery. Rated 4.9★ by 200+ clients.",
  keywords: [
    "ZWIXO", 
    "Zwixo", 
    "ZWIXO Memory Studio", 
    "Zwixo Studio", 
    "ZWIXO Photo Restoration", 
    "Zwixo Countdown", 
    "Forever Moments Club",
    "VIP memory pass",
    "photo restoration Ahmedabad", 
    "wedding countdown posters", 
    "baby milestone cards", 
    "product marketing posters",
    "product marketing AI video",
    "AI reel ads",
    "D2C product posters",
    "creative edit", 
    "Ahmedabad studio"
  ],
  authors: [{ name: "Gautami", url: "https://zwixo-memory-studio.netlify.app" }],
  creator: "Gautami",
  publisher: "ZWIXO",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "ZWIXO | WhatsApp-First Memory & Business Studio 🚀",
    description: "Photo Restorations (₹499) + FREE AI Video, Wedding Countdowns (₹2,499), Baby Milestones (₹1,299), Product Ads (₹1,999) & Forever Moments Club (₹249). Rated 4.9★ (200+ Reviews). Express 24h WhatsApp Delivery!",
    url: "https://zwixo-memory-studio.netlify.app",
    siteName: "ZWIXO",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://zwixo-memory-studio.netlify.app/images/logo_preview.png",
        secureUrl: "https://zwixo-memory-studio.netlify.app/images/logo_preview.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "ZWIXO Memory & Business Studio - Express WhatsApp Delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZWIXO | Memory & Business Studio 🚀 (Starts ₹249)",
    description: "Photo Restorations, Wedding Countdowns, Baby Milestones, Product Marketing & Forever Moments Club + FREE AI Video Reels. 4.9★ Rated. Express WhatsApp Delivery!",
    site: "@zwixostudio",
    creator: "@zwixostudio",
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
      "alternateName": ["Zwixo", "ZWIXO Memory Studio", "Zwixo Studio", "ZWIXO Memory & Business Studio"],
      "description": "ZWIXO is India's premium WhatsApp-first Memory, Celebration & Business Studio.",
      "publisher": {
        "@id": "https://zwixo-memory-studio.netlify.app/#organization"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://zwixo-memory-studio.netlify.app/#organization",
      "name": "ZWIXO Memory & Business Studio",
      "image": "https://zwixo-memory-studio.netlify.app/images/logo_preview.png",
      "url": "https://zwixo-memory-studio.netlify.app",
      "telephone": "+918320870517",
      "priceRange": "₹249 - ₹5,999",
      "currenciesAccepted": "INR",
      "paymentAccepted": "UPI, Credit Card, Debit Card, Net Banking",
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
      "areaServed": [
        {
          "@type": "City",
          "name": "Ahmedabad"
        },
        {
          "@type": "Country",
          "name": "India"
        }
      ],
      "founder": {
        "@type": "Person",
        "name": "Gautami",
        "jobTitle": "Lead Creative Artist & Founder"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "200",
        "bestRating": "5",
        "worstRating": "1"
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
        "https://wa.me/918320870517",
        "https://www.instagram.com/zwixostudio"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "ZWIXO Creative Services & Membership",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Forever Moments Club (Annual VIP Pass)",
            "description": "Unlock VIP pricing, priority 24h WhatsApp turnaround, 1 Free Photo Restoration, and year-round discounts on memory & business posters.",
            "price": "249",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": "https://zwixo-memory-studio.netlify.app"
          },
          {
            "@type": "Offer",
            "name": "Photo Restoration (+ FREE AI Video Reel)",
            "description": "Restore vintage, torn, faded, or blurry family photographs into Full HD 300 DPI masterpieces + complimentary AI motion video reel.",
            "price": "499",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": "https://zwixo-memory-studio.netlify.app"
          },
          {
            "@type": "Offer",
            "name": "Baby Milestone Keepsake Cards",
            "description": "Artisan monthly milestone keepsake posters capturing baby first steps, smiles, and monthly themes with personalized story elements.",
            "price": "1299",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": "https://zwixo-memory-studio.netlify.app"
          },
          {
            "@type": "Offer",
            "name": "Product Marketing Posters & AI Video Ads",
            "description": "Commercial-grade D2C and local business product banners + 9:16 vertical AI promotional reels engineered for Instagram and WhatsApp ads.",
            "price": "1999",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": "https://zwixo-memory-studio.netlify.app"
          },
          {
            "@type": "Offer",
            "name": "Wedding Countdown & Save the Date Posters",
            "description": "Cinematic royal wedding countdowns, digital invites, and save-the-date posters crafted for WhatsApp status and luxury printing.",
            "price": "2499",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": "https://zwixo-memory-studio.netlify.app"
          }
        ]
      }
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
