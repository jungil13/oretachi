"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, UtensilsCrossed, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { CurrySteam } from "@/components/animations/curry-steam";
import { CONTACT_INFO } from "@/lib/data/seed";

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
      <motion.div
        style={{ y }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-full w-full object-cover"
        >
          <source
            src="/videos/oretachi.mp4"
            type="video/mp4"
          />
        </motion.video>

        {/* Luxury Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Golden Accent Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95" />

        {/* Curry Golden Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,196,0,0.08),transparent_70%)]" />

        {/* Bottom Fade */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep-black via-deep-black/80 to-transparent" />
      </motion.div>
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-curry-yellow/40"
              initial={{
                x: Math.random() * 100 + "%",
                y: "100%",
              }}
              animate={{
                y: "-20%",
                opacity: [0, 1, 0],
              }}
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
          className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-curry-yellow/30 bg-curry-yellow/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-curry-yellow sm:w-auto"
        >
          <MapPin
            size={14}
            className="shrink-0 self-start sm:self-center"
          />
          <span className="leading-relaxed break-words">
            2F Mahi Center, Main Rd, MEPZ 1, Lapu-Lapu City, Cebu, Philippines - COMING SOON
          </span>
        </motion.div>

        {/* Countdown Timer Display */}
        {isClient && (
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
                className="
        group
        relative
        flex h-20 w-20 flex-col items-center justify-center
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        transition-all duration-300
        hover:border-curry-yellow/40
        hover:shadow-[0_0_30px_rgba(255,196,0,0.15)]
        sm:h-24 sm:w-24
      "
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-curry-yellow/10 via-transparent to-curry-yellow/5" />
                </div>

                {/* Number */}
                <span
                  className="
          relative z-10
          text-2xl font-black tracking-tight
          text-pure-white
          transition-colors duration-300
          group-hover:text-curry-yellow
          sm:text-3xl
        "
                >
                  {String(unit.value).padStart(2, "0")}
                </span>

                {/* Label */}
                <span
                  className="
          relative z-10
          mt-1
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.2em]
          text-pure-white/60
          transition-colors duration-300
          group-hover:text-pure-white/80
        "
                >
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.p
          className="text-sm font-medium tracking-[0.2em] text-curry-yellow uppercase sm:text-base md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Japan's Favorite Curry Experience is Coming to Cebu
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
