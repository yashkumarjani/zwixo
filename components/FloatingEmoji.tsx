// FILE: components/FloatingEmoji.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { m, useScroll, useTransform, useMotionValueEvent, useReducedMotion, AnimatePresence } from "framer-motion";
import CartoonFace from "./CartoonFace";
import { X } from "lucide-react";

// Pricing details map matching project constants with dynamic WhatsApp query generators
const SERVICE_DETAILS = {
  restoration: {
    title: "Photo Restoration",
    emoji: "🖼️",
    desc: "Breathe new life into torn, faded, or damaged vintage photographs. We professionally restore them into clean, high-definition art with manual detailing.",
    pricing: [
      { id: "standard", name: "Standard Restore", price: "₹499", detail: "Mild scratch removal & contrast enhancement" },
      { id: "premium", name: "Premium Restore", price: "₹699", detail: "Heavy scratch repair & face detail recovery" },
      { id: "heavy", name: "Heavy Restore", price: "₹999", detail: "Complete face reconstruction & manual coloring" },
    ],
    defaultSelected: "premium",
    delivery: "Delivered within 24 hours",
    whatsappText: (tierName: string, tierPrice: string) => `Hi Zwixo! I want to order the ${tierName} (${tierPrice}) package for Photo Restoration. Please guide me on how to send the photo.`,
    ctaLabel: "Order Restoration via WhatsApp",
  },
  wedding: {
    title: "Wedding Countdown",
    emoji: "💑",
    desc: "Transform raw couple portraits into elegant, customized countdown posters delivered daily to keep up the excitement for your wedding.",
    pricing: [
      { id: "5days", name: "5 Days Countdown", price: "₹2,499", detail: "5 daily personalized countdown posters" },
      { id: "10days", name: "10 Days Countdown", price: "₹3,999", detail: "10 daily personalized countdown posters (Popular)" },
      { id: "15days", name: "15 Days Countdown", price: "₹5,999", detail: "15 daily personalized countdown posters" },
    ],
    defaultSelected: "10days",
    delivery: "Delivered daily on WhatsApp",
    whatsappText: (tierName: string, tierPrice: string) => `Hi Zwixo! I want to order the ${tierName} (${tierPrice}) package for Wedding Countdown. Please share details.`,
    ctaLabel: "Order Countdown via WhatsApp",
  },
  baby: {
    title: "Baby Milestones",
    emoji: "👶",
    desc: "Document every precious milestone (first smile, roll, step) with bespoke milestone cards designed featuring your real baby photos (no generic templates).",
    pricing: [
      { id: "3cards", name: "3 Cards Pack", price: "₹1,299", detail: "3 unique milestone designs" },
      { id: "6cards", name: "6 Cards Pack", price: "₹1,999", detail: "6 unique milestone designs (Popular)" },
      { id: "12cards", name: "12 Cards Pack", price: "₹2,999", detail: "12 unique milestone designs" },
    ],
    defaultSelected: "6cards",
    delivery: "Delivered within 48 hours",
    whatsappText: (tierName: string, tierPrice: string) => `Hi Zwixo! I'd love to order custom Baby Milestone cards - the ${tierName} (${tierPrice}) package. Please guide me.`,
    ctaLabel: "Order Milestone Cards on WhatsApp",
  },
  custom: {
    title: "Custom Order / Chat",
    emoji: "💬",
    desc: "Have a unique design request or general questions? Yash & Gautami are here to design custom celebration packages tailored exactly to your ideas.",
    pricing: [
      { id: "custom", name: "Custom Project", price: "Flexible", detail: "Pricing based on your requirements" }
    ],
    defaultSelected: "custom",
    delivery: "Timeline depends on request",
    whatsappText: () => `Hi Zwixo! I have a custom design request and would love to chat with Yash & Gautami.`,
    ctaLabel: "Chat with Yash & Gautami",
  },
};

const CHAT_OPTIONS = [
  {
    label: "Restore an old photo",
    emoji: "🖼️",
    serviceKey: "restoration" as const,
  },
  {
    label: "Wedding Countdown Poster",
    emoji: "💑",
    serviceKey: "wedding" as const,
  },
  {
    label: "Baby Milestone Cards",
    emoji: "👶",
    serviceKey: "baby" as const,
  },
  {
    label: "Custom Order / Chat",
    emoji: "💬",
    serviceKey: "custom" as const,
  },
];

export default function FloatingEmoji() {
  const { scrollYProgress } = useScroll();
  const [faceState, setFaceState] = useState<"neutral" | "happy" | "grin" | "celebrate">("neutral");
  const [message, setMessage] = useState("Questions? Ask me! 💬");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const chatRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  // Smooth drift path in viewport coordinates to float in empty side margins
  const y = useTransform(scrollYProgress, [0, 1], ["20vh", "80vh"]);
  const x = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], ["0px", "-16px", "8px", "0px"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isChatOpen) return; // Keep face happy/grin if chat is open
    if (latest < 0.25) {
      setFaceState("neutral");
      setMessage("Questions? Ask me! 💬");
    } else if (latest < 0.55) {
      setFaceState("happy");
      setMessage("Need prices? Click me! 🖼️");
    } else if (latest < 0.85) {
      setFaceState("grin");
      setMessage("How it works? Click! 🙋‍♂️");
    } else {
      setFaceState("celebrate");
      setMessage("Order now? Let's chat! 📲");
    }
  });

  const handleMascotClick = () => {
    setHasInteracted(true);
    setIsChatOpen(prev => !prev);
    if (!isChatOpen) {
      setFaceState("grin");
    }
  };

  // Close chat when clicking outside chatRef and mascotRef (Modeless click-outside)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const clickedChat = chatRef.current && chatRef.current.contains(event.target as Node);
      const clickedMascot = mascotRef.current && mascotRef.current.contains(event.target as Node);

      if (!clickedChat && !clickedMascot) {
        setIsChatOpen(false);
      }
    };

    if (isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isChatOpen]);

  return (
    <>
      {/* Visual CSS Injector for Slow Pulse and Chat Scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-chat-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-chat-scroll::-webkit-scrollbar-thumb {
          background: #e5e5e7;
          border-radius: 10px;
        }
        .dark .custom-chat-scroll::-webkit-scrollbar-thumb {
          background: #2c2c2e;
        }
        @keyframes slow-ping {
          0% {
            transform: scale(1);
            opacity: 0.35;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        .animate-slow-ping {
          animation: slow-ping 3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}} />

      {/* Floating Mascot Button wrapper inside AnimatePresence to prevent overlap with chat */}
      <AnimatePresence>
        {!isChatOpen && (
          <m.div
            ref={mascotRef}
            key="mascot-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            style={{
              y: shouldReduceMotion ? "50vh" : y,
              x: shouldReduceMotion ? "0px" : x,
              rotate: shouldReduceMotion ? 0 : rotate,
              position: "fixed",
              top: 0,
            }}
            // Aligned precisely to the same right margins as the Chat Window
            className="fixed right-4 md:right-8 lg:right-12 z-40 flex pointer-events-auto select-none"
          >
            <button 
              onMouseEnter={() => {
                setHasInteracted(true);
                if (!isChatOpen) setFaceState("happy");
              }}
              onClick={handleMascotClick}
              role="button"
              aria-label="Open chat assistant"
              aria-haspopup="dialog"
              tabIndex={0}
              className="relative group cursor-pointer flex items-center justify-center w-9 h-9 bg-transparent hover:scale-110 active:scale-95 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 after:absolute after:-inset-2 after:content-['']"
            >
              {/* 1. Pulsing squircle ring animation matching the logo shape */}
              <div className="absolute inset-0 rounded-[9px] border border-[#F5A623] animate-slow-ping pointer-events-none" />

              {/* 2. Active status online dot indicator aligned to the squircle corner */}
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-[#1C1C1E] rounded-full animate-pulse z-10 translate-x-1/4 -translate-y-1/4" />

              {/* Branded Cartoon Mascot - size w-9 h-9 matching the main website header logo */}
              <div className="w-9 h-9 flex items-center justify-center filter drop-shadow-lg select-none">
                <CartoonFace state={faceState} />
              </div>

              {/* Message Bubble Popover - Shown only when chat is closed */}
              <m.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 0.9, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute bottom-full mb-2.5 right-0 bg-white dark:bg-ink border border-gray-200/50 dark:border-gray-800 text-ink dark:text-white text-[9px] font-black uppercase tracking-widest px-3.5 py-2 rounded-2xl shadow-xl transition-all duration-300 whitespace-nowrap ${
                  hasInteracted ? "opacity-0 group-hover:opacity-100" : "opacity-90 group-hover:opacity-100"
                }`}
              >
                {message}
                {/* Speech Indicator Triangle centered perfectly on the 36px (w-9) button width */}
                <div className="absolute bottom-[-4px] right-[14px] w-2 h-2 rotate-45 bg-white dark:bg-ink border-b border-r border-gray-200/50 dark:border-gray-800" />
              </m.div>
            </button>
          </m.div>
        )}
      </AnimatePresence>

      {/* WhatsApp-smart Interactive Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <ChatWindow chatRef={chatRef} onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

interface ChatWindowProps {
  chatRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

function ChatWindow({ chatRef, onClose }: ChatWindowProps) {
  // Conversational view toggle state
  const [view, setView] = useState<"menu" | "detail">("menu");
  const [selectedService, setSelectedService] = useState<keyof typeof SERVICE_DETAILS | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isDetailTyping, setIsDetailTyping] = useState(false);
  const [showDetailContent, setShowDetailContent] = useState(false);

  // Initial Menu Load sequence states
  const [showMsg1, setShowMsg1] = useState(false);
  const [showMsg2, setShowMsg2] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isMenuTyping, setIsMenuTyping] = useState(true);

  const detailTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Menu progressive typing delays
    const t1 = setTimeout(() => {
      setShowMsg1(true);
    }, 450);

    const t2 = setTimeout(() => {
      setShowMsg2(true);
      setIsMenuTyping(false);
    }, 1100);

    const t3 = setTimeout(() => {
      setShowOptions(true);
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (detailTimeoutRef.current) clearTimeout(detailTimeoutRef.current);
    };
  }, []);

  const handleSelectService = (serviceKey: keyof typeof SERVICE_DETAILS) => {
    setSelectedService(serviceKey);
    setView("detail");
    setIsDetailTyping(true);
    setShowDetailContent(false);
    
    // Auto-select the default popular package on launch
    setSelectedTier(SERVICE_DETAILS[serviceKey].defaultSelected);

    if (detailTimeoutRef.current) {
      clearTimeout(detailTimeoutRef.current);
    }

    detailTimeoutRef.current = setTimeout(() => {
      setIsDetailTyping(false);
      setShowDetailContent(true);
    }, 550);
  };

  const handleBackToMenu = () => {
    setView("menu");
    setSelectedService(null);
    setSelectedTier(null);
  };

  return (
    <m.div
      ref={chatRef}
      role="dialog"
      aria-label="Zwixo Chat Assistant"
      aria-modal="false"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      // Fluid width on small mobile viewport, aligned perfectly to the mascot right margins on larger viewports. Max-height set to 70vh for landscape safety.
      className="fixed bottom-20 left-4 right-4 xs:left-auto xs:right-6 xs:w-[340px] sm:left-auto sm:right-6 sm:w-[340px] md:bottom-24 md:left-auto md:right-8 md:w-[340px] lg:left-auto lg:right-12 lg:w-[340px] z-50 flex flex-col overflow-hidden rounded-[24px] border border-neutral-200/60 dark:border-neutral-800/70 bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-xl shadow-2xl transition-colors duration-300 max-h-[70vh]"
    >
      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#F5A623] to-[#D48C1B] px-4.5 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center relative">
            <div className="w-6 h-6 flex items-center justify-center">
              <CartoonFace state="neutral" />
            </div>
            {/* Active dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-[#F5A623]" />
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider leading-none">Zwixo Helper</h3>
            <span className="text-[10px] text-white/80 font-medium">Online • Responds in 2 min</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close Chat"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4.5 space-y-3.5 overflow-y-auto custom-chat-scroll min-h-[200px]">
        {/* VIEW 1: Main Menu Options */}
        {view === "menu" && (
          <>
            {/* Message 1 */}
            {showMsg1 && (
              <m.div 
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex flex-col items-start"
              >
                <div className="px-4 py-2.5 rounded-[18px] rounded-tl-[4px] bg-neutral-100 dark:bg-neutral-900 text-xs text-ink dark:text-neutral-200 max-w-[85%] leading-relaxed">
                  Hey there! 👋 Yash & Gautami here from **ZWIXO**.
                </div>
              </m.div>
            )}

            {/* Message 2 */}
            {showMsg2 && (
              <m.div 
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex flex-col items-start"
              >
                <div className="px-4 py-2.5 rounded-[18px] rounded-tl-[4px] bg-neutral-100 dark:bg-neutral-900 text-xs text-ink dark:text-neutral-200 max-w-[85%] leading-relaxed">
                  We design premium milestone cards, wedding countdown posters, and restore old family photos. Select a service to see details and pricing!
                </div>
              </m.div>
            )}

            {/* Typing Indicator for Initial Load */}
            {isMenuTyping && (
              <div className="flex items-center gap-1.5 px-4 py-3 bg-neutral-100 dark:bg-neutral-900 rounded-[18px] rounded-tl-[4px] w-fit">
                <span className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            )}

            {/* Option Pills */}
            {showOptions && (
              <m.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-2 space-y-2"
              >
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-500 block mb-1">Select an option:</span>
                <div className="flex flex-col gap-2">
                  {CHAT_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelectService(opt.serviceKey)}
                      className="w-full text-left px-4 py-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/80 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:border-[#F5A623] hover:text-[#F5A623] active:scale-[0.98] transition-all duration-200 flex items-center justify-between group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{opt.emoji}</span>
                        <span>{opt.label}</span>
                      </span>
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-600 group-hover:text-[#F5A623] transition-colors font-bold uppercase tracking-widest flex items-center gap-0.5">
                        Details <span className="transform translate-x-0 group-hover:translate-x-0.5 transition-transform">→</span>
                      </span>
                    </button>
                  ))}
                </div>
              </m.div>
            )}
          </>
        )}

        {/* VIEW 2: Service Details and Direct Ordering */}
        {view === "detail" && selectedService && (
          <div className="space-y-3.5">
            {/* User query bubble mock */}
            <div className="flex flex-col items-end">
              <div className="px-4 py-2.5 rounded-[18px] rounded-tr-[4px] bg-[#F5A623] text-white text-xs font-semibold max-w-[85%]">
                {SERVICE_DETAILS[selectedService].emoji} Tell me about {SERVICE_DETAILS[selectedService].title}
              </div>
            </div>

            {/* Typing Indicator for Detail Load */}
            {isDetailTyping && (
              <div className="flex items-center gap-1.5 px-4 py-3 bg-neutral-100 dark:bg-neutral-900 rounded-[18px] rounded-tl-[4px] w-fit">
                <span className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            )}

            {/* Detail Content Output */}
            {showDetailContent && (
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {/* AI Detail Bubble */}
                <div className="px-4 py-3 rounded-[18px] rounded-tl-[4px] bg-neutral-100 dark:bg-neutral-900 text-xs text-ink dark:text-neutral-200 leading-relaxed space-y-2.5">
                  <p className="font-medium">{SERVICE_DETAILS[selectedService].desc}</p>
                  
                  {/* Interactive Pricing Tiers list */}
                  <div className="pt-2.5 border-t border-neutral-200/50 dark:border-neutral-800/50 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 dark:text-neutral-500 block mb-1">Select a Package:</span>
                    {SERVICE_DETAILS[selectedService].pricing.map((tier) => {
                      const isSelected = selectedTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          onClick={() => setSelectedTier(tier.id)}
                          className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between text-[11px] leading-tight transition-all duration-200 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#F5A623] ${
                            isSelected
                              ? "bg-[#F5A623]/10 border-[#F5A623] text-[#F5A623]"
                              : "bg-white dark:bg-[#1C1C1E] border-neutral-200/40 dark:border-neutral-800/40 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700"
                          }`}
                        >
                          <div>
                            <span className={`font-bold block ${isSelected ? "text-[#F5A623]" : "text-ink dark:text-white"}`}>
                              {tier.name}
                            </span>
                            <span className="text-[10px] text-neutral-400 dark:text-neutral-500">{tier.detail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`font-black ${isSelected ? "text-[#F5A623]" : "text-neutral-900 dark:text-white"}`}>{tier.price}</span>
                            {/* Visual Check Indicator */}
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? "border-[#F5A623]" : "border-neutral-300 dark:border-neutral-700"
                            }`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block italic pt-1">
                    🕒 {SERVICE_DETAILS[selectedService].delivery}
                  </span>
                </div>

                {/* Direct Action Buttons with dynamic WhatsApp prefilled parameters */}
                {(() => {
                  const currentTier = SERVICE_DETAILS[selectedService].pricing.find(t => t.id === selectedTier) || SERVICE_DETAILS[selectedService].pricing[0];
                  const whatsappMsg = SERVICE_DETAILS[selectedService].whatsappText(currentTier.name, currentTier.price);
                  
                  return (
                    <div className="pt-1.5 space-y-2">
                      <a
                        href={`https://wa.me/918320870517?text=${encodeURIComponent(whatsappMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center px-4 py-3 rounded-xl bg-[#F5A623] hover:bg-amber-500 active:scale-[0.98] transition-all text-xs font-black text-white shadow-md flex items-center justify-center gap-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
                      >
                        <span>{SERVICE_DETAILS[selectedService].ctaLabel} →</span>
                      </a>

                      <button
                        onClick={handleBackToMenu}
                        className="w-full text-center px-4 py-2.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/70 bg-white/50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-[0.98] transition-all text-xs font-bold text-neutral-500 dark:text-neutral-400 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
                      >
                        ← Back to main options
                      </button>
                    </div>
                  );
                })()}
              </m.div>
            )}
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="bg-neutral-50 dark:bg-[#151517] px-4.5 py-3 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 text-green-500 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.008 14.068.99 11.455.99c-5.443 0-9.865 4.369-9.87 9.8-.001 1.732.457 3.42 1.32 4.922l-.995 3.635 3.737-.993zM16.58 13.91c-.326-.162-1.927-.946-2.223-1.053-.297-.108-.513-.162-.73.162-.216.324-.838 1.053-1.027 1.269-.19.215-.38.243-.705.081-.325-.162-1.373-.503-2.615-1.608-.967-.86-1.618-1.923-1.808-2.248-.19-.324-.02-.5-.182-.661-.147-.146-.325-.378-.487-.567-.162-.189-.216-.324-.325-.54-.108-.216-.054-.405-.027-.567.027-.162.216-.513.325-.675.108-.162.144-.27.216-.405.072-.135.036-.253-.018-.405-.054-.153-.513-1.22-.703-1.67-.184-.443-.37-.383-.513-.39-.13-.006-.28-.007-.43-.007-.15 0-.395.056-.602.28-.207.224-.79.77-.79 1.88 0 1.11.81 2.183.92 2.336.11.153 1.594 2.41 3.86 3.39.54.233.96.37 1.288.473.542.172 1.036.148 1.426.09.435-.064 1.332-.54 1.52-.1.189-.513.189-.953.136-1.037-.053-.083-.199-.135-.526-.297z" />
          </svg>
          Direct to WhatsApp
        </span>
        <span>48h Free Delivery</span>
      </div>
    </m.div>
  );
}
