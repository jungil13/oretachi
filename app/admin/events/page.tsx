"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { ImageUpload } from "@/components/ui/image-upload";
import type { Event } from "@/types/database";
import { DataTableControls } from "@/components/admin/data-table-controls";
import { Bold, Italic } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function AdminEventsPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [form, setForm] = useState({ title: "", description: "", image_url: "", event_date: "" });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("events").select("*").order("event_date", { ascending: false });
    if (data) setItems(data as Event[]);
  };

  useEffect(() => {
    load();
    const supabase = createClient();
    const channel = supabase
      .channel("events_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "events" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
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

  const handleFormat = (tag: string) => {
    const textarea = document.getElementById("event-description") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = form.description;
    const newText = text.substring(0, start) + `<${tag}>` + text.substring(start, end) + `</${tag}>` + text.substring(end);
    setForm({ ...form, description: newText });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tag.length + 2, end + tag.length + 2);
    }, 0);
  };

  const filteredItems = useMemo(() => {
    let res = items;
    if (search) {
      const q = search.toLowerCase();
      res = res.filter(i => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    return res;
  }, [items, search]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = filteredItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-sm text-muted-foreground">Manage your upcoming restaurant events and promotions</p>
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
            <div className="flex items-center justify-between mb-1">
              <Label>Description</Label>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => handleFormat('b')} type="button" title="Bold">
                  <Bold size={14} />
                </Button>
                <Button size="sm" variant="outline" className="h-7 px-2 text-xs" onClick={() => handleFormat('i')} type="button" title="Italic">
                  <Italic size={14} />
                </Button>
              </div>
            </div>
            <Textarea id="event-description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <p className="text-xs text-muted-foreground mt-1">Select text and use formatting buttons, or type HTML directly.</p>
          </div>
        </div>
        <Button className="mt-4" onClick={add}>Add Event</Button>
      </div>

      <div className="mt-8">
        <DataTableControls
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          placeholder="Search events..."
        />
        <div className="mt-4 space-y-3">
          {paginatedItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{formatDate(item.event_date)}</p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => remove(item.id)}>Delete</Button>
            </div>
          ))}
          {paginatedItems.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
}