"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { SocialPost } from "@/types/database";

const PLATFORMS = ["Facebook", "Instagram", "TikTok", "YouTube", "Other"];

export default function AdminSocialPostsPage() {
  const [items, setItems] = useState<SocialPost[]>([]);
  const [form, setForm] = useState<{ platform: string; embed_code: string; title: string }>({ 
    platform: "Instagram", 
    embed_code: "", 
    title: "" 
  });
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("social_posts").select("*").order("created_at", { ascending: false });
    if (data) setItems(data as SocialPost[]);
  };

  useEffect(() => {
    load();

    const supabase = createClient();
    const channel = supabase
      .channel("social_posts_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "social_posts" },
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
    if (!form.embed_code || !form.platform) return;
    setIsSubmitting(true);
    
    try {
      const supabase = createClient();
      await supabase.from("social_posts").insert([form]);
      setForm({ platform: "Instagram", embed_code: "", title: "" });
      load();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("social_posts").delete().eq("id", id);
    setDeleteTarget(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">Social Media Posts</h1>
          <p className="text-sm text-muted-foreground">Manage your embedded social media posts for the updates feed</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Title (Optional)</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1"
              placeholder="e.g. New Curry Special!"
            />
          </div>
          <div>
            <Label>Platform</Label>
            <Select
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="mt-1"
            >
              {PLATFORMS.map((plat) => (
                <option key={plat} value={plat}>{plat}</option>
              ))}
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>Embed Code (HTML Snippet)</Label>
            <textarea
              value={form.embed_code}
              onChange={(e) => setForm({ ...form, embed_code: e.target.value })}
              className="mt-1 flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder='<iframe src="..." /> or <blockquote... />'
            />
            <p className="mt-1 text-xs text-muted-foreground">Paste the exact HTML embed code provided by the social platform.</p>
          </div>
        </div>
        <Button className="mt-4" onClick={add} disabled={isSubmitting || !form.embed_code}>
          {isSubmitting ? "Adding..." : "Add Post"}
        </Button>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex-1 overflow-auto bg-muted p-4">
              <div 
                className="pointer-events-none flex w-full flex-col items-center justify-center [&_iframe]:max-w-full"
                dangerouslySetInnerHTML={{ __html: item.embed_code }}
              />
            </div>
            <div className="flex items-center justify-between border-t border-border p-4">
              <div>
                <p className="font-medium text-sm">{item.title || "Untitled"}</p>
                <p className="text-xs text-muted-foreground">{item.platform}</p>
              </div>
              <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteTarget(item.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No social posts added yet.</p>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Social Post"
        description="This will permanently delete this social post from your feed."
        onConfirm={() => deleteTarget && remove(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
