"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

export default function MaintenanceClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animations for titles
    gsap.fromTo(
      ".reveal-text",
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 50 },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" }
    );

    // Continuous CMYK color-shifting wave on UNDER MAINTENANCE
    gsap.to(".maintenance-text", {
      keyframes: [
        { color: "var(--color-print-cyan)", duration: 2 },
        { color: "var(--color-print-magenta)", duration: 2 },
        { color: "var(--color-print-yellow)", duration: 2 },
        { color: "#000000", duration: 2 }
      ],
      repeat: -1,
      ease: "none"
    });
    
    // Bento box fade in
    gsap.fromTo(
      ".bento-box",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.8, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black p-4 md:p-8 flex flex-col justify-between overflow-hidden">
      
      {/* Header Bento */}
      <header className="border-2 border-black p-6 md:p-8 bg-white mb-8 max-w-[1200px] mx-auto w-full reveal-text">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
          Aurora Fine Arts
        </h1>
        <p className="text-lg md:text-2xl font-bold uppercase mt-2 text-neutral-500">
          Here for all your printing needs.
        </p>
      </header>

      {/* Main Status Text */}
      <main className="flex-1 flex items-center justify-center border-2 border-black max-w-[1200px] mx-auto w-full p-4 overflow-hidden mb-8 bg-neutral-50">
        <h2 className="maintenance-text text-[12vw] md:text-[10vw] font-black uppercase tracking-tighter text-center leading-none select-none">
          Under<br/>Maintenance
        </h2>
      </main>

      {/* Contact Bento */}
      <footer className="bento-box border-2 border-black p-8 md:p-12 max-w-[1200px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8 bg-white">
        <div className="flex-1">
          <h3 className="text-2xl font-bold uppercase mb-2">Contact Us</h3>
          <p className="text-lg font-medium text-neutral-600 uppercase">
            We are upgrading our systems. Please reach out directly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <a href="mailto:aurorafinearts14@gmail.com" className="w-full sm:w-auto">
            <MagneticButton className="w-full hover:bg-[var(--color-print-cyan)]">
              aurorafinearts14@gmail.com
            </MagneticButton>
          </a>
          <a href="tel:+917002034353" className="w-full sm:w-auto">
            <MagneticButton className="w-full hover:bg-[var(--color-print-magenta)]">
              +91 70020 34353
            </MagneticButton>
          </a>
        </div>
      </footer>
      
    </div>
  );
}
