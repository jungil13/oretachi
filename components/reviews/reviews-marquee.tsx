"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import type { Review } from "@/types/database";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "fill-[#FACC15] text-[#FACC15]" : "text-white/20"}
        />
      ))}
    </div>
  );
}

function ReviewMarqueeCard({ review }: { review: Review }) {
  return (
    <div className="relative mx-3 flex w-[300px] shrink-0 flex-col gap-4 rounded-none border border-white/10 bg-[#0d0d0d] p-6 transition-colors hover:border-[#FACC15]/40 hover:bg-white/5">
      {/* Top accent line */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#FACC15]/40 to-transparent" />

      {/* Reviewer info */}
      <div className="flex items-center gap-3">
        {review.image_url ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10">
            <Image
              src={review.image_url}
              alt={review.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#FACC15]/10 text-sm font-bold text-[#FACC15]">
            {review.name[0].toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-wide text-white">
            {review.name}
          </p>
          <StarRow rating={review.rating} />
        </div>
      </div>

      {/* Review text */}
      <p className="line-clamp-4 text-xs leading-relaxed text-white/65 font-light">
        &ldquo;{review.review}&rdquo;
      </p>
    </div>
  );
}

interface ReviewsMarqueeProps {
  reviews: Review[];
}

export function ReviewsMarquee({ reviews }: ReviewsMarqueeProps) {
  if (!reviews.length) return null;

  // Ensure we have at least 8 cards to fill the viewport nicely
  const padded: Review[] = reviews.length < 8
    ? Array.from({ length: Math.ceil(8 / reviews.length) }, () => reviews).flat()
    : reviews;

  return (
    <div
      className="marquee-track relative w-full overflow-hidden"
      aria-label="Customer reviews carousel"
    >
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

      {/* The track — doubled so we can loop seamlessly */}
      <div className="animate-marquee py-2">
        {/* First copy */}
        {padded.map((review, i) => (
          <ReviewMarqueeCard key={`a-${review.id}-${i}`} review={review} />
        ))}
        {/* Duplicate copy for seamless looping */}
        {padded.map((review, i) => (
          <ReviewMarqueeCard key={`b-${review.id}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}
