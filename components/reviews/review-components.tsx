"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Loader2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import type { Review } from "@/types/database";

function StarRating({
  rating,
  onRate,
  interactive = false,
}: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(i + 1)}
          aria-label={interactive ? `Rate ${i + 1} stars` : undefined}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            size={interactive ? 24 : 16}
            className={
              i < rating
                ? "fill-[#FACC15] text-[#FACC15]"
                : "text-white/20"
            }
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="h-full bg-[#0a0a0a] border-white/10 text-white shadow-none transition-colors hover:border-[#FACC15]/40 hover:bg-white/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          {review.image_url ? (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10">
              <Image
                src={review.image_url}
                alt={review.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FACC15]/10 text-lg font-bold text-[#FACC15] border border-white/10">
              {review.name[0]}
            </div>
          )}
          <div>
            <p className="font-semibold text-white tracking-wide">{review.name}</p>
            <StarRating rating={review.rating} />
          </div>
        </div>
        <p className="mt-5 text-sm text-white/70 leading-relaxed font-light">
          &ldquo;{review.review}&rdquo;
        </p>
      </CardContent>
    </Card>
  );
}

export function ReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const emailPayload = {
      to: "customer@example.com", // Dummy email, the API requires it, but will send to OWNER_EMAIL anyway if configured
      subject: "Thank you for your review",
      text: "Thank you for your review! It is pending approval.",
      ownerSubject: "⭐ New Review Pending Approval",
      ownerText: `A new review was submitted by ${name} (${rating} stars).\n\nReview:\n${review}\n\nPlease check the admin dashboard to approve it.`,
    };

    if (!isSupabaseConfigured()) {
      setTimeout(async () => {
        try {
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailPayload),
          });
        } catch (e) {
          console.error(e);
        }
        setStatus("success");
        setName("");
        setReview("");
        setRating(5);
      }, 1000);
      return;
    }

    const supabase = createClient();
    await supabase.from("reviews").insert({ name, rating, review, is_approved: false } as any);

    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });
    } catch (e) {
      console.error("Failed to send review email", e);
    }

    setStatus("success");
    setName("");
    setReview("");
    setRating(5);
  };

  return (
    <Card className="bg-[#0a0a0a] border-white/10 text-white overflow-hidden relative">
      {/* Subtle Japanese Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      ></div>
      
      <CardContent className="p-6 relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-xl font-display font-semibold text-white mb-2">Share Your Experience</h3>
          <p className="text-sm text-white/60">We value your feedback to help us serve you better.</p>
        </div>

        {/* QR Code Section */}
        <div className="mb-8 p-6 rounded-xl border border-[#FACC15]/20 bg-white/5 flex flex-col items-center justify-center text-center">
          <div className="bg-white p-2 rounded-lg mb-4 inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__R5MVxlUMzRXTkdDVVBDRlJMNloxT0IxMEsxSFJMTS4u" 
              alt="Customer Feedback QR Code" 
              className="w-32 h-32"
            />
          </div>
          <h4 className="font-semibold text-[#FACC15] mb-1">Scan to Feedback</h4>
          <p className="text-xs text-white/70 mb-3">Scan this QR code with your phone camera.</p>
          
          <div className="flex items-center gap-4 w-full">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-xs uppercase tracking-widest text-white/40">OR</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
          
          <a 
            href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__R5MVxlUMzRXTkdDVVBDRlJMNloxT0IxMEsxSFJMTS4u"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-sm font-medium text-white hover:text-[#FACC15] underline underline-offset-4 transition-colors"
          >
            Click here to add your feedback
          </a>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-xs uppercase tracking-widest text-white/40">OR LEAVE A REVIEW HERE</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        {status === "success" ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-8 text-center bg-white/5 rounded-xl border border-white/10"
          >
            <div className="stamp-effect mx-auto mb-4 inline-block text-lg border-[#FACC15] text-[#FACC15]">
              ありがとう
            </div>
            <p className="text-[#FACC15] font-medium tracking-wide">Thank you for your review!</p>
            <p className="text-white/60 text-sm mt-2 font-light">Your review is pending approval and will appear shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="review-name" className="text-white/70">Your Name</Label>
              <Input
                id="review-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5 bg-white/5 border-white/10 text-white focus-visible:ring-[#FACC15] rounded-none transition-colors hover:border-white/30"
              />
            </div>
            <div>
              <Label className="text-white/70">Rating</Label>
              <div className="mt-2 bg-white/5 p-3 rounded-none border border-white/10 inline-block">
                <StarRating rating={rating} onRate={setRating} interactive />
              </div>
            </div>
            <div>
              <Label htmlFor="review-text" className="text-white/70">Your Review</Label>
              <Textarea
                id="review-text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                className="mt-1.5 bg-white/5 border-white/10 text-white focus-visible:ring-[#FACC15] rounded-none min-h-[100px] transition-colors hover:border-white/30"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-12 mt-2 bg-transparent border border-[#FACC15] text-[#FACC15] font-semibold tracking-[0.2em] uppercase text-xs hover:bg-[#FACC15] hover:text-black transition-all disabled:opacity-50 flex items-center justify-center group"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">Submit Review</span>
              )}
            </button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
