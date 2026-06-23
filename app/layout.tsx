import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteShell } from "@/components/layout/site-shell";
import { GlobalBackground } from "@/components/global-background";
import { ChatbaseWidget } from "@/components/chatbase-widget";

import "./globals.css";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oretachinocurryyacebu.com";
const OG_IMAGE = "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=80";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Oretachino Curry Ya Cebu | Best Japanese Curry Restaurant in Cebu",
    template: "%s | Oretachino Curry Ya Cebu",
  },
  description:
    "Enjoy authentic Osaka-style Japanese curry at Oretachino Curry Ya Cebu. Home of the famous Japanese curry selected among Osaka's top curry destinations. Taste the best curry in Cebu today.",
  keywords: [
    "Japanese Curry Cebu",
    "Best Curry in Cebu",
    "Best Japanese Curry Cebu",
    "Japanese Restaurant Cebu",
    "Katsu Curry Cebu",
    "Oretachino Curry Cebu",
    "Oretachino Curry Ya Cebu",
    "Osaka Curry Cebu",
    "Authentic Japanese Curry Cebu",
    "Best Curry Restaurant Cebu",
    "Pork Katsu Curry",
    "Japanese food Cebu",
    "Ramen Cebu",
  ],
  authors: [{ name: "Oretachino Curry Ya" }],
  creator: "Oretachino Curry Ya",
  publisher: "Oretachino Curry Ya",
  openGraph: {
    title: "Oretachino Curry Ya Cebu | Best Japanese Curry Restaurant in Cebu",
    description:
      "Enjoy authentic Osaka-style Japanese curry at Oretachino Curry Ya Cebu. Taste the best curry in Cebu today.",
    type: "website",
    locale: "en_US",
    siteName: "Oretachino Curry Ya",
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Oretachino Curry Ya – Best Japanese Curry in Cebu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oretachino Curry Ya Cebu | Best Japanese Curry Restaurant in Cebu",
    description: "Authentic Osaka-style Japanese curry in Cebu. Taste the best curry today.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans h-full`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-background text-foreground">
        <GlobalBackground />
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
        <ChatbaseWidget />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Oretachino Curry Ya",
              alternateName: ["Oretachino Curry Ya Cebu", "Oretachino Curry Cebu"],
              description:
                "Enjoy authentic Osaka-style Japanese curry at Oretachino Curry Ya Cebu. Home of the famous Japanese curry selected among Osaka's top curry destinations.",
              url: SITE_URL,
              servesCuisine: ["Japanese", "Curry", "Ramen"],
              priceRange: "₱₱",
              hasMenu: `${SITE_URL}/menu`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Osmeña Boulevard",
                addressLocality: "Cebu City",
                addressRegion: "Cebu",
                addressCountry: "PH",
              },
              telephone: "+63-32-123-4567",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "10:00",
                  closes: "22:00",
                },
              ],
              image: OG_IMAGE,
              sameAs: [],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                bestRating: "5",
                ratingCount: "128",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
