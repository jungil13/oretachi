"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Input } from "@/components/ui/input";
import { FadeUp } from "@/components/animations/motion";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const activeEmail = email;

    if (!isSupabaseConfigured()) {
      setTimeout(async () => {
        try {
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: activeEmail,
              subject: "Welcome to the Oretachi no Curry-ya Curry Club!",
              text: `Hello,\n\nThank you for subscribing to Oretachi no Curry-ya updates!\n\nYou'll be the first to know about our grand opening at Mahi Center in Lapu-Lapu City, Cebu. We are bringing the finest authentic Japanese curry from Osaka very soon!\n\nLocation: Mahi Center, Main Rd, MEPZ 1, Lapu-Lapu City, Philippines, 6016\nFacebook Page: https://www.facebook.com/OretachinoCurryPhilippines\n\nWarm regards,\nOretachi no Curry-ya Team`,
            }),
          });
        } catch (err) {
          console.error(err);
        }
        setStatus("success");
        setEmail("");
      }, 1000);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: activeEmail });

    if (error) {
      setStatus("error");
    } else {
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: activeEmail,
            subject: "Welcome to the Oretachi no Curry-ya Curry Club!",
            text: `Hello,\n\nThank you for subscribing to Oretachi no Curry-ya updates!\n\nYou'll be the first to know about our grand opening at Mahi Center in Lapu-Lapu City, Cebu. We are bringing the finest authentic Japanese curry from Osaka very soon!\n\nLocation: Mahi Center, Main Rd, MEPZ 1, Lapu-Lapu City, Philippines, 6016\nFacebook Page: https://www.facebook.com/OretachinoCurryPhilippines\n\nWarm regards,\nOretachi no Curry-ya Team`,
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send welcome email:", emailErr);
      }
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24 border-t border-white/5 relative z-10 bg-black">
      {/* Background Japanese Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      ></div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <FadeUp>
          <Mail className="mx-auto mb-6 text-[#FACC15]" size={40} strokeWidth={1} />
          <h2 className="font-display text-3xl font-bold md:text-4xl text-white">
            Join Our Curry Club
          </h2>
          <p className="mt-4 text-white/60 font-light tracking-wide">
            Subscribe for exclusive offers, new menu alerts, and loyalty rewards.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#FACC15] h-14 px-6 rounded-none transition-colors hover:border-white/20"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="h-14 px-8 bg-[#FACC15] text-black font-semibold tracking-[0.2em] uppercase text-xs hover:bg-white hover:text-black transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {status === "success" && (
            <p className="mt-4 text-sm font-medium tracking-wide text-[#FACC15]">Welcome to the Curry Club!</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm font-medium tracking-wide text-red-400">Something went wrong. Please try again.</p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
