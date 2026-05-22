"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HomeClient({ hero, services, machinery }: { hero: any, services: any, machinery: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Reveal
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".hero-bg",
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power4.out" }
    ).fromTo(
      ".hero-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" },
      "-=1"
    );

    // Scroll Reveals
    const sections = gsap.utils.toArray(".bento-item");
    sections.forEach((sec: any) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
      
      const content = sec.querySelectorAll(".bento-content");
      if (content.length) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Parallax on images
    const images = gsap.utils.toArray(".parallax-img");
    images.forEach((img: any) => {
      gsap.to(img, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

  }, { scope: containerRef });

  const ACCENT_COLORS = [
    "hover:bg-[var(--color-print-cyan)] hover:border-[var(--color-print-cyan)]",
    "hover:bg-[var(--color-print-magenta)] hover:border-[var(--color-print-magenta)]",
    "hover:bg-[var(--color-print-yellow)] hover:border-[var(--color-print-yellow)] text-black"
  ];

  const BUTTON_HOVERS = [
    "hover:bg-[var(--color-print-cyan)] hover:border-[var(--color-print-cyan)] hover:text-white",
    "hover:bg-[var(--color-print-magenta)] hover:border-[var(--color-print-magenta)] hover:text-white",
    "hover:bg-[var(--color-print-yellow)] hover:border-[var(--color-print-yellow)] hover:text-black",
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black p-2 md:p-6 lg:p-8">
      {/* Container - Rigid Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 md:gap-6 lg:gap-8 max-w-[1800px] mx-auto">
        
        {/* HEADER */}
        <header className="bento-item col-span-1 md:col-span-2 xl:col-span-12 border-2 border-black p-6 md:p-8 flex justify-between items-center rounded-none bg-white">
          <h1 className="bento-content text-2xl md:text-5xl font-bold uppercase tracking-tighter">
            Aurora Fine Arts
          </h1>
          <nav className="hidden lg:block bento-content">
            <ul className="flex gap-8 text-xl font-bold uppercase tracking-wide">
              <li className="hover:text-[var(--color-print-cyan)] transition-colors cursor-pointer">Services</li>
              <li className="hover:text-[var(--color-print-magenta)] transition-colors cursor-pointer">Machinery</li>
              <li className="hover:text-[var(--color-print-yellow)] transition-colors cursor-pointer">Contact</li>
            </ul>
          </nav>
        </header>

        {/* HERO SECTION */}
        <section className="col-span-1 md:col-span-2 xl:col-span-12 border-2 border-black p-6 md:p-16 min-h-[50vh] md:min-h-[70vh] flex flex-col justify-end rounded-none relative overflow-hidden group">
          <div className="absolute inset-0 z-0 hero-bg overflow-hidden bg-neutral-100">
             <img 
              src={hero.backgroundMediaUrl} 
              alt="Hero Background" 
              className="parallax-img w-full h-[120%] object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 absolute -top-[10%]" 
            />
          </div>
          <div className="relative z-10 max-w-4xl bg-white/90 p-6 md:p-10 border-2 border-black">
            <h2 className="hero-text text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-4 md:mb-6">
              {hero.headline}
            </h2>
            <p className="hero-text text-lg md:text-2xl lg:text-3xl font-medium max-w-2xl mb-8">
              {hero.subheadline}
            </p>
            <div className="hero-text">
              <MagneticButton className="hover:bg-black hover:text-white">Get an Instant Quote</MagneticButton>
            </div>
          </div>
        </section>

        {/* SERVICES LIST */}
        {services.map((service: any, index: number) => {
           const colorClass = ACCENT_COLORS[index % ACCENT_COLORS.length];
           const btnHover = BUTTON_HOVERS[index % BUTTON_HOVERS.length];
           return (
            <div key={service._id || index} className={`bento-item col-span-1 md:col-span-1 xl:col-span-4 border-2 border-black p-6 md:p-10 rounded-none flex flex-col justify-between min-h-[350px] md:min-h-[450px] transition-colors duration-300 relative group overflow-hidden ${colorClass}`}>
               <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 overflow-hidden">
                  {service.hoverImageUrl && (
                    <img src={service.hoverImageUrl} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  )}
               </div>
               <div className="relative z-10 flex justify-between items-start mb-8 md:mb-16">
                 <h3 className="bento-content text-2xl md:text-3xl lg:text-4xl font-bold uppercase w-2/3 leading-tight group-hover:text-white transition-colors duration-300">
                   {service.title}
                 </h3>
                 <span className="bento-content text-lg md:text-xl font-bold border-2 border-current px-2 py-1 group-hover:text-white transition-colors duration-300">
                   {service.icon || `0${index + 1}`}
                 </span>
               </div>
               <div className="relative z-10">
                 <p className="bento-content text-base md:text-lg lg:text-xl font-medium mb-6 group-hover:text-white transition-colors duration-300">
                   {service.description}
                 </p>
                 <div className="bento-content">
                   <MagneticButton className={`!border-black bg-white text-black ${btnHover}`}>
                     View Specs
                   </MagneticButton>
                 </div>
               </div>
            </div>
           );
        })}

        {/* MACHINERY SECTION */}
        <section className="bento-item col-span-1 md:col-span-2 xl:col-span-12 border-2 border-black rounded-none">
          <div className="p-6 md:p-10 border-b-2 border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h2 className="bento-content text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
              Industrial Capacity
            </h2>
            <MagneticButton className="bento-content hover:bg-black hover:text-white shrink-0">
              Explore Machinery
            </MagneticButton>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2">
            {machinery.map((mach: any, index: number) => (
              <div key={mach._id || index} className={`p-6 md:p-10 flex flex-col justify-between min-h-[400px] md:min-h-[500px] relative overflow-hidden group ${index % 2 === 0 ? 'xl:border-r-2 xl:border-black border-b-2 xl:border-b-0 border-black' : ''}`}>
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img 
                    src={mach.placeholderImageUrl} 
                    alt={mach.pressName} 
                    className="parallax-img w-full h-[120%] object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 absolute -top-[10%]" 
                  />
                </div>
                <div className="relative z-10 bg-white border-2 border-black p-4 md:p-6 self-start max-w-full">
                  <h3 className="bento-content text-xl md:text-3xl lg:text-4xl font-black uppercase mb-2">
                    {mach.pressName}
                  </h3>
                  <p className="bento-content text-lg md:text-xl font-bold mb-4">{mach.capacity}</p>
                  <ul className="bento-content flex flex-wrap gap-2">
                    {mach.technicalSpecs?.map((spec: string, i: number) => (
                      <li key={i} className="text-xs md:text-sm font-bold border border-black px-2 py-1 uppercase bg-white">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bento-item col-span-1 md:col-span-2 xl:col-span-12 border-2 border-black p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-4 rounded-none bg-black text-white">
          <p className="bento-content text-lg md:text-xl font-bold uppercase tracking-wider text-center md:text-left">
            &copy; 2026 Aurora Fine Arts
          </p>
          <MagneticButton className="bento-content !border-white bg-black text-white hover:bg-white hover:text-black">
            Contact Us
          </MagneticButton>
          <p className="bento-content text-lg md:text-xl font-bold uppercase tracking-wider text-center md:text-right">
            Since 1991
          </p>
        </footer>

      </div>
    </div>
  );
}
