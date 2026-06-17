import {
  Home,
  Info,
  UtensilsCrossed,
  CalendarDays,
  Images,
  MapPin,
  Star,
  PartyPopper,
  Mail,
  type LucideIcon,
} from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/reservations", label: "Reservations", icon: CalendarDays },
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/location", label: "Location", icon: MapPin },
  { href: "/reviews", label: "Reviews", icon: Star },
  { href: "/events", label: "Events", icon: PartyPopper },
  { href: "/contact", label: "Contact", icon: Mail },
];

export const FOOTER_LINKS = NAV_LINKS.filter((link) => link.href !== "/");
