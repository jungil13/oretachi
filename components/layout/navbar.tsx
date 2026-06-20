"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Clock, Phone, Mail } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Logo } from "@/components/layout/logo";
import { NAV_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/data/seed";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* Top Contact Bar - Desktop Only */}
      <div className={cn(
        "hidden border-b border-white/10 bg-black/90 px-6 py-2 text-xs font-light text-white/70 transition-all duration-300 lg:flex items-center justify-between",
        scrolled ? "h-0 overflow-hidden py-0 border-none opacity-0" : "h-auto opacity-100"
      )}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-curry-yellow" />
            <span>{CONTACT_INFO.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={12} className="text-curry-yellow" />
            <span>Daily: 11:00 am to 10:00 pm</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-curry-yellow" />
            <span>{CONTACT_INFO.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={12} className="text-curry-yellow" />
            <span>{CONTACT_INFO.email}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          "flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300",
          scrolled ? "bg-black/90 backdrop-blur-md shadow-2xl" : "bg-gradient-to-b from-black/80 to-transparent"
        )}
      >
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="shrink-0" aria-label="Oretachi no Curry-ya home">
            <Logo className="scale-90 text-white sm:scale-100" />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-xs font-semibold uppercase tracking-widest transition-colors duration-200",
                  active ? "text-curry-yellow" : "text-white hover:text-curry-yellow"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden flex-1 items-center justify-end gap-6 lg:flex">
          <Link href="/reservations" className="group relative overflow-hidden bg-curry-yellow px-6 py-2.5 text-xs font-bold tracking-[0.2em] text-black transition-all hover:bg-white">
            FIND A TABLE
          </Link>
          <button aria-label="Menu" onClick={() => setOpen(true)} className="text-white hover:text-curry-yellow transition-colors">
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 lg:hidden">
          <Link href="/reservations" className="bg-curry-yellow px-4 py-2 text-[10px] font-bold tracking-widest text-black transition-all hover:bg-white">
            FIND A TABLE
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-white transition-colors"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
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
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 z-50 flex h-full w-[min(100vw,340px)] flex-col bg-deep-black shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <Logo className="text-white scale-90" />
                <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="flex flex-col space-y-6">
                  {NAV_LINKS.map((link) => {
                    const active = isActivePath(pathname, link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "text-lg font-medium tracking-wider transition-colors",
                          active ? "text-curry-yellow" : "text-white/80 hover:text-white"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
