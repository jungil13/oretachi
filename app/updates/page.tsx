import type { Metadata } from "next";
import { getSocialPosts } from "@/lib/queries";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion";
import { PageHeader } from "@/components/layout/page-header";
import { SocialEmbed } from "@/components/sections/social-embed";
import { Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Latest Updates & Social Feed | Oretachino Curry Ya",
  description: "Stay up to date with the latest news, specials, and social media posts from Oretachino Curry Ya Cebu.",
};

export default async function UpdatesPage() {
  const posts = await getSocialPosts();

  return (
    <div className="page-shell min-h-screen pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <PageHeader
          eyebrow="Social Feed"
          title="Latest Updates"
          description="Follow us on social media for the latest specials, events, and behind-the-scenes content."
        />

        {posts.length === 0 ? (
          <FadeUp delay={0.2} className="mt-12 flex flex-col items-center justify-center py-20 text-center border border-border bg-card/50 rounded-2xl">
            <Share2 className="mb-4 h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-medium text-foreground">No updates yet</h3>
            <p className="mt-2 text-muted-foreground">Check back soon for our latest social media posts!</p>
          </FadeUp>
        ) : (
          <StaggerContainer className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6">
            {posts.map((post) => (
              <StaggerItem key={post.id} className="break-inside-avoid">
                <div className="group flex flex-col overflow-hidden rounded-2xl bg-card transition-all hover:border-curry-yellow/50">
                  <div className="flex items-center justify-between border-b border-border p-4">
                    <div>
                      {post.title && <h3 className="font-medium text-sm text-white">{post.title}</h3>}
                      <p className="mt-1 text-xs uppercase tracking-wider text-white/60">{post.platform}</p>
                    </div>
                  </div>
                  <div className="flex justify-center bg-card p-4">
                    <SocialEmbed embedCode={post.embed_code} platform={post.platform} />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  );
}
