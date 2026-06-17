"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
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
                ? "fill-curry-yellow text-curry-yellow"
                : "text-muted-foreground/30"
            }
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          {review.image_url ? (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image
                src={review.image_url}
                alt={review.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-curry-yellow/20 text-lg font-bold text-soft-gold">
              {review.name[0]}
            </div>
          )}
          <div>
            <p className="font-semibold">{review.name}</p>
            <StarRating rating={review.rating} />
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
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

    if (!isSupabaseConfigured()) {
      setTimeout(() => {
        setStatus("success");
        setName("");
        setReview("");
        setRating(5);
      }, 1000);
      return;
    }

    const supabase = createClient();
    await supabase.from("reviews").insert({ name, rating, review });
    setStatus("success");
    setName("");
    setReview("");
    setRating(5);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="mb-6 text-xl font-semibold">Share Your Experience</h3>
        {status === "success" ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-8 text-center"
          >
            <div className="stamp-effect mx-auto mb-4 inline-block text-lg">
              ありがとう
            </div>
            <p className="text-muted-foreground">Thank you for your review!</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="review-name">Your Name</Label>
              <Input
                id="review-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Rating</Label>
              <div className="mt-1.5">
                <StarRating rating={rating} onRate={setRating} interactive />
              </div>
            </div>
            <div>
              <Label htmlFor="review-text">Your Review</Label>
              <Textarea
                id="review-text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>
            <Button type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
