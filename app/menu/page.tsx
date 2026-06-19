import type { Metadata } from "next";
import { getMenuItems } from "@/lib/queries";
import { MenuPageClient } from "@/components/menu/menu-page-client";

export const metadata: Metadata = {
  title: "Menu – Best Katsu Curry & Japanese Curry Cebu",
  description:
    "Browse the full menu of Oretachino Curry Ya Cebu. Enjoy the best Katsu Curry, Pork Cutlet Curry, Chicken Curry, Ramen, and more authentic Japanese curry dishes in Cebu City.",
  keywords: [
    "Katsu Curry Cebu",
    "Best Japanese Curry Cebu",
    "Japanese Curry Menu Cebu",
    "Pork Cutlet Curry",
    "Authentic Japanese Curry Cebu",
  ],
  openGraph: {
    title: "Menu – Best Katsu Curry & Japanese Curry Cebu | Oretachino Curry Ya",
    description: "Authentic Osaka-style Japanese curry menu. Katsu Curry, Ramen, Rice Bowls and more.",
  },
};

export default async function MenuPage() {
  const items = await getMenuItems();
  return <MenuPageClient items={items} />;
}
