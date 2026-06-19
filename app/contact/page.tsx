import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { FadeUp } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";
import { CONTACT_INFO } from "@/lib/data/seed";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us – Japanese Curry Restaurant Cebu",
  description:
    "Contact Oretachino Curry Ya Cebu for reservations, inquiries, and catering. Find us in Cebu City for the best Japanese curry experience.",
  keywords: ["Contact Japanese Restaurant Cebu", "Oretachino Curry Ya contact", "Best Curry Restaurant Cebu contact"],
  openGraph: {
    title: "Contact Us – Oretachino Curry Ya | Japanese Curry Restaurant Cebu",
    description: "Reach out to Oretachino Curry Ya Cebu for bookings, events, and more.",
  },
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <div className="page-container">
        <PageHeader
          eyebrow="Get in Touch"
          title="Contact Us"
          description="Questions about reservations, events, or catering? Our team is happy to help."
        />

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: MapPin, label: "Address", value: CONTACT_INFO.address },
            { icon: Phone, label: "Phone", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}` },
            { icon: Mail, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
          ].map(({ icon: Icon, label, value, href }) => (
            <FadeUp key={label}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-curry-yellow/15">
                  <Icon size={18} className="text-soft-gold" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block text-sm font-medium transition-colors hover:text-soft-gold">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2}>
          <ContactForm />
        </FadeUp>
      </div>
    </div>
  );
}
