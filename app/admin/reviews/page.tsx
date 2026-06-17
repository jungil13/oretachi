"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { Review } from "@/types/database";

export default function AdminReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (data) setItems(data as Review[]);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("reviews").delete().eq("id", id);
    setDeleteTarget(null);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Reviews</h1>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{item.name} · {"★".repeat(item.rating)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.review}</p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setDeleteTarget(item.id)}>Delete</Button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted-foreground">No reviews yet.</p>}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Review"
        description="This will permanently delete this customer review."
        onConfirm={() => deleteTarget && remove(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
