import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { FadeUp } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Book a Table – Japanese Curry Restaurant Cebu",
  description:
    "Reserve a table at Oretachino Curry Ya, the best Japanese curry restaurant in Cebu City. Easy online booking. Enjoy authentic Osaka-style curry with family and friends.",
  keywords: [
    "Japanese Restaurant Cebu reservation",
    "Book a table Cebu Japanese restaurant",
    "Oretachino Curry Ya Cebu booking",
    "Best Curry Restaurant Cebu",
  ],
  openGraph: {
    title: "Book a Table – Best Japanese Curry Restaurant in Cebu | Oretachino Curry Ya",
    description:
      "Reserve your spot at Oretachino Curry Ya Cebu for an authentic Osaka curry experience.",
  },
};

export default function ReservationsPage() {
  return (
    <div className="page-shell">
      <div className="mx-auto max-w-2xl sm:max-w-3xl md:max-w-4xl px-4 sm:px-6">
        <PageHeader
          eyebrow="Book a Table"
          title="Reservations"
          description="Reserve your spot and experience authentic Osaka curry in Cebu."
        />
        <FadeUp delay={0.2} className="mt-8 space-y-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CalendarDays size={16} className="text-soft-gold" />
            <span>Walk‑ins welcome · Groups of 8+ please book ahead</span>
          </div>
          <ReservationForm />
        </FadeUp>
      </div>
    </div>
  );
}
