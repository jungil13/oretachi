import type { Metadata } from "next";
import Image from "next/image";
import { getTeamMembers } from "@/lib/queries";
import { PageHeader } from "@/components/layout/page-header";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion";

export const metadata: Metadata = {
  title: "Meet Our Team – Oretachino Curry Ya Cebu",
  description: "Meet the passionate culinary artisans and staff dedicated to crafting the perfect Japanese curry experience for you in Cebu City.",
  keywords: ["Oretachino Curry Ya team", "Japanese restaurant staff Cebu", "Best Curry Restaurant Cebu team"],
};

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

export default async function TeamPage() {
  const team = await getTeamMembers();
  
  // Sort by role order
  const sortedTeam = [...team].sort((a, b) => {
    const orderA = ROLE_ORDER[a.role.toUpperCase()] || 99;
    const orderB = ROLE_ORDER[b.role.toUpperCase()] || 99;
    return orderA - orderB;
  });

  return (
    <div className="page-shell">
      <div className="page-container">
        <PageHeader
          eyebrow="Our Team"
          title="Meet Our Experts"
          description="Passionate culinary artisans and staff dedicated to crafting the perfect Japanese curry experience for you."
        />

        {sortedTeam.length > 0 ? (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-20">
            {sortedTeam.map((member) => (
              <StaggerItem key={member.id} className="h-full">
                <div className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:border-soft-gold/40 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted flex-1">
                    <Image
                      src={member.image_url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                      alt={member.name}
                      fill
                      quality={100}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 text-pure-white translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      <p className="text-xs font-bold tracking-widest text-curry-yellow uppercase mb-2 drop-shadow-md">
                        {member.role}
                      </p>
                      <h3 className="text-xl font-bold leading-tight drop-shadow-lg">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <FadeUp className="text-center py-20 text-muted-foreground">
            Loading team members...
          </FadeUp>
        )}
      </div>
    </div>
  );
}
