import type { Metadata } from "next";
import { getFeaturedMenuItems, getReviews } from "@/lib/queries";
import { HeroSection } from "@/components/sections/hero";
import { FeaturedCarousel } from "@/components/sections/featured-carousel";
import { StatsSection, ChefShowcase } from "@/components/sections/loyalty-chefs";
import { FAQSection } from "@/components/sections/faq";
import { NewsletterSection } from "@/components/sections/newsletter";
import { ReviewCard } from "@/components/reviews/review-components";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion";
import { FAQ_ITEMS } from "@/lib/data/seed";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Japanese Curry in Cebu | Oretachino Curry Ya",
  description:
    "Enjoy authentic Osaka-style Japanese curry at Oretachino Curry Ya Cebu. Home of the famous Katsu Curry, Pork Cutlet Curry, and Ramen. Best Japanese curry restaurant in Cebu City.",
  keywords: [
    "Best Japanese Curry Cebu",
    "Japanese Curry Cebu",
    "Oretachino Curry Ya Cebu",
    "Osaka Curry Cebu",
    "Katsu Curry Cebu",
    "Best Curry in Cebu",
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  },
  openGraph: {
    title: "Best Japanese Curry in Cebu | Oretachino Curry Ya",
    description:
      "Authentic Osaka-style Japanese curry. Famous Katsu Curry, Pork Cutlet Curry and Ramen – best curry restaurant in Cebu.",
  },
};


export default async function HomePage() {
  const [featured, reviews] = await Promise.all([
    getFeaturedMenuItems(),
    getReviews(),
  ]);

  return (
    <>
      <HeroSection />

      <div className="bg-black text-white">
        <FeaturedCarousel items={featured} />
        <StatsSection />
        <ChefShowcase />

        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Background Japanese Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      ></div>
          <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <FadeUp className="mb-12 text-center flex flex-col items-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-8 bg-[#FACC15]/50"></div>
                <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#FACC15] uppercase">
                  Testimonials
                </p>
                <div className="h-[1px] w-8 bg-[#FACC15]/50"></div>
              </div>
              <h2 className="font-display text-3xl font-bold md:text-4xl text-white">
                What Our Guests Say
              </h2>
            </FadeUp>
            <StaggerContainer className="grid gap-6 md:grid-cols-3">
              {reviews.slice(0, 3).map((review) => (
                <StaggerItem key={review.id}>
                  <ReviewCard review={review} />
                </StaggerItem>
              ))}
            </StaggerContainer>
            <div className="mt-12 text-center">
              <Link href="/reviews">
                <button className="group relative overflow-hidden border border-[#FACC15] bg-transparent px-8 py-3 transition-all hover:bg-[#FACC15]">
                  <span className="relative z-10 flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#FACC15] transition-colors group-hover:text-black uppercase">
                    All Reviews <ArrowRight size={16} />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 relative">
          {/* Background Japanese Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      ></div>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 relative z-10">
            <FadeUp className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl text-white">FAQ</h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <FAQSection items={FAQ_ITEMS} />
            </FadeUp>
          </div>
        </section>

        <NewsletterSection />
      </div>
    </>
  );
}
