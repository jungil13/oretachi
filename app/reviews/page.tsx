import type { Metadata } from "next";
import { getReviews } from "@/lib/queries";
import { ReviewCard, ReviewForm } from "@/components/reviews/review-components";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read customer reviews and share your experience at Oretachi no Curry-ya.",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="page-shell">
      <div className="page-container">
        <PageHeader
          eyebrow="Testimonials"
          title="Customer Reviews"
          description="Hear from guests who have experienced our curry — and share your own story."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <StaggerContainer className="grid gap-6 sm:grid-cols-2">
              {reviews.map((review) => (
                <StaggerItem key={review.id}>
                  <ReviewCard review={review} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          <FadeUp delay={0.2} className="lg:sticky lg:top-28 lg:self-start">
            <ReviewForm />
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
