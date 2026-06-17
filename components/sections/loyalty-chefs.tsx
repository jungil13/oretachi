"use client";

import Image from "next/image";
import { Award, Users, UtensilsCrossed, Gift } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion";
import { CHEFS } from "@/lib/data/seed";

const STATS = [
  { icon: Award, value: "25+", label: "Years of Experience" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: UtensilsCrossed, value: "30+", label: "Signature Dishes" },
  { icon: Gift, value: "500+", label: "Loyalty Members" },
];

export function LoyaltySection() {
  return (
    <section className="bg-deep-black py-16 text-pure-white md:py-24">
      <div className="page-container">
        <FadeUp className="text-center">
          <p className="text-sm font-medium tracking-widest text-curry-yellow uppercase">
            Curry Club
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
            Loyalty Rewards Program
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pure-white/60">
            Earn points with every visit. Unlock exclusive dishes, birthday treats,
            and priority reservations as a Curry Club member.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="glass rounded-2xl p-6 text-center">
                <stat.icon className="mx-auto mb-3 text-curry-yellow" size={28} />
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
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-2">
          {CHEFS.map((chef, i) => (
            <FadeUp key={chef.name} delay={i * 0.15}>
              <div className="group overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={chef.image}
                    alt={chef.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-medium text-soft-gold">{chef.role}</p>
                  <h3 className="mt-1 text-xl font-bold">{chef.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {chef.bio}
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
