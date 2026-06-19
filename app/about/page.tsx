import type { Metadata } from "next";
import { Award } from "lucide-react";
import { FadeUp } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "About Us – Authentic Osaka Japanese Curry Restaurant in Cebu",
  description:
    "Learn the story of Oretachino Curry Ya, born in Osaka's famous Namba district and now bringing authentic Japanese curry to Cebu City, Philippines.",
  keywords: [
    "Japanese Restaurant Cebu",
    "Osaka Curry Cebu",
    "Authentic Japanese Curry Cebu",
    "Oretachino Curry Ya Cebu story",
  ],
  openGraph: {
    title: "About Us – Authentic Osaka Japanese Curry | Oretachino Curry Ya Cebu",
    description: "From Osaka's Namba district to Cebu City – discover our story.",
  },
};

const TIMELINE = [
  {
    title: "Contract Signing",
    description:
      "Mr. Gabino Abejo Jr. and Mr. Naoya Sagimura during the contract signing last March 3, 2025 in Osaka-Shi, Japan",
    image: "/contract.jpg",
  },
  {
    title: "Oretachi No",
    description:
      "From left to right, Ms. Elizabeth Frances Abejo (Executive Vice President), Gabino Abejo Jr. (President), Mr. Naoya Sagimura (Owner, Oretachi No. Curry Ya. Mr. Kimitoshi Tadatsu (President, Cross Boundaries. Japan) and Mr. Haruki Tadatsu",
    image: "/oretachino.jpg",
  },
];

const STATS = [
  { value: "25+", label: "Years of Experience" },
  { value: "50K+", label: "Happy Customers" },
  { value: "30+", label: "Signature Dishes" },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <div className="page-container max-w-6xl">
        {/* Header */}
        <PageHeader
          eyebrow="Our Story"
          title="About Us"
          description="Abejo Foods Opc is a newly created company with a goal to establish different brands in
food, dining, and cafés offering the Filipino market new dining experience thru quality
food, excellent service, value for money and instaworthy interior. We boast of dedicated
people to run the organization and manage the brands we believe."
        />

        {/* Stats */}
        <section className="mb-20">
          <div className="grid gap-6 md:grid-cols-3">
            {STATS.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="group rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <p className="text-4xl font-bold text-curry-yellow">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>
        {/* REPLACED SECTION: Image + Text Layout */}
        <section className="space-y-16 mb-24">
          {TIMELINE.map((item, i) => {
            const isReversed = i % 2 !== 0;

            return (
              <FadeUp key={item.title}>
                <div
                  className={`flex flex-col gap-8 md:items-center md:gap-12 ${isReversed ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                >
                  {/* Image */}
                  <div className="md:w-1/2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-72 w-full rounded-3xl object-cover shadow-md transition duration-300 hover:scale-[1.02]"
                    />
                  </div>

                  {/* Text */}
                  <div className="md:w-1/2">
                    <div className="rounded-3xl border border-border bg-card p-8 shadow-sm transition hover:shadow-lg">

                      <h3 className="mt-2 text-2xl font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-4 leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </section>
      </div>
    </div>
  );
}