"use client";

import Image from "next/image";
import { Award, Users, UtensilsCrossed, Flame } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion";
import { CHEFS } from "@/lib/data/seed";

const STATS = [
  { icon: Award, value: "25+", label: "Years of Experience" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: UtensilsCrossed, value: "30+", label: "Signature Dishes" },
  { icon: Flame, value: "48hr", label: "Slow-Cooked Roux" },
];

export function StatsSection() {
  return (
    <section className="bg-deep-black py-16 text-pure-white md:py-24">
      <div className="page-container">
        <FadeUp className="text-center">
          <p className="text-sm font-medium tracking-widest text-curry-yellow uppercase">
            Our Promise
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Why Choose Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pure-white/60">
            We bring the soul of Osaka curry culture to Cebu — authentic flavors,
            premium ingredients, and heartfelt hospitality in every bowl.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="group glass rounded-2xl p-6 text-center transition-all duration-300 hover:border-curry-yellow/30 hover:shadow-[0_0_30px_rgba(255,193,7,0.08)]">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-curry-yellow/10 transition-colors group-hover:bg-curry-yellow/20">
                  <stat.icon className="text-curry-yellow" size={26} />
                </div>
                <p className="text-3xl font-bold text-curry-yellow">{stat.value}</p>
                <p className="mt-1 text-sm text-pure-white/60">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export function ChefShowcase() {
  return (
    <section className="py-16 md:py-24">
      <div className="page-container">
        <FadeUp className="mb-12 text-center">
          <p className="text-sm font-medium tracking-widest text-soft-gold uppercase">
            Our Team
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Meet Our Chefs
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Passionate culinary artisans dedicated to crafting the perfect Japanese curry experience.
          </p>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-2">
          {CHEFS.map((chef, i) => (
            <FadeUp key={chef.name} delay={i * 0.15}>
              <div className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-soft-gold/40 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={chef.image}
                    alt={chef.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <p className="text-sm font-medium text-soft-gold">{chef.role}</p>
                  <h3 className="mt-1 text-xl font-bold">{chef.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {chef.bio}
                  </p>
                  <p className="mt-3 text-xs italic text-muted-foreground/70">
                    &ldquo;{chef.quote}&rdquo;
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
