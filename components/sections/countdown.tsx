"use client";

import { useEffect, useState } from "react";
import { FadeUp } from "@/components/animations/motion";
import { motion } from "framer-motion";

// Today's date
const today = new Date();

// Store opens at 8:00 AM today
const OPENING_TIME = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  8,
  0,
  0,
  0
).getTime();

// Store closes at 9:00 PM today
const CLOSING_TIME = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  21,
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

      // During store hours, countdown to closing
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

  return (
    <>
      {/* Banner */}
      {isOpen && (
        <motion.section
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-curry-yellow text-deep-black py-3 sm:py-4"
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-bold uppercase tracking-[0.25em] text-xs sm:text-sm md:text-lg">
              We Are Now Open! Welcome to Oretachino Curry Ya
            </p>
          </div>
        </motion.section>
      )}

      {isClosed && (
        <section className="bg-gray-900 text-white py-3 sm:py-4">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm md:text-base">
              We are now closed. See you tomorrow!
            </p>
          </div>
        </section>
      )}

      {/* Main Section */}
      <section className="relative overflow-hidden bg-deep-black text-white border-y border-curry-yellow/20 py-10 sm:py-12 lg:py-16">

        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-5 bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:18px_18px]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

          <FadeUp>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* LEFT SIDE */}
              <div className="text-center lg:text-left">

                <p className="uppercase tracking-[0.35em] text-curry-yellow text-xs sm:text-sm font-semibold">
                  {isOpeningSoon
                    ? "Opening Today"
                    : isOpen
                    ? "Now Open"
                    : "Closed"}
                </p>

                <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
                  {today.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h2>

                <p className="mt-5 text-muted-foreground text-sm sm:text-base">
                  Store Hours
                </p>

                <p className="font-semibold text-lg">
                  10:00 AM – 09:00 PM
                </p>

              </div>

              {/* RIGHT SIDE */}
              {!isOpen && !isClosed ? (

                <div className="flex flex-wrap justify-center lg:justify-end gap-4">

                  {[
                    {
                      label: "Days",
                      value: timeLeft.days,
                    },
                    {
                      label: "Hours",
                      value: timeLeft.hours,
                    },
                    {
                      label: "Minutes",
                      value: timeLeft.minutes,
                    },
                    {
                      label: "Seconds",
                      value: timeLeft.seconds,
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl border border-curry-yellow/50 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg">

                        <span className="text-curry-yellow text-3xl sm:text-4xl lg:text-5xl font-bold">
                          {item.value.toString().padStart(2, "0")}
                        </span>

                      </div>

                      <p className="mt-3 uppercase tracking-widest text-xs text-gray-400">
                        {item.label}
                      </p>

                    </motion.div>
                  ))}

                </div>

              ) : (

                <div className="flex justify-center lg:justify-end">

                  <div className="inline-flex items-center gap-3 rounded-full border border-curry-yellow/40 bg-curry-yellow/10 px-6 py-4">

                    <span
                      className={`w-3 h-3 rounded-full ${
                        isOpen
                          ? "bg-green-500 animate-pulse"
                          : "bg-red-500"
                      }`}
                    />

                    <span className="font-semibold text-curry-yellow text-lg">
                      {isOpen
                        ? "We're Open!"
                        : "Closed for Today"}
                    </span>

                  </div>

                </div>

              )}

            </div>

          </FadeUp>

        </div>

      </section>
    </>
  );
}
