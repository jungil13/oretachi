import type { Event, GalleryItem, MenuItem, Review } from "@/types/database";

export const MENU_CATEGORIES = [
  "CURRY RICE",
  "RAMEN",
  "KIDS MENU",
  "TOPPINGS",
  "DRINKS",
] as const;

export const GALLERY_CATEGORIES = ["Food", "Restaurant Interior", "Customers", "Events"] as const;

export const SEED_MENU_ITEMS: Omit<MenuItem, "id" | "created_at">[] = [
  {
    name: "Osaka Signature Curry",
    description: "Our legendary house blend with 12 secret spices, slow-cooked for 48 hours.",
    price: 450,
    image_url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
    category: "Signature Curry",
    spice_level: 2,
    featured: true,
  },
  {
    name: "Premium Katsu Curry",
    description: "Crispy panko pork cutlet served over fragrant Japanese rice with rich curry.",
    price: 520,
    image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    category: "Katsu Curry",
    spice_level: 1,
    featured: true,
  },
  {
    name: "Beef Hayashi Curry",
    description: "Tender beef simmered in a demi-glace curry sauce with mushrooms and onions.",
    price: 580,
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    category: "Beef Curry",
    spice_level: 2,
    featured: true,
  },
  {
    name: "Chicken Nanban Curry",
    description: "Southern-style fried chicken with tartar sauce over our signature curry.",
    price: 480,
    image_url: "https://images.unsplash.com/photo-1588166524941-3bf61a837559?w=800&q=80",
    category: "Chicken Curry",
    spice_level: 2,
    featured: false,
  },
  {
    name: "Seafood Medley Curry",
    description: "Fresh prawns, scallops, and fish in a creamy coconut-infused curry.",
    price: 650,
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    category: "Seafood Curry",
    spice_level: 1,
    featured: false,
  },
  {
    name: "Vegetable Katsu Curry",
    description: "Seasonal vegetables in crispy panko over rice with mild golden curry.",
    price: 420,
    image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    category: "Katsu Curry",
    spice_level: 0,
    featured: false,
  },
  {
    name: "Spicy Beef Keema Curry",
    description: "Minced beef with peas and carrots in a bold, aromatic curry roux.",
    price: 490,
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    category: "Beef Curry",
    spice_level: 3,
    featured: false,
  },
  {
    name: "Curry Rice Bowl",
    description: "Classic Japanese curry over steamed rice with pickled ginger on the side.",
    price: 380,
    image_url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
    category: "Rice Bowls",
    spice_level: 1,
    featured: false,
  },
  {
    name: "Cheese Katsu Curry",
    description: "Melted cheese over crispy katsu with our signature curry sauce.",
    price: 550,
    image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    category: "Katsu Curry",
    spice_level: 1,
    featured: true,
  },
  {
    name: "Gyoza (6 pcs)",
    description: "Pan-fried pork dumplings with tangy dipping sauce.",
    price: 180,
    image_url: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80",
    category: "Appetizers",
    spice_level: 0,
    featured: false,
  },
  {
    name: "Matcha Ice Cream",
    description: "Premium Uji matcha soft serve with sweet red bean.",
    price: 150,
    image_url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    category: "Desserts",
    spice_level: 0,
    featured: false,
  },
  {
    name: "Japanese Iced Coffee",
    description: "Slow-drip Kyoto-style coffee served over ice.",
    price: 120,
    image_url: "https://images.unsplash.com/photo-1461023058943-f07a80be3440?w=800&q=80",
    category: "Drinks",
    spice_level: 0,
    featured: false,
  },
];

export const SEED_GALLERY: Omit<GalleryItem, "id" | "created_at">[] = [
  {
    image_url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
    category: "Food",
    title: "Signature Curry Bowl",
  },
  {
    image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    category: "Food",
    title: "Premium Katsu Curry",
  },
  {
    image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    category: "Restaurant Interior",
    title: "Warm Dining Space",
  },
  {
    image_url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    category: "Restaurant Interior",
    title: "Counter Seating",
  },
  {
    image_url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    category: "Customers",
    title: "Family Dinner",
  },
  {
    image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    category: "Events",
    title: "Curry Tasting Night",
  },
];

export const SEED_REVIEWS: Omit<Review, "id" | "created_at">[] = [
  {
    name: "Maria Santos",
    rating: 5,
    review: "The katsu curry is incredible — crispy, juicy, and the sauce is perfectly balanced. Best Japanese curry in Cebu!",
    image_url: null,
  },
  {
    name: "Kenji Tanaka",
    rating: 5,
    review: "Reminds me of home in Osaka. Authentic flavors and generous portions. The staff is warm and welcoming.",
    image_url: null,
  },
  {
    name: "Sarah Lim",
    rating: 4,
    review: "Loved the seafood medley curry and the cozy atmosphere. Can't wait for the Mahi Center location to open!",
    image_url: null,
  },
  {
    name: "James Cruz",
    rating: 5,
    review: "Reserved for a birthday dinner and they made it special. The beef hayashi curry is a must-try.",
    image_url: null,
  },
];

export const SEED_EVENTS: Omit<Event, "id" | "created_at">[] = [
  {
    title: "Grand Opening — Mahi Center",
    description:
      "Join us for the grand opening of Oretachi no Curry-ya at Mahi Center, Lapu-Lapu City. Free curry tasting for the first 100 guests!",
    image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    event_date: "2026-07-15T10:00:00Z",
  },
  {
    title: "Curry Spice Masterclass",
    description:
      "Learn the art of Japanese curry roux from our head chef. Limited seats — includes a full curry lunch.",
    image_url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    event_date: "2026-08-20T14:00:00Z",
  },
  {
    title: "Weekend Katsu Special",
    description: "20% off all katsu curry dishes every Saturday and Sunday throughout August.",
    image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    event_date: "2026-08-01T00:00:00Z",
  },
  {
    title: "Curry Club Launch Party",
    description:
      "Sign up for our loyalty program and enjoy exclusive perks, birthday treats, and priority reservations.",
    image_url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    event_date: "2026-09-01T18:00:00Z",
  },
];

export const CONTACT_INFO = {
  address: "Mahi Center, Main Rd, MEPZ 1, Lapu-Lapu City, Cebu, Philippines 6016",
  phone: "+63 917 123 4567",
  email: "oretachinocurryya@gmail.com",
  mapUrl: "https://www.google.com/maps/search/Mahi+Center+Lapu-Lapu+City+Cebu",
  fbPage: "https://www.facebook.com/OretachinoCurryPhilippines",
  coordinates: {
    lat: 10.3173,
    lng: 123.9789,
  },
};

export const BUSINESS_HOURS = [
  { day: "Monday – Thursday", hours: "11:00 AM – 9:00 PM" },
  { day: "Friday – Saturday", hours: "11:00 AM – 10:00 PM" },
  { day: "Sunday", hours: "10:00 AM – 9:00 PM" },
];

export const FAQ_ITEMS = [
  {
    question: "Do you accept walk-ins or reservations only?",
    answer:
      "We welcome both! Reservations are recommended for groups of 4 or more and during peak hours, but walk-ins are always welcome subject to availability.",
  },
  {
    question: "Can I adjust the spice level of my curry?",
    answer:
      "Absolutely. All our curries can be customized from mild (level 0) to extra spicy (level 3). Just let your server know when ordering.",
  },
  {
    question: "Do you offer vegetarian or vegan options?",
    answer:
      "Yes! Our Vegetable Katsu Curry and several rice bowl options can be made vegan upon request. Please inform our staff of any dietary requirements.",
  },
  {
    question: "Do you offer catering or private dining?",
    answer:
      "Yes! We offer private dining for special occasions and catering services for events. Contact us at least 48 hours in advance to discuss your requirements.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, all major credit and debit cards, and GCash/Maya. We also accept corporate accounts for regular customers.",
  },
];

export const CHEFS = [
  {
    name: "Chef Hiroshi Yamamoto",
    role: "Head Chef & Founder",
    bio: "Trained in Osaka for over 15 years, Chef Hiroshi brings authentic Japanese curry traditions to the Philippines with passion and precision.",
    image: "/images/chef-hiroshi.jpg",
    quote: "Every bowl of curry tells a story — ours begins in Osaka.",
  },
  {
    name: "Chef Ana Reyes",
    role: "Sous Chef",
    bio: "A Cebu native with a love for fusion cuisine, Chef Ana crafts seasonal specials that blend local ingredients with classic Japanese techniques.",
    image: "/images/chef-ana.jpg",
    quote: "The best recipes are born where cultures meet.",
  },
];
