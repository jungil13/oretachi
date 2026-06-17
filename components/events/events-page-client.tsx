"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, PartyPopper } from "lucide-react";
import type { Event } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { FadeUp } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setExpired(true);
        return;
      }
      setExpired(false);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (expired) {
    return (
      <p className="inline-flex items-center gap-2 rounded-full bg-curry-yellow/20 px-4 py-2 text-sm font-medium text-curry-yellow">
        <PartyPopper size={16} />
        Event is live — join us today
      </p>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="min-w-[4.5rem] rounded-xl bg-deep-black/80 px-3 py-2 text-center backdrop-blur-sm sm:px-4 sm:py-3"
        >
          <p className="text-xl font-bold text-curry-yellow sm:text-2xl">
            {String(u.value).padStart(2, "0")}
          </p>
          <p className="text-[10px] text-pure-white/60 sm:text-xs">{u.label}</p>
        </div>
      ))}
    </div>
  );
}

export function EventsPageClient({ events }: { events: Event[] }) {
  const featured = events[0];
  const gridEvents = featured ? events.slice(1) : events;

  return (
    <div className="page-shell">
      <div className="page-container">
        <PageHeader
          eyebrow="What's Happening"
          title="Events & Promotions"
          description="Special tastings, seasonal menus, and community gatherings at our Cebu location."
        />

        {featured && (
          <FadeUp className="mb-12 md:mb-16">
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <div className="relative aspect-[16/10] md:aspect-[21/9]">
                <Image
                  src={featured.image_url}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/40 to-transparent md:bg-gradient-to-r md:from-deep-black/85 md:via-deep-black/40 md:to-transparent" />
              </div>
              <div className="relative p-6 md:absolute md:bottom-0 md:left-0 md:max-w-xl md:p-10 lg:max-w-2xl lg:p-12">
                <p className="text-sm font-medium tracking-wide text-curry-yellow uppercase">
                  Featured Event
                </p>
                <h2 className="mt-2 text-2xl font-bold text-pure-white sm:text-3xl md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-pure-white/75 sm:text-base">
                  {featured.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-pure-white/60">
                  <CalendarDays size={16} className="text-curry-yellow" />
                  {formatDate(featured.event_date)}
                </div>
                <div className="mt-5">
                  <Countdown targetDate={featured.event_date} />
                </div>
              </div>
            </div>
          </FadeUp>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridEvents.map((event, i) => (
            <FadeUp key={event.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group h-full overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="flex items-center gap-1.5 text-sm text-soft-gold">
                    <CalendarDays size={14} />
                    {formatDate(event.event_date)}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{event.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
