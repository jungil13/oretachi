"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { CurrySteam } from "@/components/animations/curry-steam";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black">
      {/* Background video — no JS parallax, CSS handles the subtle scale */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-80 hero-video-scale"
        >
          <source src="/videos/oretachi.mp4" type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,196,0,0.05),transparent_60%)]" />
      </div>

      {/* CSS-driven shimmer particles — zero JS overhead */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${15 + i * 14}%`,
                animationDelay: `${i * 1.4}s`,
                animationDuration: `${10 + i * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <CurrySteam />

      {/* Side Decorative Elements */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 border border-white/20 rotate-45 hover:border-curry-yellow transition-colors cursor-pointer z-20">
        <ChevronLeft className="-rotate-45 text-white/50 hover:text-white transition-colors" size={24} />
      </div>
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 border border-white/20 rotate-45 hover:border-curry-yellow transition-colors cursor-pointer z-20">
        <ChevronRight className="-rotate-45 text-white/50 hover:text-white transition-colors" size={24} />
      </div>

      <div className="absolute right-10 bottom-32 hidden xl:flex flex-col items-center gap-2 z-20">
        <div className="w-[1px] h-24 bg-white/20 mb-4" />
        <Link href="/reservations" className="group flex flex-col items-center p-4 border border-[#FACC15] bg-[#FACC15]/10 backdrop-blur-sm hover:bg-[#FACC15] transition-all">
          <CalendarDays size={24} className="text-[#FACC15] group-hover:text-black mb-2" />
          <span className="text-[10px] font-bold tracking-widest text-[#FACC15] group-hover:text-black uppercase text-center w-16">Book a Table</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6"
      >
        <div className="flex flex-col items-center mt-12">
          {/* Main Headline */}
          <div className="w-full md:w-2/3"> 
            <p className="text-[16px] sm:text-[20px] md:text-[30px] font-medium tracking-[0.2em]">ORETACHI NO CURRY-YA</p>
          </div>
          <img src="/taste.png" alt="Oretachi No Curry Ya" className="mb-2" />
          {/* Subtitle */}
          <p className="max-w-2xl text-sm sm:text-base md:text-lg font-light tracking-wide text-white/80 mb-10">
            Experience authentic Japanese curry crafted with traditional recipes,
            premium ingredients, and the warmth of Osaka hospitality.
          </p>

          {/* CTA Button */}
          <Link href="/menu">
            <button className="group relative overflow-hidden border border-[#FACC15] bg-transparent px-8 py-4 transition-all hover:bg-[#FACC15]">
              <span className="relative z-10 text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#FACC15] transition-colors group-hover:text-black uppercase">
                View Our Menu
              </span>
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
