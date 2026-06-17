import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Oretachi no Curry-ya | Authentic Japanese Curry in Cebu",
    template: "%s | Oretachi no Curry-ya",
  },
  description:
    "Loved in Osaka, Coming to Cebu! Experience authentic Japanese curry inspired by Osaka's famous curry houses.",
  keywords: ["Japanese curry", "Osaka curry", "Cebu restaurant", "katsu curry", "authentic Japanese food"],
  openGraph: {
    title: "Oretachi no Curry-ya",
    description: "Loved in Osaka, Coming to Cebu! Authentic Japanese curry experience.",
    type: "website",
    locale: "en_US",
    siteName: "Oretachi no Curry-ya",
    images: [{ url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1200&q=80", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oretachi no Curry-ya",
    description: "Loved in Osaka, Coming to Cebu!",
  },
  robots: { index: true, follow: true },
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
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Oretachi no Curry-ya",
              description: "Authentic Japanese curry restaurant in Cebu City, Philippines",
              servesCuisine: "Japanese",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Osmeña Boulevard",
                addressLocality: "Cebu City",
                addressCountry: "PH",
              },
              telephone: "+63-32-123-4567",
              priceRange: "₱₱",
            }),
          }}
        />
      </body>
    </html>
  );
}
