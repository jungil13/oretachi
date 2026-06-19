"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { formatDate } from "@/lib/utils";
import { Calendar, Users, Clock, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { reservationStatusEmail } from "@/lib/email-template";
import type { Reservation } from "@/types/database";
import { DataTableControls } from "@/components/admin/data-table-controls";

const ITEMS_PER_PAGE = 10;
const STATUS_CATEGORIES = ["pending", "confirmed", "cancelled", "completed"];

export default function AdminReservationsPage() {
  const [items, setItems] = useState<Reservation[]>([]);
  const [notif, setNotif] = useState({ type: "", text: "" });
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data as Reservation[]);
  };

  useEffect(() => {
    load();
    const supabase = createClient();
    const channel = supabase
      .channel("reservations_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "reservations" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setNotif({ type: "", text: "" });
    const supabase = createClient();
    
    const { error: dbError } = await supabase.from("reservations").update({ status }).eq("id", id);
    if (dbError) {
      setNotif({ type: "error", text: `Failed to update status: ${dbError.message}` });
      return;
    }

    try {
      const preorder = (item as any).preorder;
      const emailData = reservationStatusEmail({
        name: item.name,
        date: item.date,
        time: item.time,
        guests: item.guests,
        status,
        preorder: preorder && Array.isArray(preorder) ? preorder : undefined,
      });

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: item.email,
          subject: emailData.subject,
          text: emailData.text,
          html: emailData.html,
        }),
      });
      setNotif({ type: "success", text: `Status updated to ${status} and client notified.` });
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
      setNotif({ type: "success", text: `Status updated to ${status} (email notification failed).` });
    }
    load();
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("reservations").delete().eq("id", id);
    setDeleteTarget(null);
    load();
  };

  const filteredItems = useMemo(() => {
    let res = items;
    if (category !== "All") {
      res = res.filter(i => i.status === category);
    }
    if (search) {
      const q = search.toLowerCase();
      res = res.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.email.toLowerCase().includes(q) || 
        i.phone.includes(q)
      );
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
      <h1 className="text-2xl font-bold">Reservations</h1>
      
      {notif.text && (
        <div className={`mt-4 flex items-center gap-2 rounded-xl p-4 text-sm ${notif.type === "error" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
          {notif.type === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{notif.text}</span>
        </div>
      )}

      <div className="mt-2">
        <DataTableControls
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={STATUS_CATEGORIES}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          placeholder="Search name, email, or phone..."
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              {["Name", "Contact", "Guests", "Date / Time", "Pre-order", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => {
              const preorder = (item as any).preorder;
              return (
                <tr key={item.id} className="border-b border-border hover:bg-muted/10">
                  <td className="px-4 py-3 font-medium">{item.name}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-muted-foreground">{item.email}</p>
                    <p className="text-xs text-muted-foreground">{item.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-muted-foreground" />
                      {item.guests}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-xs">
                      <Calendar size={12} className="text-muted-foreground" />
                      {formatDate(item.date)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Clock size={12} />
                      {item.time}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {preorder && Array.isArray(preorder) && preorder.length > 0 ? (
                      <div className="max-w-[200px] text-xs">
                        {preorder.map((i: any, idx: number) => (
                          <div key={idx} className="flex justify-between gap-1 text-muted-foreground">
                            <span>{i.name}</span>
                            <span className="font-semibold">x{i.quantity}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="rounded-lg border border-border bg-card px-2 py-1 text-xs"
                    >
                      {STATUS_CATEGORIES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="ghost" onClick={() => setDeleteTarget(item.id)}>
                      <Trash2 size={14} className="text-destructive" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {paginatedItems.length === 0 && (
          <p className="p-8 text-center text-muted-foreground">No reservations found.</p>
        )}
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Reservation"
        description="This will permanently delete this reservation record. The customer will not be notified."
        onConfirm={() => deleteTarget && remove(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}