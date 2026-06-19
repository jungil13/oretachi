import type { Metadata } from "next";
import { getEvents } from "@/lib/queries";
import { EventsPageClient } from "@/components/events/events-page-client";

export const metadata: Metadata = {
  title: "Events & Promotions – Japanese Curry Restaurant Cebu",
  description:
    "Stay up to date with events, special promos, and exclusive offers at Oretachino Curry Ya Cebu – the best Japanese curry restaurant in Cebu City.",
  keywords: [
    "Japanese Restaurant Cebu events",
    "Oretachino Curry Ya promotions",
    "Best Curry Restaurant Cebu deals",
  ],
  openGraph: {
    title: "Events & Promotions | Oretachino Curry Ya Cebu",
    description: "Exclusive events and promotions at the best Japanese curry restaurant in Cebu.",
  },
};

export default async function EventsPage() {
  const events = await getEvents();
  return <EventsPageClient events={events} />;
}
