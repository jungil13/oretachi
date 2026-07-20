import { NextResponse } from "next/server";

const PLACE_ID = "ChIJS3D_k1yXqTMRs94uOgxfh-8";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://oretachinocurryyacebu.com";

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Google Maps API key not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}`,
      {
        headers: {
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
          // Include Referer + Origin so keys with HTTP-referrer restrictions pass
          Referer: SITE_URL,
          Origin: SITE_URL,
        },
        next: { revalidate: 3600 }, // cache for 1 hour
      }
    );

    const text = await res.text();

    if (!res.ok) {
      // Print the full Google error to the server terminal so you can diagnose it
      console.error(
        `[google-reviews] Places API ${res.status} →`,
        text.slice(0, 800)
      );
      return NextResponse.json(
        { error: `Places API ${res.status}`, detail: text },
        { status: res.status }
      );
    }

    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error("[google-reviews] Fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
