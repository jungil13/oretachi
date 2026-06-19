"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, UtensilsCrossed, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { CurrySteam } from "@/components/animations/curry-steam";
import { CONTACT_INFO } from "@/lib/data/seed";

// Countdown target date: July 8, 2026 at 10:00 AM UTC
const TARGET_DATE = "2026-07-08T10:00:00Z";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const calculateTimeLeft = () => {
      const difference = +new Date(TARGET_DATE) - +new Date();
      if (difference <= 0) return;
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source
            type="video/mp4"
            src="/videos/oretachi.mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/75 via-deep-black/55 to-deep-black/90" />
      </motion.div>

      <CurrySteam />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-28 text-center sm:px-6 sm:pb-20 sm:pt-32 md:pt-36"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <Logo variant="hero" className="scale-110 sm:scale-125" />
        </motion.div>

        {/* Coming Soon Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-curry-yellow/30 bg-curry-yellow/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-curry-yellow"
        >
          <MapPin size={12} />
          2F Mahi Center, Main Rd, MEPZ 1, Lapu-Lapu City, Cebu, Philippines 6016
          </motion.div>

        {/* Countdown Timer Display */}
        {isClient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8 flex justify-center gap-3 sm:gap-4"
          >
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-pure-white/10 bg-deep-black/45 backdrop-blur-md sm:h-20 sm:w-20"
              >
                <span className="text-xl font-bold text-pure-white sm:text-2xl">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-pure-white/60">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        <motion.p
          className="text-sm font-medium tracking-[0.2em] text-curry-yellow uppercase sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Loved in Osaka, Coming to Cebu
        </motion.p>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pure-white/75 sm:text-lg md:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Experience authentic Japanese curry crafted with traditional recipes,
          premium ingredients, and the warmth of Osaka hospitality.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Link href="/reservations" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              <CalendarDays size={18} />
              Reserve Table
            </Button>
          </Link>
          <Link href="/menu" className="w-full sm:w-auto">
            <Button size="lg" variant="glass" className="w-full sm:w-auto">
              <UtensilsCrossed size={18} />
              View Menu
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}