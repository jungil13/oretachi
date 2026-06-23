"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, CalendarDays } from "lucide-react";
import type { MenuItem } from "@/types/database";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function SpiceLevel({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Spice level ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Flame
          key={i}
          size={12}
          className={i < level ? "text-red-500" : "text-muted-foreground/30"}
        />
      ))}
    </div>
  );
}

export function MenuCard({ item }: { item: MenuItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-xl hover:shadow-curry-yellow/10"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {item.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-curry-yellow px-3 py-1 text-xs font-semibold text-deep-black">
              Featured
            </span>
          )}
        </div>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
            </div>
            <span className="shrink-0 font-bold text-soft-gold">
              {/* {formatPrice(item.price)} */}
            </span>
          </div>
          <motion.p
            className="mt-2 text-sm leading-relaxed text-muted-foreground"
            animate={{ height: expanded ? "auto" : "2.5rem" }}
            style={{ overflow: "hidden" }}
          >
            {item.description}
          </motion.p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <SpiceLevel level={item.spice_level} />
            <Link href="/reservations" onClick={(e) => e.stopPropagation()}>
              <Button size="sm" variant="outline">
                <CalendarDays size={14} />
                Reserve
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
