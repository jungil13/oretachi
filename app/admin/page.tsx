"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Star, Mail, UtensilsCrossed, Loader2, AlertCircle } from "lucide-react";
import StatisticsChart from "@/components/admin/StatisticsChart";
import type { SiteSettings } from "@/lib/settings";

const DEFAULT_SETTINGS: SiteSettings = {
  announce_opening: false,
  store_open: false,
} as SiteSettings;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    reservations: 0,
    reviews: 0,
    messages: 0,
    menuItems: 0,
  });

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  const chartData = [
    { label: "Reservations", value: stats.reservations },
    { label: "Reviews", value: stats.reviews },
    { label: "Messages", value: stats.messages },
    { label: "Menu Items", value: stats.menuItems },
  ];

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("reservations").select("id", { count: "exact", head: true }),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      supabase.from("menu_items").select("id", { count: "exact", head: true }),
    ]).then(([res, rev, msg, menu]) => {
      setStats({
        reservations: res.count ?? 0,
        reviews: rev.count ?? 0,
        messages: msg.count ?? 0,
        menuItems: menu.count ?? 0,
      });
    });

    // Fetch settings
    (async () => {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) {
          throw new Error(`Settings request failed (${res.status})`);
        }
        const data = await res.json();
        // Guard against unexpected/empty payloads so toggles don't stay stuck
        setSettings({ ...DEFAULT_SETTINGS, ...(data ?? {}) });
      } catch (err) {
        console.error("Failed to load settings", err);
        setSettingsError("Couldn't load store settings. Using defaults — changes may not save.");
        // Fall back to defaults instead of leaving settings as null forever,
        // otherwise the toggles stay permanently disabled.
        setSettings(DEFAULT_SETTINGS);
      }
    })();
  }, []);

  const updateSetting = async (key: keyof SiteSettings, value: boolean) => {
    if (!settings) return;
    setSavingSettings(true);
    setSettingsError(null);

    const previous = settings;
    // Optimistic update
    setSettings({ ...settings, [key]: value });

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`Failed to save (${res.status}) ${body}`);
      }
      const updated = await res.json();
      setSettings({ ...previous, ...updated });
    } catch (err) {
      console.error(err);
      setSettingsError("Failed to save the change. Please try again.");
      // Revert on failure
      setSettings(previous);
    } finally {
      setSavingSettings(false);
    }
  };

  const cards = [
    { label: "Reservations", value: stats.reservations, icon: CalendarDays, color: "text-blue-500" },
    { label: "Reviews", value: stats.reviews, icon: Star, color: "text-curry-yellow" },
    { label: "Messages", value: stats.messages, icon: Mail, color: "text-green-500" },
    { label: "Menu Items", value: stats.menuItems, icon: UtensilsCrossed, color: "text-soft-gold" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <p className="mt-1 text-muted-foreground">Welcome to the admin panel</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-xl bg-muted p-3 ${card.color}`}>
                <card.icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-sm text-muted-foreground">{card.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 w-full">
        <StatisticsChart data={chartData} />
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Store Configuration</h2>
          {savingSettings && <Loader2 size={16} className="animate-spin text-muted-foreground" />}
        </div>

        {settingsError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-sm text-red-500">
            <AlertCircle size={16} />
            <span>{settingsError}</span>
          </div>
        )}

        <Card className="border-curry-yellow/50 bg-curry-yellow/5">
          <CardContent className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Grand Opening Announcement</h3>
                <p className="text-sm text-muted-foreground">Toggle the opening banner on the website.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings?.announce_opening ?? false}
                  onChange={(e) => updateSetting("announce_opening", e.target.checked)}
                  disabled={!settings || savingSettings}
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-focus:ring-4 peer-focus:ring-curry-yellow/30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-curry-yellow"></div>
              </label>
            </div>

            <div className="h-px bg-border w-full"></div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Store Status (Open/Closed)</h3>
                <p className="text-sm text-muted-foreground">Manually toggle whether the restaurant is currently accepting online reservations.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings?.store_open ?? false}
                  onChange={(e) => updateSetting("store_open", e.target.checked)}
                  disabled={!settings || savingSettings}
                />
                <div className="w-11 h-6 bg-muted rounded-full peer peer-focus:ring-4 peer-focus:ring-green-500/30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
