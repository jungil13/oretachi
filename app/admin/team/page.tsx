"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import type { TeamMember } from "@/types/database";
import type { Database } from "@/types/supabase";

// Payload type for Supabase insert/update operations – all fields are optional
type TeamMemberPayload = Partial<TeamMember>;
import { DataTableControls } from "@/components/admin/data-table-controls";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Trash2, Edit } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase.from("team_members").select("*").order("created_at");
    if (data) setItems(data as TeamMember[]);
  };

  useEffect(() => {
    load();
    const supabase = createClient();
    const channel = supabase
      .channel("team_members_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "team_members" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const save = async () => {
    if (!editing?.name || !editing?.role) return;
    const supabase = createClient();
    if (editing.id) {
      const { id, created_at, ...updateData } = editing;
      await supabase.from("team_members").update(updateData as Database["public"]["Tables"]["team_members"]["Update"]).eq("id", editing.id);
    } else {
      const { id, created_at, ...insertData } = editing;
      await supabase.from("team_members").insert(insertData as Database["public"]["Tables"]["team_members"]["Insert"]);
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("team_members").delete().eq("id", id);
    setDeleteTarget(null);
    load();
  };

  const filteredItems = useMemo(() => {
    let res = items;
    if (search) {
      const q = search.toLowerCase();
      res = res.filter(i => i.name.toLowerCase().includes(q) || i.role.toLowerCase().includes(q));
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
          <h1 className="text-2xl font-bold">My Team</h1>
          <p className="text-sm text-muted-foreground">Manage your team members and staff profiles</p>
        </div>
        <Button onClick={() => setEditing({ name: "", role: "", image_url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" })}>
          Add Team Member
        </Button>
      </div>

      {editing && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">{editing.id ? "Edit Team Member" : "New Team Member"}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="mt-1" />
            </div>
            <div>
              <Label>Role</Label>
              <Input value={editing.role ?? ""} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="mt-1" placeholder="e.g. HEAD COOK" />
            </div>
            <div className="md:col-span-2">
              <Label>Profile Image</Label>
              <ImageUpload value={editing.image_url ?? ""} onChange={(url) => setEditing({ ...editing, image_url: url })} className="mt-1" />
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <Button onClick={save}>Save Member</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <DataTableControls
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          placeholder="Search by name or role..."
        />
        <div className="mt-4 space-y-3">
          {paginatedItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full border border-border bg-muted">
                  <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditing(item)}>
                  <Edit size={14} className="mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setDeleteTarget(item.id)}>
                  <Trash2 size={14} className="text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          {paginatedItems.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No team members found.</p>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Remove Team Member"
        description="Are you sure you want to remove this team member? This action cannot be undone."
        onConfirm={() => deleteTarget && remove(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
