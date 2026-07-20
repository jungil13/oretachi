import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";

// Oretachino Curry Ya Cebu – exact Place ID embed via Maps Embed API
const PLACE_ID = "ChIJS3D_k1yXqTMRs94uOgxfh-8";
const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps/embed/v1/place?key=${MAPS_API_KEY}&q=place_id:${PLACE_ID}&zoom=17`;

// Direct Google Maps deep link to the business
const GOOGLE_MAPS_SEARCH_URL = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;

// Google Write-a-Review link with exact Place ID
const WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

export function GoogleMapsEmbed() {
  return (
    <div className="relative overflow-hidden rounded-none border border-white/10 bg-[#0d0d0d]">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {/* Google colour dots */}
          <div className="flex items-center gap-0.5">
            <span className="h-3 w-3 rounded-full bg-[#4285F4]" />
            <span className="h-3 w-3 rounded-full bg-[#EA4335]" />
            <span className="h-3 w-3 rounded-full bg-[#FBBC05]" />
            <span className="h-3 w-3 rounded-full bg-[#34A853]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Google Reviews
            </h3>
            <p className="text-xs text-white/50">Oretachino Curry Ya — Cebu City</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Star rating badge */}
          <div className="flex items-center gap-1.5 rounded-none border border-[#FACC15]/30 bg-[#FACC15]/5 px-3 py-1.5">
            <Star size={13} className="fill-[#FACC15] text-[#FACC15]" />
            <span className="text-xs font-semibold text-[#FACC15]">Google</span>
          </div>

          {/* Write a review CTA */}
          <Link
            href={WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 border border-[#FACC15] bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#FACC15] transition-all hover:bg-[#FACC15] hover:text-black"
          >
            Write a Review
            <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Open in Maps */}
          <Link
            href={GOOGLE_MAPS_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
          >
            Open in Maps <ExternalLink size={11} />
          </Link>
        </div>
      </div>

      {/* Map embed */}
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9] lg:aspect-[3/1]">
        <iframe
          src={GOOGLE_MAPS_EMBED_URL}
          title="Oretachino Curry Ya on Google Maps"
          className="absolute inset-0 h-full w-full border-0 grayscale"
          style={{ filter: "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.85)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Bottom overlay to blend with dark theme */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
      </div>

      {/* Footer note */}
      <div className="px-6 py-4 text-center">
        <p className="text-xs text-white/40">
          Reviews powered by Google Maps &mdash; tap{" "}
          <Link
            href={WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FACC15]/70 underline underline-offset-2 hover:text-[#FACC15]"
          >
            Write a Review
          </Link>{" "}
          to share your experience on Google.
        </p>
      </div>
    </div>
  );
}
