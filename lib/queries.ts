import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  SEED_EVENTS,
  SEED_GALLERY,
  SEED_MENU_ITEMS,
  SEED_REVIEWS,
} from "@/lib/data/seed";
import type { Event, GalleryItem, MenuItem, Review, TeamMember } from "@/types/database";

function withIds<T extends object>(items: T[]): (T & { id: string; created_at: string })[] {
  return items.map((item, i) => ({
    ...item,
    id: `seed-${i}`,
    created_at: new Date().toISOString(),
  }));
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!isSupabaseConfigured()) return withIds(SEED_MENU_ITEMS);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) return withIds(SEED_MENU_ITEMS);
  return data as MenuItem[];
}

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  const items = await getMenuItems();
  return items.filter((item) => item.featured);
}

export async function getReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured()) return withIds(SEED_REVIEWS);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) return withIds(SEED_REVIEWS);
  return data as Review[];
}

export async function getEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) return withIds(SEED_EVENTS);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error || !data?.length) return withIds(SEED_EVENTS);
  return data as Event[];
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured()) return withIds(SEED_GALLERY);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) return withIds(SEED_GALLERY);
  return data as GalleryItem[];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("*");

  if (error || !data) return [];
  return data as TeamMember[];
}
