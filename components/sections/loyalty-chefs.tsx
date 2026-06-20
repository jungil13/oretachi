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
    <section className="bg-black py-16 md:py-24 border-t border-white/5 relative z-10">
      <div className="page-container">
        <FadeUp className="text-center flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-[#e6c18f]/50"></div>
            <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#e6c18f] uppercase">
              Our Promise
            </p>
            <div className="h-[1px] w-8 bg-[#e6c18f]/50"></div>
          </div>
          <h2 className="font-display text-3xl font-bold md:text-4xl text-white">
            Why Choose Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60 font-light tracking-wide">
            We bring the soul of Osaka curry culture to Cebu — authentic flavors,
            premium ingredients, and heartfelt hospitality in every bowl.
          </p>
        </FadeUp>

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="group border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center transition-all duration-300 hover:border-[#e6c18f]/40 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(230,193,143,0.08)]">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e6c18f]/10 transition-colors group-hover:bg-[#e6c18f]/20">
                  <stat.icon className="text-[#e6c18f]" size={28} />
                </div>
                <p className="font-display text-4xl font-medium text-white mb-2">{stat.value}</p>
                <p className="text-xs font-semibold tracking-wider text-[#e6c18f] uppercase">{stat.label}</p>
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
    <section className="py-16 md:py-24 overflow-hidden relative z-10 bg-black">
      <div className="page-container relative">
        <FadeUp className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-[#e6c18f]/50"></div>
              <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#e6c18f] uppercase">
                Our Team
              </p>
              <div className="h-[1px] w-8 bg-[#e6c18f]/50 md:hidden"></div>
            </div>
            <h2 className="font-display text-3xl font-bold md:text-4xl text-white">
              Meet Our Team
            </h2>
            <p className="mt-4 max-w-xl text-white/60 font-light tracking-wide text-center md:text-left">
              Passionate culinary artisans and staff dedicated to crafting the perfect Japanese curry experience for you.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => scroll('left')}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-transparent hover:border-[#e6c18f] hover:bg-[#e6c18f]/10 transition-all text-white/70 hover:text-[#e6c18f]"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-transparent hover:border-[#e6c18f] hover:bg-[#e6c18f]/10 transition-all text-white/70 hover:text-[#e6c18f]"
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
                <div className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] transition-all duration-300 hover:border-[#e6c18f]/40 hover:shadow-[0_0_30px_rgba(230,193,143,0.1)] flex flex-col h-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-black">
                    <Image
                      src={member.image_url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                      alt={member.name}
                      fill
                      quality={100}
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-[10px] font-bold tracking-[0.2em] text-[#e6c18f] uppercase mb-2">
                        {member.role}
                      </p>
                      <h3 className="font-display text-2xl font-medium leading-tight drop-shadow-md">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
            {team.length === 0 && (
              <p className="w-full text-center text-white/50 py-12 font-light tracking-wide">Loading team members...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
