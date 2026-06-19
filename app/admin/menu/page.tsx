"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { MENU_CATEGORIES } from "@/lib/data/seed";
import { formatPrice } from "@/lib/utils";
import { ImageUpload } from "@/components/ui/image-upload";
import type { MenuItem } from "@/types/database";
import type { Database } from "@/types/supabase";
import { DataTableControls } from "@/components/admin/data-table-controls";

const ITEMS_PER_PAGE = 10;

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [editing, setEditing] = useState<Partial<MenuItem> | null>(null);
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("menu_items").select("*").order("name");
    if (data) setItems(data as MenuItem[]);
  };

  useEffect(() => {
    load();
    const supabase = createClient();
    const channel = supabase
      .channel("menu_items_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_items" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const save = async () => {
    if (!editing?.name) return;
    const supabase = createClient();
    if (editing.id) {
      const { id, created_at, ...updateData } = editing;
      await supabase.from("menu_items").update(updateData).eq("id", editing.id);
    } else {
      const { id, created_at, ...insertData } = editing;
      await supabase.from("menu_items").insert(insertData as Database["public"]["Tables"]["menu_items"]["Insert"]);
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("menu_items").delete().eq("id", id);
    load();
  };

  const filteredItems = useMemo(() => {
    let res = items;
    if (category !== "All") {
      res = res.filter(i => i.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      res = res.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    return res;
  }, [items, search, category]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = filteredItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">Menu Items</h1>
          <p className="text-sm text-muted-foreground">Manage your curry and food menu</p>
        </div>
        <Button onClick={() => setEditing({ name: "", price: 0, category: MENU_CATEGORIES[0], spice_level: 0, description: "", image_url: "", featured: false })}>
          Add Item
        </Button>
      </div>

      {editing && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">{editing.id ? "Edit Item" : "New Item"}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Price (PHP)</Label>
              <Input type="number" value={editing.price ?? 0} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) })} className="mt-1" />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={editing.category ?? MENU_CATEGORIES[0]} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="mt-1">
                {MENU_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Spice Level (0-5)</Label>
              <Input type="number" min={0} max={5} value={editing.spice_level ?? 0} onChange={(e) => setEditing({ ...editing, spice_level: parseInt(e.target.value) })} className="mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label>Image</Label>
              <ImageUpload value={editing.image_url ?? ""} onChange={(url) => setEditing({ ...editing, image_url: url })} className="mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="mt-1" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={editing.featured ?? false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} id="featured" />
              <Label htmlFor="featured">Featured</Label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={save}>Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <DataTableControls
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={[...MENU_CATEGORIES]}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          placeholder="Search menu items..."
        />
        <div className="mt-4 space-y-3">
          {paginatedItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.category} · {formatPrice(item.price)}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(item)}>Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => remove(item.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {paginatedItems.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No menu items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}