"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem } from "@/types/database";
import { formatPrice } from "@/lib/utils";
import { FadeUp } from "@/components/animations/motion";

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
    <section className="py-16 md:py-24">
      <div className="page-container">
        <FadeUp className="mb-12 text-center">
          <p className="text-sm font-medium tracking-widest text-soft-gold uppercase">
            Chef&apos;s Selection
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Featured Dishes
          </h2>
        </FadeUp>

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl">
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
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-bold text-pure-white md:text-3xl">
                  {items[current].name}
                </h3>
                <p className="mt-2 max-w-md text-pure-white/70">
                  {items[current].description}
                </p>
                <p className="mt-3 text-xl font-bold text-curry-yellow">
                  {formatPrice(items[current].price)}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 right-4 flex gap-2">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setCurrent(i)}
                aria-label={`View ${item.name}`}
                aria-current={i === current ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-curry-yellow" : "w-2 bg-pure-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/menu"
            className="text-sm font-medium text-soft-gold transition-colors hover:text-curry-yellow"
          >
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
