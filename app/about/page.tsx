"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";

const TIMELINE = [
  {
    title: "Contract Signing",
    description:
      "Mr. Gabino Abejo Jr. and Mr. Naoya Sagimura during the contract signing last March 3, 2025 in Osaka-Shi, Japan",
    image: "/contract.jpg",
  },
  {
    title: "Oretachi No Curry Ya Team",
    description:
      "From left to right, Ms. Elizabeth Frances Abejo (Executive Vice President), Gabino Abejo Jr. (President), Mr. Naoya Sagimura (Owner, Oretachi No Curry Ya), Mr. Kimitoshi Tadatsu (President, Cross Boundaries Japan), and Mr. Haruki Tadatsu",
    image: "/oretachino.jpg",
  },
];

const STATS = [
  { value: "13+", label: "Years of Experience" },
  { value: "50K+", label: "Happy Customers" },
  { value: "30+", label: "Signature Dishes" },
];

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="page-shell">
      <div className="page-container max-w-6xl">

        {/* Header */}
        <PageHeader
          eyebrow="Our Story"
          title="About Us"
          description="Abejo Foods OPC is a newly created company focused on building food, dining, and café brands that deliver quality food, excellent service, value for money, and Instagram-worthy interiors. We are powered by a dedicated team committed to delivering exceptional dining experiences."
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
                  <p className="mt-3 text-muted-foreground">{stat.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="mb-24 space-y-10">
          <FadeUp>
            <div className="rounded-3xl border bg-card p-10 shadow-sm leading-relaxed text-muted-foreground">
              <p className="mb-6">
                <strong>Oretachi No Curry Ya</strong> is a beloved spot in Osaka,
                known for its straightforward approach to Japanese comfort food.
                The restaurant specializes in hearty bowls of curry and ramen noodles,
                offering diners a choice of meat to customize their meal.
                Its casual, counter-style service makes it a convenient choice for both
                locals and visitors seeking authentic Japanese flavors without the fuss.
                With a strong reputation among patrons, this spot is ideal for those
                looking to indulge in satisfying, flavorful dishes in a laid-back setting.
              </p>

              <p>
                Oretachi No Curry Ya has been serving its famous Osaka-style Japanese curry
                for over 13 years. The original restaurant in Nipponbashi, Osaka, has become
                a renowned staple, loved by locals and visitors alike for more than a decade.
              </p>
            </div>
          </FadeUp>
        </section>

        {/* IMAGE TIMELINE */}
        <section className="space-y-16 mb-24">
          {TIMELINE.map((item, i) => {
            const isReversed = i % 2 !== 0;

            return (
              <FadeUp key={item.title}>
                <div
                  className={`flex flex-col gap-8 md:items-center md:gap-12 ${
                    isReversed ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* IMAGE */}
                  <div className="md:w-1/2">
                    <div
                      onClick={() => setSelectedImage(item.image)}
                      className="cursor-pointer overflow-hidden rounded-3xl shadow-md"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-72 w-full object-cover transition duration-300 hover:scale-[1.05]"
                      />
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className="md:w-1/2">
                    <div className="rounded-3xl border border-border bg-card p-8 shadow-sm transition hover:shadow-lg">
                      <h3 className="text-2xl font-bold">{item.title}</h3>
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

        {/* MODAL (OUTSIDE LOOP - FIXED) */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
            />
          </div>
        )}

      </div>
    </div>
  );
}