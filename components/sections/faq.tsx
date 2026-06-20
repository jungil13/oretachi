"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] transition-colors hover:border-[#FACC15]/40"
          >
            <button
              id={`faq-trigger-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 p-6 text-left font-display text-lg tracking-wide text-white transition-colors hover:bg-white/5"
            >
              <span>{item.question}</span>
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 transition-colors",
                isOpen ? "bg-[#FACC15] border-[#FACC15]" : "bg-transparent group-hover:border-[#FACC15]/50"
              )}>
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform duration-300",
                    isOpen ? "rotate-180 text-black" : "text-[#FACC15]"
                  )}
                />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-base leading-relaxed text-white/70 font-light tracking-wide" dangerouslySetInnerHTML={{ __html: item.answer }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
