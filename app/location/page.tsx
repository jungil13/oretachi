import type { Metadata } from "next";
import { CONTACT_INFO, BUSINESS_HOURS } from "@/lib/data/seed";
import { FadeUp } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";
import { MapPin, Phone, Mail, Clock, Car, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Location",
    description: "Find Oretachi no Curry-ya in Cebu City, Philippines.",
};

export default function LocationPage() {
    const mapsUrl = CONTACT_INFO.mapUrl || `https://www.google.com/maps?q=${CONTACT_INFO.coordinates.lat},${CONTACT_INFO.coordinates.lng}`;
    const embedUrl = `https://maps.google.com/maps?q=${CONTACT_INFO.coordinates.lat},${CONTACT_INFO.coordinates.lng}&z=15&output=embed`;

    return (
        <div className="page-shell">
            <div className="page-container">
                <PageHeader
                    eyebrow="Visit Us"
                    title="Our Location"
                    description="Cebu City, Philippines — bringing Osaka's finest curry to your neighborhood."
                />

                <div className="grid gap-8 lg:grid-cols-2">
                    <FadeUp>
                        <div className="overflow-hidden rounded-3xl border border-border">
                            <iframe
                                src={embedUrl}
                                width="100%"
                                height="360"
                                className="min-h-[280px] w-full sm:min-h-[360px]"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Oretachi no Curry-ya Location"
                            />
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.15}>
                        <div className="space-y-4 sm:space-y-6">
                            {[
                                { icon: MapPin, label: "Address", value: CONTACT_INFO.address },
                                { icon: Phone, label: "Phone", value: CONTACT_INFO.phone },
                                { icon: Mail, label: "Email", value: CONTACT_INFO.email },
                                { icon: Car, label: "Parking", value: "Complimentary parking for up to 20 vehicles" },
                            ].map(({ icon: Icon, label, value }) => (
                                <div
                                    key={label}
                                    className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-curry-yellow/15">
                                        <Icon size={18} className="text-soft-gold" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{label}</p>
                                        <p className="mt-0.5 font-medium">{value}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="rounded-2xl border border-border bg-card p-5">
                                <div className="mb-4 flex items-center gap-2">
                                    <Clock size={18} className="text-soft-gold" />
                                    <p className="font-medium">Business Hours</p>
                                </div>
                                <div className="space-y-2">
                                    {BUSINESS_HOURS.map((h) => (
                                        <div key={h.day} className="flex justify-between gap-4 text-sm">
                                            <span className="text-muted-foreground">{h.day}</span>
                                            <span className="text-right font-medium">{h.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="w-full">
                                    <Navigation size={18} />
                                    Get Directions
                                </Button>
                            </a>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </div>
    );
}
