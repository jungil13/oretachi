"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import type { GalleryItem } from "@/types/database";

export default function AdminDigitalMenuPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState<{ image_urls: string[]; title: string }>({ 
    image_urls: [], 
    title: "" 
  });
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("category", "DIGITAL_MENU")
      .order("created_at", { ascending: true }); // Order by created_at to maintain page order
    
    if (data) setItems(data as GalleryItem[]);
  };

  useEffect(() => {
    load();

    // Subscribe to realtime updates
    const supabase = createClient();
    const channel = supabase
      .channel("digital_menu_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "gallery", filter: "category=eq.DIGITAL_MENU" },
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
    if (form.image_urls.length === 0 || !form.title) return;
    setIsSubmitting(true);
    
    try {
      const supabase = createClient();
      
      const insertData = form.image_urls.map(url => ({
        image_url: url,
        category: "DIGITAL_MENU",
        title: form.image_urls.length > 1 ? `${form.title} - ${url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('/') + 6)}` : form.title
      }));

      await supabase.from("gallery").insert(insertData);
      setForm({ image_urls: [], title: "" });
      load();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("gallery").delete().eq("id", id);
    setDeleteTarget(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">Digital Menu</h1>
          <p className="text-sm text-muted-foreground">Manage the digital menu images shown on the public menu page.</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-4">
          <div>
            <Label>Menu Page Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 max-w-md"
              placeholder="e.g. Page 1, Page 2..."
            />
          </div>
          <div>
            <Label>Digital Menu Images</Label>
            <MultiImageUpload
              value={form.image_urls}
              onChange={(urls) => setForm({ ...form, image_urls: urls })}
              className="mt-1"
            />
          </div>
        </div>
        <Button className="mt-4" onClick={add} disabled={isSubmitting || form.image_urls.length === 0 || !form.title}>
          {isSubmitting ? "Adding..." : `Add ${form.image_urls.length > 1 ? form.image_urls.length + ' Pages' : 'Page'}`}
        </Button>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div key={item.id} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative aspect-auto min-h-[300px] overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-sm">Page {index + 1}: {item.title}</p>
                <p className="text-xs text-muted-foreground">Digital Menu</p>
              </div>
              <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteTarget(item.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full text-center text-sm text-muted-foreground py-8">No digital menu images added yet. The fallback images will be shown.</p>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Menu Page"
        description="This will permanently delete this digital menu page."
        onConfirm={() => deleteTarget && remove(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
