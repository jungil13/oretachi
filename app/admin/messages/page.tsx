"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea, Label } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Send, CornerDownRight, CheckCircle2, AlertCircle, Trash2, Mail } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { contactReplyEmail } from "@/lib/email-template";
import type { ContactMessage } from "@/types/database";

type MessageWithReply = ContactMessage & {
  reply?: string | null;
  replied_at?: string | null;
};

export default function AdminMessagesPage() {
  const [items, setItems] = useState<MessageWithReply[]>([]);
  const [replyingTo, setReplyingTo] = useState<MessageWithReply | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [notif, setNotif] = useState({ type: "", text: "" });
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const load = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data as MessageWithReply[]);
  };

  useEffect(() => {
    load();

    const supabase = createClient();
    const channel = supabase
      .channel("contact_messages_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_messages" },
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
    await supabase.from("contact_messages").delete().eq("id", id);
    if (replyingTo?.id === id) {
      setReplyingTo(null);
      setReplyText("");
    }
    setDeleteTarget(null);
    load();
  };

  const handleSendReply = async () => {
    if (!replyingTo || !replyText.trim()) return;
    setSendingReply(true);
    setNotif({ type: "", text: "" });

    try {
      const emailData = contactReplyEmail({
        name: replyingTo.name,
        originalSubject: replyingTo.subject,
        originalMessage: replyingTo.message,
        reply: replyText,
      });

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: replyingTo.email,
          subject: emailData.subject,
          text: emailData.text,
          html: emailData.html,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send email");
      }

      const supabase = createClient();
      const { error: dbError } = await supabase
        .from("contact_messages")
        .update({
          reply: replyText,
          replied_at: new Date().toISOString(),
        })
        .eq("id", replyingTo.id);

      if (dbError) {
        console.warn("[Admin Messages] Reply sent but DB update failed:", dbError.message);
      }

      setNotif({ type: "success", text: `Reply sent to ${replyingTo.email}` });
      setReplyingTo(null);
      setReplyText("");
      load();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send reply";
      setNotif({ type: "error", text: message });
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <p className="text-sm text-muted-foreground">
          View and reply to customer inquiries (realtime updates)
        </p>
      </div>

      {notif.text && (
        <div
          className={`flex items-center gap-2 rounded-xl p-4 text-sm ${
            notif.type === "error" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"
          }`}
        >
          {notif.type === "error" ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{notif.text}</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border bg-card p-5 transition-colors ${
                replyingTo?.id === item.id ? "border-curry-yellow" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{item.name}</p>
                    <span className="text-xs text-muted-foreground">{formatDate(item.created_at)}</span>
                    {item.replied_at && (
                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-600">
                        Replied
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.email}</p>
                  <p className="mt-3 font-medium">{item.subject}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.message}</p>
                  {item.reply && (
                    <div className="mt-4 rounded-xl bg-muted/50 p-3 text-sm">
                      <p className="mb-1 flex items-center gap-1 text-xs font-medium text-soft-gold">
                        <CornerDownRight size={12} />
                        Your reply
                      </p>
                      <p className="text-muted-foreground">{item.reply}</p>
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setReplyingTo(item);
                      setReplyText(item.reply || "");
                    }}
                  >
                    <Mail size={14} />
                    Reply
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleteTarget(item.id)}>
                    <Trash2 size={14} className="text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">No messages yet.</p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 h-fit lg:sticky lg:top-24">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Send size={18} className="text-soft-gold" />
            Send Reply
          </h3>
          {replyingTo ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-muted/40 p-3 text-sm">
                <p className="font-medium">To: {replyingTo.name}</p>
                <p className="text-muted-foreground">{replyingTo.email}</p>
                <p className="mt-2 text-xs text-muted-foreground">Re: {replyingTo.subject}</p>
              </div>
              <div>
                <Label htmlFor="reply-text">Reply message</Label>
                <Textarea
                  id="reply-text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  className="mt-1.5 min-h-[160px]"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSendReply}
                  disabled={sendingReply || !replyText.trim()}
                  className="flex-1"
                >
                  {sendingReply ? "Sending..." : "Send Reply"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a message and click Reply to compose a response.
            </p>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Message"
        description="This will permanently delete this contact message and any reply history."
        onConfirm={() => deleteTarget && remove(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
