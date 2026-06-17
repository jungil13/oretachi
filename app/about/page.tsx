import type { Metadata } from "next";
import { Award } from "lucide-react";
import { FadeUp } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "About Us",
  description: "Discover the story of Oretachi no Curry-ya — from Osaka roots to Cebu expansion.",
};

const TIMELINE = [
  { year: "1998", title: "Osaka Origins", description: "Founded in Namba district, Osaka by Chef Hiroshi Yamamoto with a dream to share authentic curry." },
  { year: "2005", title: "First Expansion", description: "Opened our second location in Dotonbori, becoming a local favorite among Osaka residents." },
  { year: "2015", title: "Award Recognition", description: "Received the Osaka Curry Excellence Award for our signature 12-spice blend." },
  { year: "2024", title: "Cebu Announcement", description: "Announced our first international location in Cebu City, Philippines." },
  { year: "2026", title: "Grand Opening Cebu", description: "Bringing the taste of Osaka to the heart of Cebu City." },
];

const STATS = [
  { value: "25+", label: "Years of Experience" },
  { value: "50K+", label: "Happy Customers" },
  { value: "30+", label: "Signature Dishes" },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <div className="page-container">
        <PageHeader
          eyebrow="Our Story"
          title="About Us"
          description="Born in the bustling streets of Osaka, Oretachi no Curry-ya has been serving authentic Japanese curry for over two decades. Our name means “Our Curry House” — a promise of warmth, tradition, and unforgettable flavors."
        />

        <div className="mb-16 grid gap-4 sm:grid-cols-3 sm:gap-6 md:mb-20">
          {STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
                <p className="text-3xl font-bold text-curry-yellow sm:text-4xl">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">{stat.label}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mb-10 flex items-center justify-center gap-2 md:mb-12">
          <Award size={22} className="text-soft-gold" />
          <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">Our Journey</h2>
        </FadeUp>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-border md:left-1/2" />
          {TIMELINE.map((item, i) => (
            <FadeUp key={item.year} delay={i * 0.1}>
              <div
                className={`relative mb-8 flex items-start gap-4 sm:mb-12 sm:gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden flex-1 md:block" />
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-curry-yellow text-xs font-bold text-deep-black sm:h-12 sm:w-12 sm:text-sm">
                  {item.year.slice(2)}
                </div>
                <div className="flex-1 rounded-2xl border border-border bg-card p-5 sm:p-6">
                  <p className="text-sm font-medium text-soft-gold">{item.year}</p>
                  <h3 className="mt-1 text-base font-bold sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
