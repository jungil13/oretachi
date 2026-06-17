"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/types/database";

export function MasonryGallery({ items }: { items: GalleryItem[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(6);

  const categories = ["All", ...new Set(items.map((i) => i.category))];
  const filtered =
    filter === "All" ? items : items.filter((i) => i.category === filter);

  useEffect(() => {
    setVisible(6);
  }, [filter]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === cat
                ? "bg-curry-yellow text-deep-black"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.slice(0, visible).map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.1 }}
            className="mb-4 break-inside-avoid"
          >
            <button
              onClick={() => setLightbox(i)}
              className="group relative w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image_url}
                alt={item.title}
                width={600}
                height={400}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-deep-black/0 transition-colors group-hover:bg-deep-black/40">
                <ZoomIn
                  size={24}
                  className="text-pure-white opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-black/80 to-transparent p-4">
                <p className="text-sm font-medium text-pure-white">{item.title}</p>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {visible < filtered.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisible((v) => v + 6)}
            className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Load More
          </button>
        </div>
      )}

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-deep-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 rounded-full p-2 text-pure-white transition-colors hover:bg-pure-white/10 sm:top-6 sm:right-6"
              onClick={() => setLightbox(null)}
              aria-label="Close gallery"
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-2 rounded-full p-2 text-pure-white transition-colors hover:bg-pure-white/10 sm:left-4"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox - 1 + filtered.length) % filtered.length);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-h-[80vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].image_url}
                alt={filtered[lightbox].title}
                width={1200}
                height={800}
                className="max-h-[80vh] rounded-2xl object-contain"
              />
              <p className="mt-4 text-center text-pure-white">
                {filtered[lightbox].title}
              </p>
            </motion.div>
            <button
              className="absolute right-2 rounded-full p-2 text-pure-white transition-colors hover:bg-pure-white/10 sm:right-4"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox + 1) % filtered.length);
              }}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
