"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { GALLERY_CATEGORIES } from "@/lib/data/seed";
import { ImageUpload } from "@/components/ui/image-upload";
import type { GalleryItem } from "@/types/database";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState({ image_url: "", category: "Food", title: "" });

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
    if (data) setItems(data as GalleryItem[]);
  };

  useEffect(() => {
    load();

    // Subscribe to realtime updates
    const supabase = createClient();
    const channel = supabase
      .channel("gallery_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "gallery" },
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
    if (!form.image_url || !form.title) return;
    const supabase = createClient();
    await supabase.from("gallery").insert(form);
    setForm({ image_url: "", category: "Food", title: "" });
    load();
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("gallery").delete().eq("id", id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">Gallery</h1>
          <p className="text-sm text-muted-foreground">Manage your restaurant showcase pictures (Realtime + file uploads)</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1"
              placeholder="e.g. Dining Area"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1"
            >
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>Showcase Image</Label>
            <ImageUpload
              value={form.image_url}
              onChange={(url) => setForm({ ...form, image_url: url })}
              className="mt-1"
            />
          </div>
        </div>
        <Button className="mt-4" onClick={add}>Add Showcase Item</Button>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </div>
              <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => remove(item.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground py-8">No gallery items added yet.</p>
        )}
      </div>
    </div>
  );
}