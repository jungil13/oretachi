"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { ImageUpload } from "@/components/ui/image-upload";
import type { Event } from "@/types/database";

export default function AdminEventsPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [form, setForm] = useState({ title: "", description: "", image_url: "", event_date: "" });

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("events").select("*").order("event_date");
    if (data) setItems(data as Event[]);
  };

  useEffect(() => {
    load();

    // Subscribe to realtime updates
    const supabase = createClient();
    const channel = supabase
      .channel("events_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        () => {
          load();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const add = async () => {
    if (!form.title || !form.event_date || !form.image_url) return;
    const supabase = createClient();
    await supabase.from("events").insert({ ...form, event_date: new Date(form.event_date).toISOString() });
    setForm({ title: "", description: "", image_url: "", event_date: "" });
    load();
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("events").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-sm text-muted-foreground">Manage your upcoming restaurant events and promotions (Realtime + uploads)</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1" />
          </div>
          <div>
            <Label>Event Date</Label>
            <Input type="datetime-local" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className="mt-1" />
          </div>
          <div className="md:col-span-2">
            <Label>Event Image</Label>
            <ImageUpload value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} className="mt-1" />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1" />
          </div>
        </div>
        <Button className="mt-4" onClick={add}>Add Event</Button>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{formatDate(item.event_date)}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => remove(item.id)}>Delete</Button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No events scheduled yet.</p>
        )}
      </div>
    </div>
  );
}