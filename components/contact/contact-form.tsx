"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!isSupabaseConfigured()) {
      // Local dev fallback – still attempt to send the email
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: form.email,
            subject: `Thanks for contacting us, ${form.name}!`,
            text: `Hi ${form.name},\n\nThank you for reaching out. We received your message and will get back to you soon.\n\n---\nYour message:\n${form.message}`,
            ownerSubject: `📩 New Contact Message: ${form.subject}`,
            ownerText: `You have a new contact message from ${form.name} (${form.email}).\n\nSubject: ${form.subject}\n\nMessage:\n${form.message}`,
          }),
        });
      } catch (err) {
        console.error("Email send failed (dev fallback):", err);
      }
      setTimeout(() => {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      }, 1000);
      return;
    }

    const supabase = createClient();
    await supabase.from("contact_messages").insert(form);

    // Notify the owner and send a confirmation to the sender
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: form.email,
          subject: `Thanks for contacting us, ${form.name}!`,
          text: `Hi ${form.name},\n\nThank you for reaching out to Oretachi no Curry-ya. We received your message and will get back to you as soon as possible.\n\n---\nYour message:\n${form.message}\n\nBest regards,\nOretachi no Curry-ya`,
          ownerSubject: `📩 New Contact Message: ${form.subject}`,
          ownerText: `You have a new contact message on your website.\n\nFrom: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`,
        }),
      });
    } catch (err) {
      console.error("Failed to send contact email:", err);
    }

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
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        {[
          {
            icon: FaInstagram,
            label: "Instagram",
            href: "https://www.instagram.com/oretachinocurryphilippines",
          },
          {
            icon: FaFacebook,
            label: "Facebook",
            href: "https://www.facebook.com/OretachinoCurryPhilippines",
          },
          {
            icon: MapPin,
            label: "Google Maps",
            href: "https://maps.app.goo.gl/BNpAkkJfa9JgoYuB7",
          },
          {
            icon: FaTiktok,
            label: "TikTok",
            href: "https://www.tiktok.com/@oretachino.curryya",
          },
        ].map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
          >
            <Icon className="h-5 w-5 text-curry-yellow" />
            <span className="text-sm font-medium">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
