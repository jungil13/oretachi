"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell, X, CalendarDays } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { useReservationNotifications, type ReservationNotification } from "@/hooks/use-reservation-notifications";
import { AnimatePresence, motion } from "framer-motion";

interface ToastsProps {
  newAlerts: ReservationNotification[];
  dismissAlert: (id: string) => void;
}

function ReservationToasts({ newAlerts, dismissAlert }: ToastsProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {newAlerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="pointer-events-auto w-72 rounded-2xl border border-curry-yellow/40 bg-card shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 bg-curry-yellow/10 px-4 py-2 border-b border-curry-yellow/20">
              <Bell size={14} className="text-curry-yellow shrink-0 animate-bounce" />
              <span className="text-xs font-bold text-curry-yellow uppercase tracking-wider">New Reservation!</span>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            </div>
            <div className="px-4 py-3 flex items-start gap-3">
              <CalendarDays size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">{alert.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {alert.guests} guests · {alert.date} at {alert.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Skip layout for login page — hooks must still be called unconditionally
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Single source of truth for notifications — avoids duplicate channel subscriptions
  const { pendingCount, newAlerts, dismissAlert } = useReservationNotifications();

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r md:block">
        <AdminSidebar pendingCount={pendingCount} newAlerts={newAlerts} dismissAlert={dismissAlert} />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 h-screen w-64 bg-card">
            <AdminSidebar
              onClose={() => setSidebarOpen(false)}
              pendingCount={pendingCount}
              newAlerts={newAlerts}
              dismissAlert={dismissAlert}
            />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center border-b bg-background px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2"
          >
            <Menu size={24} />
          </button>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>

      {/* Global realtime toast notifications */}
      <ReservationToasts newAlerts={newAlerts} dismissAlert={dismissAlert} />
    </div>
  );
}
