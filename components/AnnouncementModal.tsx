"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { AnnouncementItem } from "@/lib/types/school";

const AUTO_PLAY_INTERVAL = 5000;

interface AnnouncementModalProps {
  ads?: AnnouncementItem[];
}

export function AnnouncementModal({ ads = [] }: AnnouncementModalProps) {
  const validAds = ads.filter((a) => a.kind === "modal" && a.image);
  const [isOpen, setIsOpen] = useState(validAds.length > 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

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
    if (validAds.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % validAds.length);
  }, [validAds.length]);

  const handlePrev = useCallback(() => {
    if (validAds.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? validAds.length - 1 : prev - 1));
  }, [validAds.length]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isOpen || isHovered || validAds.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isOpen, isHovered, validAds.length, handleNext]);

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

  if (!isOpen || validAds.length === 0) return null;

  const currentAd = validAds[currentIndex % validAds.length]!;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-[2px] cursor-pointer"
            aria-hidden="true"
          />

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
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer z-30 border-2 border-white"
              title="Close advertisement"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {validAds.length > 1 && (
              <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-[11px] font-bold tracking-wider select-none border border-white/20 shadow-sm">
                {currentIndex + 1} / {validAds.length}
              </div>
            )}

            {validAds.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-accent text-white flex items-center justify-center transition-all shadow-xl cursor-pointer z-30 border-2 border-white hover:scale-110 active:scale-95"
                title="Previous ad"
                aria-label="Previous ad"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {validAds.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-accent text-white flex items-center justify-center transition-all shadow-xl cursor-pointer z-30 border-2 border-white hover:scale-110 active:scale-95"
                title="Next ad"
                aria-label="Next ad"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

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
                      title={currentAd.alt || currentAd.title}
                    >
                      <img
                        src={currentAd.image}
                        alt={currentAd.alt || currentAd.title}
                        className="w-full max-h-[82vh] object-contain block select-none"
                      />
                    </Link>
                  ) : (
                    <img
                      src={currentAd.image}
                      alt={currentAd.alt || currentAd.title}
                      className="w-full max-h-[82vh] object-contain block select-none"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {validAds.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xs border border-white/20 shadow-md">
                {validAds.map((ad, idx) => (
                  <button
                    key={ad.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDotClick(idx);
                    }}
                    aria-label={`Go to ad ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === currentIndex
                        ? "w-6 h-2 bg-accent"
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
