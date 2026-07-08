"use client";

import { useEffect, useState } from "react";
import { FadeUp } from "@/components/animations/motion";
import { motion } from "framer-motion";

// Automatically use today's date
const today = new Date();

const OPENING_TIME = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  8, // 8:00 AM
  0,
  0,
  0
).getTime();

const CLOSING_TIME = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  21, // 9:00 PM
  0,
  0,
  0
).getTime();

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateCountdown = () => {
      const now = Date.now();
      let target = OPENING_TIME;

      // If store is open, count down until closing
      if (now >= OPENING_TIME && now < CLOSING_TIME) {
        target = CLOSING_TIME;
      }

      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          ),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  const now = Date.now();
  const isOpeningSoon = now < OPENING_TIME;
  const isOpen = now >= OPENING_TIME && now < CLOSING_TIME;
  const isClosed = now >= CLOSING_TIME;

  const openingBanner = (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-curry-yellow text-deep-black py-4 px-6 text-center shadow-lg"
    >
      <p className="font-display font-bold text-lg md:text-xl uppercase tracking-[0.2em]">
        🍛 We Are Now Open! Welcome to Oretachino Curry Ya
      </p>
    </motion.section>
  );

  const closedBanner = (
    <section className="bg-gray-900 text-white py-4 px-6 text-center">
      <p className="font-medium">
        🌙 We are closed for the day. See you tomorrow!
      </p>
    </section>
  );

  return (
    <section className="bg-deep-black text-pure-white border-y border-curry-yellow/30 relative overflow-hidden py-8 md:py-12">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      />

      {isOpen && openingBanner}
      {isClosed && closedBanner}

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <FadeUp className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="text-center md:text-left flex-1">
            <h2 className="text-sm md:text-base font-semibold tracking-[0.3em] text-curry-yellow uppercase mb-2">
              {isOpeningSoon
                ? "Opening Today!"
                : isOpen
                ? "Now Open"
                : "Closed"}
            </h2>

            <p className="font-display text-2xl md:text-4xl font-bold">
              {today.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Store Hours: 8:00 AM – 9:00 PM
            </p>
          </div>

          {!isOpen && !isClosed && (
            <div className="flex gap-4 md:gap-6 justify-center flex-1">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Mins", value: timeLeft.minutes },
                { label: "Secs", value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-muted/20 border border-curry-yellow/50 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                    <span className="text-2xl md:text-3xl font-bold font-display text-curry-yellow">
                      {item.value.toString().padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
