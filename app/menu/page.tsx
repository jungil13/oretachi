import type { Metadata } from "next";
import { getMenuItems } from "@/lib/queries";
import { MenuPageClient } from "@/components/menu/menu-page-client";

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore our signature Japanese curry dishes, katsu, rice bowls, and more.",
};

export default async function MenuPage() {
  const items = await getMenuItems();
  return <MenuPageClient items={items} />;
}
