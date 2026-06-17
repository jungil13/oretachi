"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Star, Mail, UtensilsCrossed } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    reservations: 0,
    reviews: 0,
    messages: 0,
    menuItems: 0,
  });

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
  }, []);

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
    </div>
  );
}
