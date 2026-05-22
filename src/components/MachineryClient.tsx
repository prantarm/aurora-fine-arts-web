"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MachineryClient({ machinery }: { machinery: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Flowing Paper Animation
    const papers = gsap.utils.toArray(".paper-sheet");
    papers.forEach((paper: any, i: number) => {
      gsap.fromTo(
        paper,
        {
          x: "100vw",
          y: "-50vh",
          rotation: 15 + i * 5,
        },
        {
          x: "-100vw",
          y: "150vh",
          rotation: -15 - i * 5,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5 + (i * 0.2), // Different scrub speeds for parallax
          },
        }
      );
    });

    // Mechanical Lock Animation for cards
    const cards = gsap.utils.toArray(".machine-card");
    cards.forEach((card: any, i: number) => {
      // Alternating sides
      const xOffset = i % 2 === 0 ? -150 : 150;
      gsap.fromTo(
        card,
        {
          x: xOffset,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)", // Mechanical snap feel
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
      
      const img = card.querySelector(".machine-img");
      if (img) {
        gsap.to(img, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white p-2 md:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Background Flowing Papers */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="paper-sheet absolute w-[300px] md:w-[600px] h-[400px] md:h-[800px] bg-white opacity-10 border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            style={{
               top: `${Math.random() * 20}%`,
               right: `${Math.random() * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Container - Rigid Bento Grid */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6 lg:gap-8 max-w-[1800px] mx-auto">
        
        {/* HEADER */}
        <header className="col-span-1 xl:col-span-12 border-2 border-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-none bg-black">
          <div>
            <Link href="/" className="hover:opacity-70 transition-opacity">
              <h1 className="text-xl md:text-3xl font-bold uppercase tracking-tighter text-white">
                Aurora Fine Arts
              </h1>
            </Link>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Industrial Capacity
          </h2>
          <Link href="/quote">
            <MagneticButton className="!border-white bg-black text-white hover:bg-white hover:text-black">
              Get an Instant Quote
            </MagneticButton>
          </Link>
        </header>

        {/* MACHINERY LIST */}
        <div className="col-span-1 xl:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {machinery.map((mach: any, index: number) => {
             // Accent colors for variety
             const accents = [
               "hover:border-[var(--color-print-cyan)]",
               "hover:border-[var(--color-print-magenta)]",
               "hover:border-[var(--color-print-yellow)]",
               "hover:border-white"
             ];
             const accent = accents[index % accents.length];

             return (
              <div key={mach._id || index} className={`machine-card p-6 md:p-10 flex flex-col justify-between min-h-[500px] relative overflow-hidden group border-2 border-white bg-black ${accent} transition-colors duration-300`}>
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    src={mach.placeholderImageUrl} 
                    alt={mach.pressName} 
                    className="machine-img w-full h-[120%] object-cover grayscale opacity-40 group-hover:opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 absolute -top-[10%]" 
                  />
                </div>
                <div className="relative z-10 bg-black/80 backdrop-blur-sm border-2 border-white p-4 md:p-6 self-start max-w-full">
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase mb-2">
                    {mach.pressName}
                  </h3>
                  <p className="text-xl font-bold mb-4 text-[var(--color-print-cyan)]">{mach.capacity}</p>
                  <ul className="flex flex-wrap gap-2">
                    {mach.technicalSpecs?.map((spec: string, i: number) => (
                      <li key={i} className="text-xs md:text-sm font-bold border border-white px-2 py-1 uppercase bg-transparent text-white">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative z-10 self-end mt-12">
                   <Link href="/quote">
                     <MagneticButton className="!border-white bg-black text-white hover:bg-white hover:text-black">
                       Calculate Your Job
                     </MagneticButton>
                   </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
