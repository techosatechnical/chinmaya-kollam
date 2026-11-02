"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface AdItem {
  id: string | number;
  image: string;
  alt: string;
  link?: string;
}

// Add, remove, or reorder announcements/ads here
export const ADS: AdItem[] = [
  {
    id: 1,
    image: "/accolades/Class X and XII 2024-25.jpeg",
    alt: "Chinmaya Vidyalaya Class X and XII Results 2024-25",
    link: "/academics/academic-results",
  },
  {
    id: 2,
    image: "/accolades/jee main.jpeg",
    alt: "JEE Main Achievers",
    link: "/accolades",
  },
  {
    id: 3,
    image: "/accolades/sports everrolling trophy.jpeg",
    alt: "Sports Ever-Rolling Trophy Winners",
    link: "/activities/sports",
  },
];

const AUTO_PLAY_INTERVAL = 5000; // 5 seconds per ad

export function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Lock body scroll while advertisement is visible
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % ADS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? ADS.length - 1 : prev - 1));
  }, []);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play: cycles every 5 seconds, pauses when hovered
  useEffect(() => {
    if (!isOpen || isHovered || ADS.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isOpen, isHovered, handleNext]);

  // Keyboard navigation: Escape to close, Left/Right arrow keys to navigate
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext]);

  if (!isOpen || ADS.length === 0) return null;

  const currentAd = ADS[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-[2px] cursor-pointer"
            aria-hidden="true"
          />

          {/* Advertisement Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 max-w-2xl w-full bg-white rounded-lg shadow-2xl overflow-visible my-auto border-4 border-white"
            role="dialog"
            aria-modal="true"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer z-30 border-2 border-white"
              title="Close advertisement"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Counter Badge (e.g. 1 / 3) */}
            {ADS.length > 1 && (
              <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold tracking-wider select-none border border-white/20 shadow-sm">
                {currentIndex + 1} / {ADS.length}
              </div>
            )}

            {/* Previous Arrow Button */}
            {ADS.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-[#FF6A00] text-white flex items-center justify-center transition-all shadow-xl cursor-pointer z-30 border-2 border-white hover:scale-110 active:scale-95"
                title="Previous ad"
                aria-label="Previous ad"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next Arrow Button */}
            {ADS.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-[#FF6A00] text-white flex items-center justify-center transition-all shadow-xl cursor-pointer z-30 border-2 border-white hover:scale-110 active:scale-95"
                title="Next ad"
                aria-label="Next ad"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Ad Image / Flyer Slide */}
            <div className="relative w-full max-h-[82vh] overflow-hidden flex items-center justify-center bg-black/5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentAd.id}
                  initial={{ opacity: 0, x: direction * 35 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -35 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="w-full flex items-center justify-center"
                >
                  {currentAd.link ? (
                    <Link
                      href={currentAd.link}
                      onClick={() => setIsOpen(false)}
                      className="block w-full h-full cursor-pointer"
                      title={currentAd.alt}
                    >
                      <img
                        src={currentAd.image}
                        alt={currentAd.alt}
                        className="w-full max-h-[82vh] object-contain block select-none"
                      />
                    </Link>
                  ) : (
                    <img
                      src={currentAd.image}
                      alt={currentAd.alt}
                      className="w-full max-h-[82vh] object-contain block select-none"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots */}
            {ADS.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xs border border-white/20 shadow-md">
                {ADS.map((ad, idx) => (
                  <button
                    key={ad.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDotClick(idx);
                    }}
                    aria-label={`Go to ad ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === currentIndex
                        ? "w-6 h-2 bg-[#FF6A00]"
                        : "w-2 h-2 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
