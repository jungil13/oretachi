"use client";

import { useEffect, useState } from "react";
import { Star, ExternalLink, Calendar } from "lucide-react";

interface GoogleReviewAuthor {
  displayName: string;
  photoUri?: string;
}

interface GoogleReviewText {
  text: string;
  languageCode: string;
}

interface GoogleReview {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text?: GoogleReviewText;
  originalText?: GoogleReviewText;
  authorAttribution: GoogleReviewAuthor;
  publishTime: string;
}

interface GooglePlaceData {
  displayName?: { text: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
}

export function GoogleReviewsList() {
  const [data, setData] = useState<GooglePlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/google-reviews");
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError("Could not load reviews from Google Maps.");
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-white/60">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-curry-yellow border-t-transparent mb-2"></div>
        <p className="text-sm">Loading Google reviews...</p>
      </div>
    );
  }

  if (error || !data || !data.reviews || data.reviews.length === 0) {
    return null; // Silent fall-through or message
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h4 className="text-lg font-semibold text-white font-display">Recent Reviews on Google Maps</h4>
          <p className="text-sm text-white/50">
            Average Rating: <span className="text-curry-yellow font-bold">{data.rating}</span> ★ ({data.userRatingCount} reviews)
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.reviews.map((review, i) => {
          const author = review.authorAttribution;
          const reviewText = review.text?.text || review.originalText?.text || "";
          
          return (
            <div
              key={i}
              className="relative flex flex-col justify-between rounded-none border border-white/10 bg-[#0d0d0d] p-6 hover:border-[#FACC15]/40 transition-colors"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {author.photoUri ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={author.photoUri}
                      alt={author.displayName}
                      className="h-10 w-10 rounded-full object-cover border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#FACC15]/10 text-sm font-bold text-[#FACC15]">
                      {author.displayName[0]?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h5 className="text-sm font-semibold tracking-wide text-white truncate max-w-[150px]">
                      {author.displayName}
                    </h5>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={12}
                          className={
                            idx < review.rating
                              ? "fill-[#FACC15] text-[#FACC15]"
                              : "text-white/20"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {reviewText ? (
                  <p className="text-xs leading-relaxed text-white/70 font-light line-clamp-6">
                    &ldquo;{reviewText}&rdquo;
                  </p>
                ) : (
                  <p className="text-xs italic text-white/40">Rated without comment</p>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between text-[10px] text-white/40 border-t border-white/5 pt-3">
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {review.relativePublishTimeDescription}
                </span>
                <a
                  href="https://www.google.com/maps/place/?q=place_id:ChIJS3D_k1yXqTMRs94uOgxfh-8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#FACC15]/75 hover:text-[#FACC15] transition-colors"
                >
                  View Map <ExternalLink size={8} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
