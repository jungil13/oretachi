"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export interface ReservationNotification {
  id: string;
  name: string;
  guests: number;
  date: string;
  time: string;
  created_at: string;
}

export function useReservationNotifications() {
  const [pendingCount, setPendingCount] = useState(0);
  const [newAlerts, setNewAlerts] = useState<ReservationNotification[]>([]);
  const isFirstLoad = useRef(true);
  const knownIds = useRef<Set<string>>(new Set());

  const fetchPending = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("reservations")
      .select("id, name, guests, date, time, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (!data) return;

    setPendingCount(data.length);

    if (isFirstLoad.current) {
      // Seed known IDs on first load — don't show alerts for existing ones
      data.forEach((r) => knownIds.current.add(r.id));
      isFirstLoad.current = false;
    } else {
      // Find genuinely new ones that arrived after first load
      const incoming = data.filter((r) => !knownIds.current.has(r.id));
      if (incoming.length > 0) {
        incoming.forEach((r) => knownIds.current.add(r.id));
        setNewAlerts((prev) => [...incoming, ...prev].slice(0, 5)); // keep latest 5
      }
    }
  }, []);

  const dismissAlert = (id: string) => {
    setNewAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const clearAlerts = () => setNewAlerts([]);

  useEffect(() => {
    fetchPending();

    const supabase = createClient();
    const channelName = `reservation_bell_${Math.random().toString(36).substring(7)}`;
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reservations" },
        () => fetchPending()
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "reservations" },
        () => fetchPending()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPending]);

  return { pendingCount, newAlerts, dismissAlert, clearAlerts };
}
