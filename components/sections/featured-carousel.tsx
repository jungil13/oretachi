"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem } from "@/types/database";
import { formatPrice } from "@/lib/utils";
import { FadeUp } from "@/components/animations/motion";
import { ArrowRight } from "lucide-react";

export function FeaturedCarousel({ items }: { items: MenuItem[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="page-container relative z-10">
        <FadeUp className="mb-12 text-center flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-[#FACC15]/50"></div>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#FACC15] uppercase">
              Chef&apos;s Selection
            </p>
            <div className="h-[1px] w-8 bg-[#FACC15]/50"></div>
          </div>
          <h2 className="font-display text-3xl font-bold md:text-4xl text-white">
            Featured Dishes
          </h2>
        </FadeUp>

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(250,204,21,0.05)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[16/9] md:aspect-[21/9]"
            >
              <Image
                src={items[current].image_url}
                alt={items[current].name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <h3 className="text-2xl font-bold text-white md:text-4xl font-display mb-3">
                  {items[current].name}
                </h3>
                <p className="max-w-md text-white/70 font-light tracking-wide mb-4">
                  {items[current].description}
                </p>
                <p className="text-xl font-bold text-[#FACC15] tracking-wider">
                  {formatPrice(items[current].price)}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 right-6 flex gap-3">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setCurrent(i)}
                aria-label={`View ${item.name}`}
                aria-current={i === current ? "true" : undefined}
                className={`h-1 transition-all rounded-full ${i === current ? "w-8 bg-[#FACC15]" : "w-3 bg-white/30 hover:bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/menu">
            <button className="group relative overflow-hidden border border-[#FACC15] bg-transparent px-8 py-3 transition-all hover:bg-[#FACC15]">
              <span className="relative z-10 flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#FACC15] transition-colors group-hover:text-black uppercase">
                View Full Menu <ArrowRight size={16} />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
