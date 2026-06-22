"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Flame, Calendar } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/motion";
import { SEED_MENU_ITEMS } from "@/lib/data/seed";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  spice_level: number;
  featured: boolean;
  created_at?: string;
}

const CATEGORIES = ["All", "CURRY RICE", "RAMEN", "KIDS MENU", "TOPPINGS", "DRINKS"];

const getNormalizedCategory = (category: string): string => {
  const cat = (category || "").toUpperCase();
  if (cat === "CURRY RICE") return "CURRY RICE";
  if (cat === "RAMEN") return "RAMEN";
  if (cat === "KIDS MENU") return "KIDS MENU";
  if (cat === "TOPPINGS") return "TOPPINGS";
  if (
    cat === "DRINKS" ||
    cat === "COFFEE" ||
    cat === "MATCHA" ||
    cat === "NON COFFEE" ||
    cat === "TEA" ||
    cat === "AKA SIGNATURE DRINK" ||
    cat.includes("DRINK") ||
    cat.includes("COFFEE") ||
    cat.includes("TEA") ||
    cat.includes("MATCHA")
  ) {
    return "DRINKS";
  }
  return category;
};

export function MenuPageClient({ items }: { items?: any[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");

  // Normalize items to consistent structure
  const normalizedItems = useMemo<MenuItem[]>(() => {
    const rawList = items && items.length > 0 ? items : SEED_MENU_ITEMS;

    return rawList.map((item, idx) => {
      const id = item.id || `menu-item-${idx}`;
      const category = getNormalizedCategory(item.category);
      
      // Category-specific price fallbacks
      let fallbackPrice = 300;
      if (category === "TOPPINGS" || category === "DRINKS") {
        fallbackPrice = 100;
      }
      const price = item.price === 0 || item.price === undefined ? fallbackPrice : item.price;
      const imageUrl = item.image_url || "/images/img (1).jpg";
      const spiceLevel = item.spice_level ?? 0;
      const featured = !!item.featured;
      const description = item.description || "";

      // Ensure names that have JP translation locally get concatenated nicely
      let displayName = item.name;
      if (item.jpName && item.jpName.trim() && !displayName.includes(item.jpName)) {
        displayName = `${displayName} - ${item.jpName}`;
      }

      return {
        id,
        name: displayName,
        price,
        image_url: imageUrl,
        category,
        spice_level: spiceLevel,
        featured,
        description,
      };
    });
  }, [items]);

  // Group, Sort and Filter Items by Category
  const groupedItems = useMemo(() => {
    let list = normalizedItems;

    // Filter by search query
    if (search.trim()) {
      const query = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    // Sort the list based on selected sort parameter
    const sorted = [...list];
    if (sortBy === "Popular") {
      sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
    } else if (sortBy === "Price: Low to High") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Spice Level") {
      sorted.sort((a, b) => b.spice_level - a.spice_level);
    }

    // Initial group structure
    const groups: Record<string, MenuItem[]> = {
      "CURRY RICE": [],
      "RAMEN": [],
      "KIDS MENU": [],
      "TOPPINGS": [],
      "DRINKS": [],
    };

    // Populate category groups
    sorted.forEach((item) => {
      if (groups[item.category]) {
        groups[item.category].push(item);
      }
    });

    return groups;
  }, [normalizedItems, search, sortBy]);

  // Process Drinks category sub-groupings and Tea Box
  const processedDrinks = useMemo(() => {
    const drinksList = groupedItems["DRINKS"] || [];

    const coffeeItems: MenuItem[] = [];
    const signatureItems: MenuItem[] = [];
    const matchaItems: MenuItem[] = [];
    const nonCoffeeItems: MenuItem[] = [];
    const teaItems: MenuItem[] = [];

    drinksList.forEach((item) => {
      const nameUpper = item.name.toUpperCase();
      const descUpper = item.description.toUpperCase();
      const catUpper = item.category.toUpperCase();

      const isTea = nameUpper.includes("TEA") || descUpper.includes("TEA") || catUpper.includes("TEA");

      if (isTea) {
        teaItems.push(item);
      } else {
        const textToSearch = `${nameUpper} ${descUpper} ${catUpper}`;
        if (textToSearch.includes("MATCHA")) {
          matchaItems.push(item);
        } else if (textToSearch.includes("AKA") || textToSearch.includes("SIGNATURE") || textToSearch.includes("CLOUD")) {
          signatureItems.push(item);
        } else if (textToSearch.includes("CHOCOLATE") || textToSearch.includes("NON COFFEE") || textToSearch.includes("NON-COFFEE")) {
          nonCoffeeItems.push(item);
        } else {
          coffeeItems.push(item);
        }
      }
    });

    let teaBox = null;
    if (teaItems.length > 0) {
      const teaPrice = teaItems[0].price;
      const teaImageUrl = teaItems[0].image_url || "/images/img (16).jpg";
      const teaNames = teaItems.map(item => item.name.replace(" Tea", "").replace(" TEA", ""));
      teaBox = {
        title: "TEA",
        subtitle: "(Tea bags) Twinings brand",
        price: teaPrice,
        image_url: teaImageUrl,
        items: teaNames,
      };
    }

    return {
      subcategories: [
        { title: "COFFEE", items: coffeeItems },
        { title: "AKA SIGNATURE DRINK", items: signatureItems },
        { title: "MATCHA", items: matchaItems },
        { title: "NON COFFEE", items: nonCoffeeItems },
      ].filter(sc => sc.items.length > 0),
      teaBox
    };
  }, [groupedItems]);

  // Determine which categories contain matching items to display
  const categoriesToRender = useMemo(() => {
    if (selectedCategory === "All") {
      return ["CURRY RICE", "RAMEN", "KIDS MENU", "TOPPINGS", "DRINKS"].filter(
        (cat) => {
          if (cat === "DRINKS") {
            return processedDrinks.subcategories.length > 0 || processedDrinks.teaBox !== null;
          }
          return (groupedItems[cat] || []).length > 0;
        }
      );
    } else {
      if (selectedCategory === "DRINKS") {
        const hasDrinks = processedDrinks.subcategories.length > 0 || processedDrinks.teaBox !== null;
        return hasDrinks ? ["DRINKS"] : [];
      }
      return (groupedItems[selectedCategory] || []).length > 0 ? [selectedCategory] : [];
    }
  }, [selectedCategory, groupedItems, processedDrinks]);

  const hasAnyMatches = categoriesToRender.length > 0;

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Japanese Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <FadeUp className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#FACC15] block mb-3">
            DISCOVER
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            Our Menu
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
            From signature Osaka curry to crispy katsu, explore our handcrafted dishes.
          </p>
          <div className="w-16 h-[1px] bg-zinc-800 mx-auto my-6"></div>
          <p className="text-xs sm:text-sm text-neutral-500 font-serif italic max-w-xl mx-auto leading-relaxed px-4">
            &ldquo;A good meal and a good drink have something in common: they make your day a little brighter. 
            We hope our drinks gives you a spark of energy and our food brings you comfort. 
            whatever today holds, may you feel ready for it.&rdquo;
          </p>
        </FadeUp>

        {/* Filter Controls Row */}
        <div className="space-y-6 mb-12 max-w-5xl mx-auto">
          {/* Search & Sort input */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111111]/90 border border-zinc-800/80 rounded-full pl-12 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/20 transition-all duration-300"
              />
            </div>
            <div className="relative w-full sm:w-48 shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#111111]/90 border border-zinc-800/80 rounded-full px-4 py-3 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-[#FACC15]/50 focus:ring-1 focus:ring-[#FACC15]/20 transition-all duration-300 pr-10"
              >
                <option value="Popular">Popular</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Spice Level">Spice Level</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x mask-gradient-x -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-start">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap snap-align-start shrink-0 ${
                    isSelected
                      ? "bg-[#FACC15] text-black shadow-md shadow-[#FACC15]/20 font-bold"
                      : "bg-[#111111]/70 text-neutral-400 hover:text-white border border-zinc-800/60 hover:bg-zinc-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories rendering */}
        {hasAnyMatches ? (
          <StaggerContainer key={`${selectedCategory}-${categoriesToRender.join(",")}`} className="space-y-16 max-w-5xl mx-auto">
            {categoriesToRender.map((catName, index) => {
              const isLast = index === categoriesToRender.length - 1;
              const catItems = groupedItems[catName] || [];

              return (
                <StaggerItem key={catName}>
                  <div className="space-y-8">
                    {/* Category Title Heading */}
                    <div className="border-b border-zinc-850 pb-3 mb-6">
                      <h2 className="text-xl sm:text-2xl font-black tracking-widest text-white flex items-baseline gap-3 uppercase font-sans">
                        {catName}
                        <span className="text-xs font-normal text-zinc-500 font-sans tracking-normal capitalize">
                          {catName === "CURRY RICE" && "• カレーライス"}
                          {catName === "RAMEN" && "• ラーメン"}
                          {catName === "KIDS MENU" && "• キッズメニュー"}
                          {catName === "TOPPINGS" && "• トッピング"}
                          {catName === "DRINKS" && "• ドリンク"}
                        </span>
                      </h2>
                    </div>

                    {/* Rendering Items Grid */}
                    {catName === "DRINKS" ? (
                      <div className="space-y-12">
                        {/* 1. Drinks subcategories */}
                        {processedDrinks.subcategories.map((subcat) => (
                          <div key={subcat.title} className="space-y-6">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#FACC15] block mb-4 border-l-2 border-[#FACC15] pl-3">
                              {subcat.title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {subcat.items.map((item) => (
                                <MenuCard key={item.id} item={item} />
                              ))}
                            </div>
                          </div>
                        ))}

                        {/* 2. TEA (Twinings Brand box in bullets) */}
                        {processedDrinks.teaBox && (
                          <div className="space-y-6">
                            {processedDrinks.subcategories.length > 0 && (
                              <hr className="border-zinc-900/80 my-10" />
                            )}
                            <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#FACC15] block mb-4 border-l-2 border-[#FACC15] pl-3">
                              TEA
                            </h3>
                            <TeaCard teaBox={processedDrinks.teaBox} />
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Generic Category Layout Grid */
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {catItems.map((item) => (
                          <MenuCard key={item.id} item={item} />
                        ))}
                      </div>
                    )}

                    {/* Separator horizontal line */}
                    {!isLast && (
                      <div className="pt-8">
                        <hr className="border-zinc-900/90" />
                      </div>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          <FadeUp className="text-center py-20 max-w-md mx-auto">
            <p className="text-neutral-500 text-sm">No items found matching your filters.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSortBy("Popular");
              }}
              className="mt-4 text-xs font-semibold text-[#FACC15] hover:underline"
            >
              Clear filters
            </button>
          </FadeUp>
        )}
      </div>
    </div>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group flex flex-col h-full bg-zinc-950/40 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700/60 hover:bg-zinc-900/10 transition-all duration-300 backdrop-blur-md">
      {/* Image wrapper */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 shrink-0">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Featured Badge */}
        {item.featured && (
          <span className="absolute top-3 left-3 bg-[#FACC15] text-black text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-md z-10">
            Featured
          </span>
        )}
      </div>

      {/* Card Info Content */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Name & Price */}
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="text-base sm:text-md font-bold text-white tracking-wide leading-snug group-hover:text-[#FACC15] transition-colors duration-300 font-sans">
              {item.name}
            </h3>
            <span className="text-base sm:text-md font-extrabold text-[#FACC15] shrink-0 font-sans">
              {item.price}
            </span>
          </div>

          {/* Category Pill Tag */}
          <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase block mb-3">
            {item.category}
          </span>

          {/* Description */}
          {item.description && (
            <p className="text-xs sm:text-sm font-light text-neutral-400 line-clamp-2 leading-relaxed mb-4">
              {item.description}
            </p>
          )}
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 mt-auto">
          {/* Spice Level indicator */}
          <div className="flex gap-0.5 items-center" title={`Spice Level: ${item.spice_level}/5`}>
            {Array.from({ length: 5 }).map((_, idx) => {
              const isSpicy = idx < item.spice_level;
              return (
                <Flame
                  key={idx}
                  size={14}
                  className={`${
                    isSpicy ? "text-red-500 fill-red-500" : "text-zinc-800"
                  }`}
                />
              );
            })}
          </div>

          {/* Reserve link button */}
          <a
            href="/reservations"
            className="flex items-center gap-1.5 border border-zinc-800 hover:border-white text-xs font-semibold px-4 py-2 rounded-full text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
          >
            <Calendar size={13} />
            <span>Reserve</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function TeaCard({ teaBox }: { teaBox: any }) {
  return (
    <div className="group flex flex-col md:flex-row bg-zinc-950/40 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700/60 hover:bg-zinc-900/10 transition-all duration-300 backdrop-blur-md max-w-3xl mx-auto w-full">
      {/* Image wrapper */}
      <div className="relative aspect-[16/10] md:aspect-auto md:w-2/5 min-h-[220px] overflow-hidden bg-zinc-950 shrink-0">
        <Image
          src={teaBox.image_url}
          alt={teaBox.title}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Card Info Content */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Name & Price */}
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="text-lg font-bold text-white tracking-wide leading-snug group-hover:text-[#FACC15] transition-colors duration-300 font-sans">
              {teaBox.title}
            </h3>
            <span className="text-lg font-extrabold text-[#FACC15] shrink-0 font-sans">
              {teaBox.price}
            </span>
          </div>

          {/* Subtitle / Brand Tag */}
          <span className="text-[10px] font-bold tracking-widest text-[#FACC15] uppercase block mb-4">
            {teaBox.subtitle}
          </span>

          {/* Bulleted Teas list */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {teaBox.items.map((variety: string, idx: number) => (
              <li key={idx} className="text-xs sm:text-sm text-neutral-400 font-light flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] shrink-0"></span>
                <span>{variety}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 mt-auto">
          <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
            Twinings Brand
          </span>

          {/* Reserve link button */}
          <a
            href="/reservations"
            className="flex items-center gap-1.5 border border-zinc-800 hover:border-white text-xs font-semibold px-4 py-2 rounded-full text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
          >
            <Calendar size={13} />
            <span>Reserve</span>
          </a>
        </div>
      </div>
    </div>
  );
}
