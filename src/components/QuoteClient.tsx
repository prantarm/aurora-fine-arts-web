"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import { Button } from "./ui/Button";
import { submitQuoteRequest } from "@/app/actions/submitQuote";
import Link from "next/link";

export default function QuoteClient() {
  const [step, setStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [product, setProduct] = useState("");
  const [dimensions, setDimensions] = useState("Standard A4");
  const [gsm, setGsm] = useState("150gsm");
  const [colorMode, setColorMode] = useState("Full Color (CMYK)");
  const [quantity, setQuantity] = useState(1000);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Animation hook
  const { contextSafe } = useGSAP({ scope: containerRef });

  const slideToNextStep = contextSafe((nextStep: number) => {
    const currentEl = document.querySelector(`.step-${step}`);
    const nextEl = document.querySelector(`.step-${nextStep}`);
    
    gsap.to(currentEl, {
      x: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        setStep(nextStep);
      }
    });
  });

  // Effect to animate the next step in once state changes
  useGSAP(() => {
    const el = document.querySelector(`.step-${step}`);
    if (el) {
      gsap.fromTo(el, 
        { x: "100%", opacity: 0 }, 
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
    
    // If it's step 4 (Result), trigger dramatic reveal
    if (step === 4) {
      gsap.fromTo(".quote-amount", 
        { scale: 0.5, opacity: 0, rotationX: 90 },
        { scale: 1, opacity: 1, rotationX: 0, duration: 1.2, ease: "elastic.out(1, 0.4)", delay: 0.3 }
      );
    }
  }, [step]);

  const handleProductSelect = (selected: string) => {
    setProduct(selected);
    slideToNextStep(2);
  };

  const calculateQuote = () => {
    const base = 250; // Setup fee
    const colorMult = colorMode.includes("CMYK") ? 1.5 : 1.0;
    const gsmMult = parseInt(gsm) > 200 ? 1.2 : 1.0;
    return Math.round((quantity * 0.15 * colorMult * gsmMult) + base);
  };

  const handleSubmit = async () => {
    if (!name || !email) return alert("Please fill in your name and email.");
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("productType", product);
    formData.append("dimensions", dimensions);
    formData.append("paperGsm", gsm);
    formData.append("colorSpace", colorMode);
    formData.append("quantity", quantity.toString());

    const result = await submitQuoteRequest(formData);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      // Let React render the .success-message first, then animate it
      setTimeout(() => {
        gsap.fromTo(".success-message", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" });
      }, 50);
    } else {
      alert("There was an error submitting your request.");
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-white text-black p-2 md:p-6 lg:p-8 overflow-x-hidden overflow-y-auto relative">
      
      {/* HEADER */}
      <header className="border-2 border-black p-6 md:p-8 flex justify-between items-center w-full bg-white mb-8 max-w-[1200px] mx-auto">
        <Link href="/">
          <h1 className="text-xl md:text-3xl font-bold uppercase tracking-tighter hover:opacity-70">
            Aurora Fine Arts
          </h1>
        </Link>
        <span className="text-sm md:text-lg font-bold uppercase bg-black text-white px-4 py-2">
          Step {step} of 4
        </span>
      </header>

      <div className="max-w-[1200px] w-full mx-auto relative flex-1 pb-24">
        
        {/* STEP 1: PRODUCT */}
        {step === 1 && (
          <div className="step-1 w-full">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
              Select Product
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {["Books & Catalogues", "Custom Packaging", "Marketing Collateral", "Calendars", "Bespoke Creation"].map((prod, i) => {
                const accents = ["hover:bg-[var(--color-print-cyan)]", "hover:bg-[var(--color-print-magenta)]", "hover:bg-[var(--color-print-yellow)]", "hover:bg-black hover:text-white", "hover:bg-[var(--color-print-cyan)] hover:text-black"];
                return (
                  <button 
                    key={prod} 
                    onClick={() => handleProductSelect(prod)}
                    className={`border-2 border-black p-12 text-2xl md:text-4xl font-bold uppercase text-left transition-colors duration-300 ${accents[i % accents.length]} ${i === 4 ? 'md:col-span-2' : ''}`}
                  >
                    {prod}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* STEP 2: SPECS */}
        {step === 2 && (
          <div className="step-2 w-full">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
              Specifications
            </h2>
            <div className="grid grid-cols-1 gap-8 border-2 border-black p-8 md:p-12">
              
              <div className="flex flex-col gap-4">
                <label className="text-xl font-bold uppercase">Dimensions</label>
                <select 
                  className="border-2 border-black p-4 text-lg font-medium bg-transparent focus:outline-none focus:border-[var(--color-print-cyan)]"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                >
                  <option>Standard A4</option>
                  <option>Standard A5</option>
                  <option>Custom Size</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xl font-bold uppercase">Paper GSM</label>
                <select 
                  className="border-2 border-black p-4 text-lg font-medium bg-transparent focus:outline-none focus:border-[var(--color-print-magenta)]"
                  value={gsm}
                  onChange={(e) => setGsm(e.target.value)}
                >
                  <option>100gsm</option>
                  <option>150gsm</option>
                  <option>250gsm</option>
                  <option>350gsm (Cover)</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xl font-bold uppercase">Color Space</label>
                <div className="flex flex-col md:flex-row gap-4">
                  {["Full Color (CMYK)", "Black & White"].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setColorMode(opt)}
                      className={`flex-1 border-2 border-black p-4 text-lg font-bold uppercase transition-colors ${colorMode === opt ? 'bg-black text-white' : 'hover:bg-neutral-200'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center flex-col md:flex-row gap-4">
                <Button onClick={() => slideToNextStep(1)} variant="secondary" className="w-full md:w-auto">
                  Back
                </Button>
                <Button onClick={() => slideToNextStep(3)} variant="accent-yellow" className="w-full md:w-auto">
                  Next Step
                </Button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: VOLUME */}
        {step === 3 && (
          <div className="step-3 w-full">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
              Volume
            </h2>
            <div className="border-2 border-black p-8 md:p-12 flex flex-col gap-8">
              <label className="text-xl md:text-3xl font-bold uppercase">Quantity Required</label>
              <input 
                type="number" 
                min="100"
                step="100"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="border-b-4 border-black text-6xl md:text-8xl font-black focus:outline-none py-4 w-full bg-transparent"
              />
              <p className="text-lg font-medium text-neutral-500">Minimum industrial run: 100 units.</p>
              
              <div className="mt-8 flex justify-between items-center flex-col md:flex-row gap-4">
                <Button onClick={() => slideToNextStep(2)} variant="secondary" className="w-full md:w-auto">
                  Back
                </Button>
                <Button onClick={() => slideToNextStep(4)} variant="accent-magenta" className="w-full md:w-auto">
                  Calculate Quote
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: RESULT */}
        {step === 4 && (
          <div className="step-4 w-full flex flex-col lg:flex-row gap-8">
            <div className="flex-1 border-2 border-black p-8 md:p-12 bg-[var(--color-print-cyan)] flex flex-col justify-center items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">Estimated Total</h2>
              <div className="quote-amount text-7xl md:text-9xl font-black uppercase tracking-tighter mb-6">
                ${calculateQuote()}
              </div>
              <p className="text-lg font-medium max-w-md">
                Based on {quantity} units of {product} ({colorMode}, {gsm}). This is an estimate; finalizing requires artwork review.
              </p>
            </div>
            
            <div className="flex-1 border-2 border-black p-8 md:p-12 flex flex-col justify-between relative overflow-hidden bg-white">
              {isSuccess ? (
                <div className="success-message absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-20 bg-white">
                  <h3 className="text-4xl md:text-5xl font-black uppercase mb-4 text-[var(--color-print-magenta)]">Success!</h3>
                  <p className="text-xl md:text-2xl font-bold mb-8">
                    Your request has been securely logged. Aurora Fine Arts will be in touch shortly.
                  </p>
                  <Button onClick={() => window.location.reload()} variant="primary">
                    Done
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-bold uppercase mb-4">Your Details</h3>
                    <div className="flex flex-col gap-4 mb-8">
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        className="border-2 border-black p-4 text-lg font-medium focus:outline-none focus:border-[var(--color-print-magenta)] w-full" 
                        required
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className="border-2 border-black p-4 text-lg font-medium focus:outline-none focus:border-[var(--color-print-cyan)] w-full" 
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button onClick={handleSubmit} disabled={isSubmitting} variant="accent-yellow" className="w-full">
                      {isSubmitting ? "Submitting..." : "Submit to Sales"}
                    </Button>
                    <Button onClick={() => slideToNextStep(1)} disabled={isSubmitting} variant="secondary" className="w-full">
                      Start Over
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
