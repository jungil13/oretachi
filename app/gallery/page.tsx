import type { Metadata } from "next";
import { getGalleryItems } from "@/lib/queries";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { FadeUp } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photos of our dishes, restaurant interior, and events.",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();
  return (
    <div className="page-shell">
      <div className="page-container">
        <PageHeader
          eyebrow="Visual Feast"
          title="Gallery"
          description="A glimpse into our dishes, dining space, and the moments we share with our guests."
        />
        <FadeUp delay={0.2}>
          <MasonryGallery items={items} />
        </FadeUp>
      </div>
    </div>
  );
}
