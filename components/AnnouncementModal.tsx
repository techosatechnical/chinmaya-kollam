"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

/**
 * Configure your Advertisement here.
 * Set image path and optional link when someone clicks the advertisement.
 */
const AD_IMAGE = "/accolades/Class X and XII 2024-25.jpeg";
const AD_ALT = "Chinmaya Vidyalaya Kollam Advertisement";
const AD_LINK = "/academics/academic-results"; // set to "" or null if not clickable

export function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(true);

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

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

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
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer z-20 border-2 border-white"
              title="Close advertisement"
              aria-label="Close"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Ad Image / Flyer */}
            <div className="relative w-full max-h-[82vh] overflow-hidden flex items-center justify-center bg-black/5">
              {AD_LINK ? (
                <Link
                  href={AD_LINK}
                  onClick={() => setIsOpen(false)}
                  className="block w-full h-full cursor-pointer"
                >
                  <img
                    src={AD_IMAGE}
                    alt={AD_ALT}
                    className="w-full max-h-[82vh] object-contain block select-none"
                  />
                </Link>
              ) : (
                <img
                  src={AD_IMAGE}
                  alt={AD_ALT}
                  className="w-full max-h-[82vh] object-contain block select-none"
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
