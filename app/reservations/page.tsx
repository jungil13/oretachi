import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { FadeUp } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Book a table at Oretachi no Curry-ya in Cebu City.",
};

export default function ReservationsPage() {
  return (
    <div className="page-shell">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <PageHeader
          eyebrow="Book a Table"
          title="Reservations"
          description="Reserve your spot and experience authentic Osaka curry in Cebu."
        />
        <FadeUp delay={0.2}>
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <CalendarDays size={16} className="text-soft-gold" />
            <span>Walk-ins welcome · Groups of 8+ please book ahead</span>
          </div>
          <ReservationForm />
        </FadeUp>
      </div>
    </div>
  );
}
