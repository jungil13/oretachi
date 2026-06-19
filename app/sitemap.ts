import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const pages: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "",             priority: 1.0,  freq: "weekly"  },
    { path: "/menu",        priority: 0.95, freq: "weekly"  },
    { path: "/reservations",priority: 0.9,  freq: "monthly" },
    { path: "/about",       priority: 0.85, freq: "monthly" },
    { path: "/team",        priority: 0.85, freq: "weekly"  },
    { path: "/events",      priority: 0.85, freq: "weekly"  },
    { path: "/reviews",     priority: 0.8,  freq: "weekly"  },
    { path: "/gallery",     priority: 0.75, freq: "monthly" },
    { path: "/contact",     priority: 0.75, freq: "monthly" },
    { path: "/location",    priority: 0.75, freq: "monthly" },
  ];

  return pages.map(({ path, priority, freq }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));
}
