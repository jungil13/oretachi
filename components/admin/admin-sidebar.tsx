"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, CalendarDays, UtensilsCrossed, Image,
  Star, PartyPopper, Mail, LogOut, X, Users, Share2, Bell,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarDays, showBell: true },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/digital-menu", label: "Digital Menu", icon: Image },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/events", label: "Events", icon: PartyPopper },
  { href: "/admin/social-posts", label: "Social Posts", icon: Share2 },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

import type { ReservationNotification } from "@/hooks/use-reservation-notifications";

export function AdminSidebar({
  onClose,
  pendingCount = 0,
  newAlerts = [],
  dismissAlert = () => {},
}: {
  onClose?: () => void;
  pendingCount?: number;
  newAlerts?: ReservationNotification[];
  dismissAlert?: (id: string) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [bellOpen, setBellOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="flex h-full w-full shrink-0 flex-col border-r border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-6">
        <div>
          <p className="font-bold text-curry-yellow">Curry-ya Admin</p>
          <p className="text-xs text-muted-foreground">Management Dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setBellOpen((v) => !v)}
              className="relative p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Reservation notifications"
            >
              <Bell size={18} />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white leading-none">
                  {pendingCount > 9 ? "9+" : pendingCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {bellOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-[90]" onClick={() => setBellOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-10 z-[91] w-72 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold">Reservations</p>
                      <span className="text-xs text-muted-foreground">{pendingCount} pending</span>
                    </div>

                    {newAlerts.length > 0 ? (
                      <div className="max-h-64 overflow-y-auto divide-y divide-border">
                        {newAlerts.map((alert) => (
                          <div key={alert.id} className="flex items-start gap-3 px-4 py-3 bg-curry-yellow/5 hover:bg-curry-yellow/10 transition-colors">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold truncate">🔔 New: {alert.name}</p>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                {alert.guests} guests · {alert.date} at {alert.time}
                              </p>
                            </div>
                            <button
                              onClick={() => dismissAlert(alert.id)}
                              className="text-muted-foreground hover:text-foreground shrink-0 mt-0.5"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="px-4 py-5 text-xs text-center text-muted-foreground">
                        No new reservation alerts.<br />
                        {pendingCount > 0 && <span className="text-curry-yellow font-semibold">{pendingCount} pending awaiting your review.</span>}
                      </p>
                    )}

                    <div className="border-t border-border px-4 py-2">
                      <Link
                        href="/admin/reservations"
                        onClick={() => { setBellOpen(false); onClose?.(); }}
                        className="block text-center text-xs font-semibold text-curry-yellow hover:underline py-1"
                      >
                        View all reservations →
                      </Link>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {onClose && (
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          )}
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {NAV.map(({ href, label, icon: Icon, showBell }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
              pathname === href
                ? "bg-curry-yellow/20 text-soft-gold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon size={18} />
            <span className="flex-1">{label}</span>
            {showBell && pendingCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {pendingCount}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
