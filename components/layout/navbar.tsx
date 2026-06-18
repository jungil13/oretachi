"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, CalendarDays } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/75 px-4 py-2.5 text-white backdrop-blur-xl transition-all duration-300 sm:px-5 sm:py-3",
          scrolled && "shadow-2xl shadow-black/30"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0"
          aria-label="Oretachi no Curry-ya home"
        >
          <Logo className="scale-90 text-white sm:scale-100" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "border border-curry-yellow/30 bg-curry-yellow/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2.5 text-white transition-all hover:scale-105 hover:bg-white/10"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link href="/reservations" className="hidden sm:block">
            <Button size="sm" className="gap-2">
              <CalendarDays size={15} />
              Reserve
            </Button>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 xl:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
            />

            {/* Mobile Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="fixed top-0 right-0 z-50 flex h-full w-[min(100vw,340px)] flex-col border-l border-white/10 bg-black/80 backdrop-blur-2xl shadow-2xl xl:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <Logo className="text-white" />

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-1">
                  {NAV_LINKS.map((link) => {
                    const active = isActivePath(pathname, link.href);
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200",
                          active
                            ? "border border-curry-yellow/30 bg-curry-yellow/20 text-white"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <Icon
                          size={18}
                          className="shrink-0 text-curry-yellow"
                        />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-4">
                <Link href="/reservations" className="block">
                  <Button className="w-full gap-2">
                    <CalendarDays size={16} />
                    Reserve Table
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
