"use client";

export function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-150 overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/chinmayaVidyalaya kollam.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle Overlay to make the navbar pop and add depth */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  );
}
