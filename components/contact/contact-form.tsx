"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, MapPin } from "lucide-react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!isSupabaseConfigured()) {
      setTimeout(() => {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      }, 1000);
      return;
    }

    const supabase = createClient();
    await supabase.from("contact_messages").insert(form);
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardContent className="p-6 md:p-8">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 text-center"
            >
              <div className="stamp-effect mx-auto mb-4 inline-block">送信完了</div>
              <p className="text-lg font-semibold">Message Sent!</p>
              <p className="mt-2 text-muted-foreground">We&apos;ll get back to you soon.</p>
              <Button className="mt-6" onClick={() => setStatus("idle")}>
                Send Another
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="contact-subject">Subject</Label>
                <Input
                  id="contact-subject"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
              <Button type="submit" size="lg" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold">Follow Us</h3>
            <div className="space-y-3">
              {[
                { icon: Share2, label: "Instagram", href: "https://instagram.com" },
                { icon: Share2, label: "Facebook", href: "https://facebook.com" },
                { icon: MapPin, label: "Google Maps", href: "https://maps.google.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                >
                  <Icon size={20} className="text-curry-yellow" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
