"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays, MapPin } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { CurrySteam } from "@/components/animations/curry-steam";

const TARGET_DATE = "2026-07-08T10:00:00Z";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [isClient, setIsClient] = useState(false);
  const [status, setStatus] = useState<"coming_soon" | "grand_opening" | "default">("coming_soon");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setIsClient(true);
    const calculateStatus = () => {
      const now = new Date();
      const target = new Date(TARGET_DATE);
      const difference = target.getTime() - now.getTime();
      
      const grandOpeningEnd = target.getTime() + 24 * 60 * 60 * 1000;

      if (difference > 0) {
        setStatus("coming_soon");
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else if (now.getTime() < grandOpeningEnd) {
        setStatus("grand_opening");
      } else {
        setStatus("default");
      }
    };

    calculateStatus();
    const timer = setInterval(calculateStatus, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black">
      <motion.div
        style={{ y }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="h-full w-full object-cover opacity-60"
        >
          <source src="/videos/oretachi.mp4" type="video/mp4" />
        </motion.video>

        {/* Luxury Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Golden Accent Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95" />
        {/* Curry Golden Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,196,0,0.05),transparent_60%)]" />
      </motion.div>

      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-curry-yellow/30"
              initial={{ x: Math.random() * 100 + "%", y: "100%" }}
              animate={{ y: "-20%", opacity: [0, 1, 0] }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                delay: Math.random() * 5,
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
        <div className="w-[1px] h-24 bg-white/20 mb-4"></div>
        <Link href="/reservations" className="group flex flex-col items-center p-4 border border-[#e6c18f] bg-[#e6c18f]/10 backdrop-blur-sm hover:bg-[#e6c18f] transition-all">
          <CalendarDays size={24} className="text-[#e6c18f] group-hover:text-black mb-2" />
          <span className="text-[10px] font-bold tracking-widest text-[#e6c18f] group-hover:text-black uppercase text-center w-16">Book a Table</span>
        </Link>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {isClient && (
            <>
              {status === "coming_soon" && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e6c18f]/30 bg-[#e6c18f]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#e6c18f]"
                  >
                    <MapPin size={14} className="shrink-0" />
                    <span>Coming Soon to Cebu</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-8 flex flex-wrap justify-center gap-3 sm:gap-4"
                  >
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hours", value: timeLeft.hours },
                      { label: "Mins", value: timeLeft.minutes },
                      { label: "Secs", value: timeLeft.seconds },
                    ].map((unit) => (
                      <motion.div
                        key={unit.label}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="group relative flex h-20 w-20 flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-[#e6c18f]/40 hover:shadow-[0_0_30px_rgba(230,193,143,0.15)] sm:h-24 sm:w-24"
                      >
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#e6c18f]/10 via-transparent to-[#e6c18f]/5" />
                        </div>
                        <span className="relative z-10 text-2xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-[#e6c18f] sm:text-3xl">
                          {String(unit.value).padStart(2, "0")}
                        </span>
                        <span className="relative z-10 mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 group-hover:text-white/80">
                          {unit.label}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </>
              )}

              {status === "grand_opening" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <span className="inline-block rounded-full border border-[#e6c18f] bg-[#e6c18f]/20 px-6 py-2 text-sm sm:text-base font-bold tracking-[0.3em] text-[#e6c18f] uppercase animate-pulse shadow-[0_0_20px_rgba(230,193,143,0.3)]">
                    Grand Opening Today
                  </span>
                </motion.div>
              )}

              {status === "default" && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-8 bg-[#e6c18f]/50"></div>
                  <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#e6c18f] uppercase">
                    Delightful Experience
                  </span>
                  <div className="h-[1px] w-8 bg-[#e6c18f]/50"></div>
                </div>
              )}
            </>
          )}

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl">
            Flavors Inspired by<br />the Seasons
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-sm sm:text-base md:text-lg font-light tracking-wide text-white/80 mb-10">
            Experience authentic Japanese curry crafted with traditional recipes,
            premium ingredients, and the warmth of Osaka hospitality.
          </p>

          {/* CTA Button */}
          <Link href="/menu">
            <button className="group relative overflow-hidden border border-[#e6c18f] bg-transparent px-8 py-4 transition-all hover:bg-[#e6c18f]">
              <span className="relative z-10 text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#e6c18f] transition-colors group-hover:text-black uppercase">
                View Our Menu
              </span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
