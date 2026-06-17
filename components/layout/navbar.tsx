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
    <header className="fixed top-0 right-0 left-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5 sm:py-3",
          scrolled
            ? "glass-light shadow-lg shadow-deep-black/5 dark:glass"
            : "glass-light dark:glass"
        )}
      >
        <Link href="/" className="shrink-0" aria-label="Oretachi no Curry-ya home">
          <Logo className="scale-90 sm:scale-100" />
        </Link>

        <div className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-2.5 py-2 text-sm font-medium transition-colors lg:px-3",
                  active
                    ? "bg-curry-yellow/15 text-foreground"
                    : "text-foreground/70 hover:bg-muted hover:text-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link href="/reservations" className="hidden sm:block">
            <Button size="sm">
              <CalendarDays size={15} />
              Reserve
            </Button>
          </Link>
          <button
            className="rounded-lg p-2 transition-colors hover:bg-muted xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-deep-black/40 backdrop-blur-sm xl:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close menu overlay"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 z-50 flex h-full w-[min(100vw,320px)] flex-col glass-light dark:glass xl:hidden"
            >
              <div className="flex items-center justify-between border-b border-border p-4">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                {NAV_LINKS.map((link) => {
                  const active = isActivePath(pathname, link.href);
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-curry-yellow/15 text-foreground"
                          : "text-foreground/80 hover:bg-muted"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <Icon size={18} className="shrink-0 text-soft-gold" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <div className="border-t border-border p-4">
                <Link href="/reservations" className="block">
                  <Button className="w-full">
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
