"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { Review } from "@/types/database";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { SEED_REVIEWS } from "@/lib/data/seed";

export default function AdminReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const load = async () => {
    if (!isSupabaseConfigured()) {
      setItems(SEED_REVIEWS as Review[]);
      return;
    }
    const supabase = createClient();
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (data) setItems(data as Review[]);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from("reviews").delete().eq("id", id);
    }
    setDeleteTarget(null);
    load();
  };

  const approve = async (id: string) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.from("reviews").update({ is_approved: true }).eq("id", id);
      load();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Reviews Management</h1>
      <p className="text-muted-foreground mt-2">Approve or reject customer reviews before they appear on the site.</p>
      
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id || item.name} className={`rounded-xl border ${item.is_approved ? 'border-border bg-card' : 'border-yellow-500/50 bg-yellow-500/5'} p-4`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium flex items-center gap-3">
                  <span>{item.name} · {"★".repeat(item.rating)}</span>
                  {item.is_approved ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">Approved</span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-full">Pending</span>
                  )}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{item.review}</p>
              </div>
              <div className="flex items-center gap-2">
                {!item.is_approved && (
                  <Button size="sm" variant="outline" className="border-green-500/30 text-green-600 hover:bg-green-500 hover:text-white" onClick={() => item.id && approve(item.id)}>
                    Approve
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={() => item.id && setDeleteTarget(item.id)}>
                  Reject
                </Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground">No reviews found.</p>}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Reject Review"
        description="This will permanently delete this customer review."
        onConfirm={() => deleteTarget && remove(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
