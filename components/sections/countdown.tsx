"use client";

import { useEffect, useState } from "react";
import { FadeUp } from "@/components/animations/motion";
import { motion } from "framer-motion";

// Opening at 8:00 AM on July 7, 2026
const OPENING_TIME = new Date("2026-07-07T08:00:00").getTime();
// Closing at 9:00 PM on the same day
const CLOSING_TIME = new Date("2026-07-07T21:00:00").getTime();

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
    const interval = setInterval(() => {
      const now = new Date().getTime();
      let target = OPENING_TIME;
      // If we are past opening but before closing, count down to closing
      if (now >= OPENING_TIME && now < CLOSING_TIME) {
        target = CLOSING_TIME;
      }
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  const now = new Date().getTime();
  const isOpeningSoon = now < OPENING_TIME && timeLeft.days === 0 && (timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0);
  const isOpen = now >= OPENING_TIME && now < CLOSING_TIME;
  const isClosed = now >= CLOSING_TIME;

  // Opening effect using framer‑motion
  const openingBanner = (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-curry-yellow text-deep-black py-4 px-6 text-center shadow-lg"
    >
      <p className="font-display font-bold text-lg md:text-xl uppercase tracking-[0.2em]">
        We Are Now Open! Welcome to Oretachino Curry Ya
      </p>
    </motion.section>
  );

  const closedBanner = (
    <section className="bg-gray-900 text-white py-4 px-6 text-center">
      <p className="font-medium">We are closed for the day. See you tomorrow!</p>
    </section>
  );

  return (
    <section className="bg-deep-black text-pure-white border-y border-curry-yellow/30 relative overflow-hidden py-8 md:py-12">
      {/* Background Japanese Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      ></div>

      {isOpen && openingBanner}
      {isClosed && closedBanner}

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <FadeUp className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="text-center md:text-left flex-1">
            <h2 className="text-sm md:text-base font-semibold tracking-[0.3em] text-curry-yellow uppercase mb-2">
              {isOpeningSoon ? "Opening Tomorrow!" : isOpen ? "Now Open" : isClosed ? "Closed" : "Grand Opening"}
            </h2>
            <p className="font-display text-2xl md:text-4xl font-bold">
              July 7, 2026
            </p>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Store Hours: 8 AM – 9 PM
            </p>
          </div>

          {!isOpen && !isClosed && (
            <div className="flex gap-4 md:gap-6 justify-center flex-1">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-muted/20 border border-curry-yellow/50 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                  <span className="text-2xl md:text-3xl font-bold font-display text-curry-yellow">
                    {timeLeft.days.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Days</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-muted/20 border border-curry-yellow/50 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                  <span className="text-2xl md:text-3xl font-bold font-display text-curry-yellow">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Hours</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-muted/20 border border-curry-yellow/50 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                  <span className="text-2xl md:text-3xl font-bold font-display text-curry-yellow">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Mins</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-muted/20 border border-curry-yellow/50 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                  <span className="text-2xl md:text-3xl font-bold font-display text-curry-yellow">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Secs</span>
              </div>
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
