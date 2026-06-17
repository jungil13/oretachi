import type { Metadata } from "next";
import { getEvents } from "@/lib/queries";
import { EventsPageClient } from "@/components/events/events-page-client";

export const metadata: Metadata = {
  title: "Events & Promotions",
  description: "Upcoming events, promotions, and special offers at Oretachi no Curry-ya.",
};

export default async function EventsPage() {
  const events = await getEvents();
  return <EventsPageClient events={events} />;
}
