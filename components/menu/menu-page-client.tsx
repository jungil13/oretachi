"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { MENU_CATEGORIES } from "@/lib/data/seed";
import { MenuCard } from "@/components/menu/menu-card";
import { Input, Select } from "@/components/ui/input";
import { FadeUp } from "@/components/animations/motion";
import type { MenuItem } from "@/types/database";

export function MenuPageClient({ items }: { items: MenuItem[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let result = items;
    if (category !== "All") {
      result = result.filter((i) => i.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      default:
        result = [...result].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return result;
  }, [items, search, category, sort]);

  return (
    <div className="page-shell">
      <div className="page-container">
        <FadeUp className="mb-10 text-center md:mb-12">
          <p className="text-sm font-medium tracking-widest text-soft-gold uppercase">Discover</p>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl md:text-5xl">Our Menu</h1>
          <p className="mx-auto mt-4 max-w-3xl font-semibold text-muted-foreground">
            From signature Osaka curry to crispy katsu, explore our handcrafted dishes.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            "A good meal and a good drink have something in common: they make your day a little brighter. We hope our drinks gives you a spark of energy and our food brings you comfort. whatever today holds, may you feel ready for it."
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11"
            />
          </div>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="md:w-48">
            <option value="popular">Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </Select>
        </FadeUp>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setCategory("All")}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === "All"
                ? "bg-curry-yellow text-deep-black"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All
          </button>
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-curry-yellow text-deep-black"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <FadeUp key={item.id} delay={(i % 6) * 0.05}>
              <MenuCard item={item} />
            </FadeUp>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No items found.</p>
        )}
      </div>
    </div>
  );
}
