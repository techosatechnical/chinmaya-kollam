"use client";

import type { SchoolConfig } from "@/lib/types/school";

interface HeroProps {
  hero: SchoolConfig["hero"];
  schoolName: string;
}

export function Hero({ hero, schoolName }: HeroProps) {
  return (
    <section className="relative w-full h-[85vh] min-h-150 overflow-hidden bg-black">
      {hero.mediaType === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={hero.posterUrl}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={hero.mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={hero.mediaUrl}
          alt={schoolName}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: hero.overlayOpacity ?? 0.1 }}
      />
    </section>
  );
}
