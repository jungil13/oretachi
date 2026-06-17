"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Mail, Trash2, Send, CheckCircle2, AlertCircle, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [notif, setNotif] = useState({ type: "", text: "" });

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubscribers(data as Subscriber[]);
  };

  useEffect(() => {
    load();

    // Subscribe to realtime updates
    const supabase = createClient();
    const channel = supabase
      .channel("newsletter_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "newsletter_subscribers" },
        () => {
          load();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("newsletter_subscribers").delete().eq("id", id);
    load();
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribers.length === 0) {
      setNotif({ type: "error", text: "No subscribers to broadcast to." });
      return;
    }
    if (!subject.trim() || !message.trim()) return;

    setSending(true);
    setNotif({ type: "", text: "" });

    try {
      let successCount = 0;
      for (const sub of subscribers) {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: sub.email,
            subject: subject,
            text: message,
          }),
        });
        if (res.ok) {
          successCount++;
        }
      }
      setNotif({ type: "success", text: `Broadcast sent successfully to ${successCount} subscribers!` });
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setNotif({ type: "error", text: `Failed to broadcast: ${err.message}` });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
          <p className="text-sm text-muted-foreground">Manage subscriptions and send updates (Realtime updates)</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2 text-sm font-semibold">
          <Users size={16} className="text-soft-gold" />
          <span>{subscribers.length} Subscribers</span>
        </div>
      </div>

      {notif.text && (
        <div className={`flex items-center gap-2 rounded-xl p-4 text-sm ${notif.type === "error" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
          {notif.type === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{notif.text}</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Send size={18} className="text-soft-gold" />
            Broadcast Update
          </h3>
          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Grand Opening Announcement!"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="message">Message Body</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your email content here..."
                required
                className="mt-1 min-h-[160px]"
              />
            </div>
            <Button type="submit" disabled={sending || subscribers.length === 0}>
              {sending ? "Sending broadcast..." : "Send to All Subscribers"}
            </Button>
          </form>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 h-fit max-h-[500px] overflow-y-auto">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Mail size={18} className="text-soft-gold" />
            Subscriber List
          </h3>
          <div className="space-y-3">
            {subscribers.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between rounded-xl border border-border bg-muted/30 p-3 text-sm">
                <div className="overflow-hidden">
                  <p className="font-medium truncate">{sub.email}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{formatDate(sub.created_at)}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => remove(sub.id)}>
                  <Trash2 size={14} className="text-destructive" />
                </Button>
              </div>
            ))}
            {subscribers.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">No subscribers yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}