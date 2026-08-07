// FILE: lib/constants.ts
import type { ShowcaseExample, ServicePricingGroup, Testimonial } from "../types";

export const NAV_ITEMS = ["services", "showcase", "pricing", "testimonials"] as const;

export const SHOWCASE_ITEMS: ShowcaseExample[] = [
  {
    title: "Restored photos",
    beforeImg: "/images/beforeRestore.PNG",
    afterImg: "/images/afterRestore.PNG",
    beforeLabel: "Original",
    afterLabel: "Restored"
  },
  {
    title: "Celebration posters",
    beforeImg: "/images/beforeWedding.JPG",
    afterImg: "/images/afterWedding.PNG",
    beforeLabel: "Raw Photo",
    afterLabel: "Arch Poster"
  },
  {
    title: "Milestone cards",
    beforeImg: "/images/beforeBaby.JPG",
    afterImg: "/images/afterBaby.PNG",
    beforeLabel: "Raw Photo",
    afterLabel: "Milestone"
  },
  {
    title: "Product marketing",
    beforeImg: "/images/beforeProductV5.jpg",
    afterImg: "/images/afterProductV5.jpg",
    beforeLabel: "Raw Phone Photo",
    afterLabel: "Studio Poster"
  }
];

export const PRICING_GROUPS: ServicePricingGroup[] = [
  {
    id: "wedding-posters",
    label: "Wedding Countdown",
    emoji: "💑",
    tiers: [
      {
        name: "5 Days Countdown",
        price: "₹2,499",
        features: [
          "5 Personalized daily posters",
          "HD Quality PNG delivery",
          "1 Revision per design",
          "⚡ Daily WhatsApp Delivery (24h Setup)"
        ]
      },
      {
        name: "10 Days Countdown",
        price: "₹3,999",
        isPopular: true,
        features: [
          "10 Personalized daily posters",
          "HD Quality PNG delivery",
          "1 Revision per design",
          "⚡ Daily WhatsApp Delivery (24h Setup)"
        ]
      },
      {
        name: "15 Days Countdown",
        price: "₹5,999",
        features: [
          "15 Personalized daily posters",
          "HD Quality PNG delivery",
          "1 Revision per design",
          "⚡ Daily WhatsApp Delivery (48h Priority Setup)"
        ]
      }
    ]
  },
  {
    id: "baby-cards",
    label: "Baby Milestones",
    emoji: "👶",
    tiers: [
      {
        name: "3 Cards Pack",
        price: "₹1,299",
        features: [
          "3 Unique milestone designs",
          "Real baby photos (not templates)",
          "⚡ 24-Hour Express Delivery",
          "Print-ready HD files"
        ]
      },
      {
        name: "6 Cards Pack",
        price: "₹1,999",
        isPopular: true,
        features: [
          "6 Unique milestone designs",
          "Real baby photos (not templates)",
          "⚡ 24 to 48 Hours Delivery",
          "Print-ready HD files"
        ]
      },
      {
        name: "12 Cards Pack",
        price: "₹2,999",
        features: [
          "12 Unique milestone designs",
          "Real baby photos (not templates)",
          "⚡ 48-Hour Priority Delivery",
          "Print-ready HD files"
        ]
      }
    ]
  },
  {
    id: "photo-restoration",
    label: "Photo Restoration",
    emoji: "🖼",
    tiers: [
      {
        name: "Standard Restore",
        price: "₹499",
        features: [
          "🎁 FREE AI Memory Video Gift",
          "Mild scratch & dust removal",
          "Color enhancement & contrast",
          "⚡ 24-Hour Express Delivery",
          "HD digital delivery"
        ]
      },
      {
        name: "Premium Restore",
        price: "₹699",
        isPopular: true,
        features: [
          "🎁 FREE AI Memory Video Gift",
          "Heavy scratch & tear repair",
          "Skin texture & face detail restoration",
          "⚡ 24-Hour Express Delivery",
          "HD digital delivery"
        ]
      },
      {
        name: "Heavy Restore",
        price: "₹999",
        features: [
          "🎁 FREE AI Memory Video Gift",
          "Complete face/element reconstruction",
          "Advanced manual coloring",
          "⚡ 24 to 48 Hours Express Delivery",
          "HD digital delivery"
        ]
      }
    ]
  },
  {
    id: "product-marketing",
    label: "Product Marketing",
    emoji: "🛍️",
    tiers: [
      {
        name: "Starter Product Pack",
        price: "₹1,999",
        features: [
          "3 Full HD Product Marketing Posters",
          "🎁 1 FREE 10s Full HD AI Video Reel",
          "⚡ 24-Hour Express Delivery",
          "Full HD Print-Ready Files"
        ]
      },
      {
        name: "Growth Promo Pack",
        price: "₹3,499",
        isPopular: true,
        features: [
          "6 Full HD Product Posters / Offer Banners",
          "🎁 2 FREE 10s Full HD AI Video Reels",
          "⚡ 24 to 48 Hours Delivery",
          "1 Revision per design + Master Files"
        ]
      },
      {
        name: "Pro Business Bundle",
        price: "₹5,499",
        features: [
          "12 Full HD Product Posters / Offer Banners",
          "🎁 3 FREE 10s Full HD AI Video Reels",
          "⚡ 48-Hour Priority Delivery",
          "Flexible monthly delivery schedule"
        ]
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The wedding countdown posters were absolutely magical! Built so much hype.",
    author: "Priya S.",
    location: "Pune",
  },
  {
    quote: "My mom cried seeing her old childhood photo restored. Thank you Zwixo.",
    author: "Rahul M.",
    location: "Surat",
  },
  {
    quote: "Baby milestone cards were so stunning, better than any automated app templates!",
    author: "Sneha P.",
    location: "Ahmedabad",
  },
  {
    quote: "ZWIXO created Full HD marketing posters & AI video reel ads for my food brand. Sales jumped 3X!",
    author: "Vikram R.",
    location: "Ahmedabad",
  },
  {
    quote: "Got my parents anniversary portrait restored. Superb quality and quick delivery!",
    author: "Ankit V.",
    location: "Vadodara",
  },
  {
    quote: "Amazing manual coloring on our old family portrait. It feels alive again.",
    author: "Meera K.",
    location: "Ahmedabad",
  },
  {
    quote: "Every day we received a new countdown poster on WhatsApp. The print quality is top notch.",
    author: "Rohan D.",
    location: "Mumbai",
  },
  {
    quote: "Extremely professional restoration. The cracks are gone and face details are crystal clear.",
    author: "Deepa J.",
    location: "Ahmedabad",
  },
  {
    quote: "Quick WhatsApp support, clear pricing, and no AI distortion. Meticulous hand-crafted work.",
    author: "Siddharth S.",
    location: "Bangalore",
  },
];

export interface ServicesData {
  id: string;
  iconName: "sparkles" | "heart" | "baby" | "bag";
  tagBadge: string;
  title: string;
  description: string;
  benefit: string;
  waText: string;
  gridClass: string;
}

export const SERVICES: ServicesData[] = [
  {
    id: "photo-restoration",
    iconName: "sparkles",
    tagBadge: "🎁 FREE AI Memory Video",
    title: "Photo Restoration & Memory Video",
    description: "Breathe new life into torn, faded, or damaged family photographs. Every restoration includes a 100% FREE AI Animated Memory Video.",
    benefit: "Turn cracked scans into living animated memories.",
    waText: "Hi ZWIXO, I want to restore a photo and get the FREE AI Memory Video!",
    gridClass: "bento-area-a",
  },
  {
    id: "wedding-posters",
    iconName: "heart",
    tagBadge: "💖 Celebration Hype",
    title: "Wedding Countdown Posters",
    description: "Transform raw couple portraits into elegant, customized countdown posters delivered daily on WhatsApp to build wedding excitement.",
    benefit: "Build social hype for your big wedding day.",
    waText: "Hi ZWIXO, I want to inquire about Wedding Countdown Posters!",
    gridClass: "bento-area-b",
  },
  {
    id: "baby-cards",
    iconName: "baby",
    tagBadge: "👶 Milestone Keepsakes",
    title: "Baby Milestone Cards",
    description: "Document every adorable first smile, roll, and step with bespoke milestone cards featuring your real baby photos.",
    benefit: "Preserve childhood's most precious milestones.",
    waText: "Hi ZWIXO, I want to order Baby Milestone Cards!",
    gridClass: "bento-area-c",
  },
  {
    id: "product-marketing",
    iconName: "bag",
    tagBadge: "🎁 FREE AI Reel Ads",
    title: "Product Marketing & AI Video",
    description: "Transform raw product photos into Full HD Marketing Posters & 10s AI Video Reel Ads to explode your business sales.",
    benefit: "Turn product photos into high-converting reel ads.",
    waText: "Hi ZWIXO, I want to get Product Marketing Posters & FREE AI Video Reels for my business!",
    gridClass: "bento-area-d",
  }
];
