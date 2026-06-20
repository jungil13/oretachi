export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  special_request: string | null;
  status: ReservationStatus;
  created_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  spice_level: number;
  featured: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  title: string;
  created_at: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  image_url: string | null;
  is_approved?: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  image_url: string;
  event_date: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  reply?: string | null;
  replied_at?: string | null;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  created_at: string;
}
