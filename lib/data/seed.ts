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
  phone: "0325079288",
  email: "oretachinocurryya@gmail.com",
  mapUrl: "https://maps.app.goo.gl/EJmuoDwpE3KesJJD9",
  fbPage: "https://www.facebook.com/OretachinoCurryPhilippines",
  instagram: "https://www.instagram.com/oretachinocurryphilippines/",
  tiktok: "https://www.tiktok.com/@oretachino.curryya",
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
    question: "What does “Oretachi no Curry Ya” mean",
    answer:
      "It means “Our Curry Shop” or “Our Curry House”.",
  },
  {
    question: "What is Oretachi no Curry Ya?",
    answer:
      "Oretachi no Curry Ya is a Japanese Curry restaurant originating from Namba, Osaka, Japan specializing in rich Japanese curry, served with crispy katsu, premium toppings, and curry ramen inspired by Osaka flavors.",
  },
  {
    question: "What does “Oretachi” mean?",
    answer:
      "“Oretachi” means “we” or “us” in Japanese, reflecting the restaurant’s casual, friendly, and approachable personality.",
  },
  {
    question: "What makes Japanese curry different from Indian curry?",
    answer:
      "Japanese curry is thicker, slightly sweet and milder compared to most Indian curries. It is typically served with rice and toppings.",
  },
  {
    question: "What are your best-selling dishes?",
    answer: `Our customers favorites include:<br>
    <ul>
      <li>-Pork Katsu Curry</li>
      <li>-Chicken Katsu Curry</li>
      <li>-Curry Ramen</li>
      <li>-Soft-Boiled egg Curry</li>
      <li>-Beef Tendon Curry</li>
    </ul>`
  },
  {
    question: "Is your curry spicy?",
    answer:
      "Our standard curry is thick, sweet and rich in flavor. If you enjoy spicy, you may request a higher spice level.",
  },
  {
    question: "What is Curry Ramen?",
    answer:
      "Curry ramen combines Japanese ramen noodles with our signature curry sauce, creating a rich and comforting bowl that is popular in Osaka.",
  },
  {
    question: "Can I customize my curry?",
    answer: `Yes! You can add toppings such as:
    <ul>
      <li>-Soft Boiled Egg</li>
      <li>-Cheese</li>
      <li>-Extra vegetables</li>
      <li>-Green Onions</li>
      <li>-Additional curry sauce</li>
    </ul>`,
  },
  {
    question: "Which katsu should I try first?",
    answer:
      "If it is your first visit, we recommend the Pork Katsu Curry. The crispy panko coating and juicy pork pair perfectly with Japanese curry.",
  },
   {
    question: "Do you have vegetarian options?",
    answer:
      "Yes. We offer selected vegetable-based curry options. Please ask our staff for current vegetarian-friendly selections.",
  },
   {
    question: "Is Japanese curry good for kids?",
    answer:
      "Absolutely. Japanese curry is generally mild, savory, and family-friendly, making it popular comfort food for children in Japan.",
  },
   {
    question: "Why is Japanese curry considered comfort food in Japan?",
    answer:
      "Japanese curry is one of Japan’s most beloved home-style meals. Many Japanese people grew up eating curry at home, making it a nostalgic and comforting dish enjoyed by all ages.",
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
