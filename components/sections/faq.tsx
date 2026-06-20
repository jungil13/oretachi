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
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <button
              id={`faq-trigger-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium transition-colors hover:bg-muted/50"
            >
              <span>{item.question}</span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
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
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.answer }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
