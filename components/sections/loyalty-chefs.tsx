"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Award, Users, UtensilsCrossed, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion";
import { createClient } from "@/lib/supabase/client";
import type { TeamMember } from "@/types/database";

const STATS = [
  { icon: Award, value: "25+", label: "Years of Experience" },
  { icon: Users, value: "50K+", label: "Happy Customers" },
  { icon: UtensilsCrossed, value: "30+", label: "Signature Dishes" },
  { icon: Flame, value: "48hr", label: "Slow-Cooked Roux" },
];

const ROLE_ORDER: Record<string, number> = {
  "RESTAURANT MANAGER": 1,
  "SHIFT MANAGER": 2,
  "HEAD COOK": 3,
  "KITCHEN CREW": 4,
  "BARISTA": 5,
  "CASHIER": 6,
  "DINING CREW": 7,
  "BACK-UP CREW": 8,
};

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
  const [team, setTeam] = useState<TeamMember[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("team_members").select("*");
      if (data) {
        const sorted = (data as TeamMember[]).sort((a, b) => {
          const orderA = ROLE_ORDER[a.role.toUpperCase()] || 99;
          const orderB = ROLE_ORDER[b.role.toUpperCase()] || 99;
          return orderA - orderB;
        });
        setTeam(sorted);
      }
    };
    fetchTeam();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const el = scrollContainerRef.current;
      if (direction === 'right') {
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 4000); // Auto-slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="page-container relative">
        <FadeUp className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium tracking-widest text-soft-gold uppercase">
              Our Team
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Passionate culinary artisans and staff dedicated to crafting the perfect Japanese curry experience for you.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-border bg-card hover:bg-muted transition-colors text-foreground"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-border bg-card hover:bg-muted transition-colors text-foreground"
              aria-label="Scroll Right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </FadeUp>

        <div className="-mx-4 md:mx-0">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 md:px-0 pb-8 pt-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {team.map((member, i) => (
              <FadeUp key={member.id} delay={i * 0.05} className="snap-start shrink-0 w-[280px] sm:w-[320px]">
                <div className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-soft-gold/40 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 280px, 320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black/80 via-deep-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 text-pure-white translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-xs font-bold tracking-widest text-curry-yellow uppercase mb-2">
                        {member.role}
                      </p>
                      <h3 className="text-xl font-bold leading-tight drop-shadow-md">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
            {team.length === 0 && (
              <p className="w-full text-center text-muted-foreground py-12">Loading team members...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
