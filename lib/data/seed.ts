import type { Event, GalleryItem, MenuItem, Review } from "@/types/database";

export const MENU_CATEGORIES = [
  "CURRY RICE",
  "RAMEN",
  "KIDS MENU",
  "TOPPINGS",
  "COFFEE",
  "AKA SIGNATURE DRINK",
  "MATCHA",
  "NON COFFEE",
  "TEA",
] as const;

export const GALLERY_CATEGORIES = ["Food", "Restaurant Interior", "Customers", "Events"] as const;

export const SEED_MENU_ITEMS: Omit<MenuItem, "id" | "created_at">[] = [
  // CURRY RICE
  { name: "PORK CUTLET CURRY", description: "ポークカツカレー", price: 300, image_url: "/images/img (11).jpg", category: "CURRY RICE", spice_level: 1, featured: true },
  { name: "PLAIN CURRY", description: "プレーンカレー", price: 300, image_url: "/images/img (1).jpg", category: "CURRY RICE", spice_level: 1, featured: false },
  { name: "FRIED SHRIMP CURRY", description: "エビフライカレー", price: 300, image_url: "/images/img (2).jpg", category: "CURRY RICE", spice_level: 1, featured: false },
  { name: "SWEET AND SPICY BEEF CURRY", description: "甘辛いビーフカレー", price: 300, image_url: "/images/img (3).jpg", category: "CURRY RICE", spice_level: 2, featured: false },
  { name: "CHICKEN CUTLET CURRY", description: "チキンカツカレー", price: 300, image_url: "/images/img (4).jpg", category: "CURRY RICE", spice_level: 1, featured: false },
  { name: "STEWED CHICKEN CURRY", description: "鶏肉の煮込みカレー", price: 300, image_url: "/images/img (5).jpg", category: "CURRY RICE", spice_level: 1, featured: false },
  { name: "KYOTO GREEN ONION CURRY", description: "京都風青ネギカレー", price: 300, image_url: "/images/img (6).jpg", category: "CURRY RICE", spice_level: 1, featured: false },
  { name: "BRAISED BEEF TENDON CURRY", description: "牛すじの煮込みカレー", price: 300, image_url: "/images/img (7).jpg", category: "CURRY RICE", spice_level: 2, featured: false },
  { name: "EGGPLANT CURRY", description: "ナスカレー", price: 300, image_url: "/images/img (8).jpg", category: "CURRY RICE", spice_level: 1, featured: false },
  { name: "GRILLED CHEESE CURRY", description: "グリルドチーズ カレー", price: 300, image_url: "/images/img (9).jpg", category: "CURRY RICE", spice_level: 1, featured: false },
  { name: "SAUSAGE CURRY", description: "ソーセージカレー", price: 300, image_url: "/images/img (10).jpg", category: "CURRY RICE", spice_level: 1, featured: false },

  // RAMEN
  { name: "Shrimp Miso Curry Ramen", description: "シュリモ味噌カレーラーメン", price: 300, image_url: "/images/img (12).jpg", category: "RAMEN", spice_level: 1, featured: false },
  { name: "Chicken Cutlet Ramen", description: "チキンカツ、半熟卵 ネギ、桜エビラーメン (Soft-boiled Egg, Green Onion, Sakura Shrimp)", price: 300, image_url: "/images/img (14).jpg", category: "RAMEN", spice_level: 1, featured: false },
  { name: "Pork Cutlet Ramen", description: "豚カツ、半熟卵 ネギ、桜エビラーメン (Soft-boiled Egg, Green Onion, Sakura Shrimp)", price: 300, image_url: "/images/img (13).jpg", category: "RAMEN", spice_level: 1, featured: false },

  // KIDS MENU
  { name: "KIDS SET 1", description: "Rice 150g, Chicken karaage 110g, Fries 70g, Curry sauce", price: 300, image_url: "/images/img (19).jpg", category: "KIDS MENU", spice_level: 0, featured: false },
  { name: "KIDS SET 2", description: "Rice 150g, Minchi-katsu topped with curry sauce 110g, Fries 70g, Curry sauce", price: 300, image_url: "/images/img (20).jpg", category: "KIDS MENU", spice_level: 0, featured: false },
  { name: "KIDS SET 3", description: "Rice 150g, Arabiki sausage 2pcs, Fries 70g, Curry sauce", price: 300, image_url: "/images/img (19).jpg", category: "KIDS MENU", spice_level: 0, featured: false },

  // TOPPINGS
  { name: "FRIED SHRIMP (Topping)", description: "エビフライ", price: 100, image_url: "/images/img (2).jpg", category: "TOPPINGS", spice_level: 0, featured: false },
  { name: "PORK CUTLET (Topping)", description: "豚カツ", price: 100, image_url: "/images/img (11).jpg", category: "TOPPINGS", spice_level: 0, featured: false },
  { name: "CHICKEN CUTLET (Topping)", description: "チキンカツ", price: 100, image_url: "/images/img (4).jpg", category: "TOPPINGS", spice_level: 0, featured: false },
  { name: "SAUSAGE (Topping)", description: "ソーセージ", price: 100, image_url: "/images/img (10).jpg", category: "TOPPINGS", spice_level: 0, featured: false },
  { name: "EGGPLANT CURRY (Topping)", description: "ナスカレー", price: 100, image_url: "/images/img (8).jpg", category: "TOPPINGS", spice_level: 0, featured: false },
  { name: "GRILLED CHEESE (Topping)", description: "グリルドチーズ", price: 100, image_url: "/images/img (9).jpg", category: "TOPPINGS", spice_level: 0, featured: false },
  { name: "SOFT-BOILED EGG (Topping)", description: "半熟卵", price: 100, image_url: "/images/img (15).jpg", category: "TOPPINGS", spice_level: 0, featured: false },

  // DRINKS (Coffee)
  { name: "Brewed Coffee", description: "COFFEE", price: 100, image_url: "/images/img (17).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Americano", description: "COFFEE", price: 100, image_url: "/images/img (17).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Latte", description: "COFFEE", price: 100, image_url: "/images/img (17).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Spanish Latte", description: "COFFEE", price: 100, image_url: "/images/img (17).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Flat white", description: "COFFEE", price: 100, image_url: "/images/img (17).jpg", category: "DRINKS", spice_level: 0, featured: false },

  // DRINKS (Signature)
  { name: "Osaka Cream Cloud", description: "AKA SIGNATURE DRINK", price: 100, image_url: "/images/img (18).jpg", category: "DRINKS", spice_level: 0, featured: true },

  // DRINKS (Matcha)
  { name: "Matcha latte", description: "MATCHA", price: 100, image_url: "/images/img (20).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Seasalt foam matcha", description: "MATCHA", price: 100, image_url: "/images/img (20).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Earl grey matcha", description: "MATCHA", price: 100, image_url: "/images/img (20).jpg", category: "DRINKS", spice_level: 0, featured: false },

  // DRINKS (Non Coffee)
  { name: "Iced/hot chocolate", description: "NON COFFEE", price: 100, image_url: "/images/img (17).jpg", category: "DRINKS", spice_level: 0, featured: false },

  // DRINKS (Tea)
  { name: "Chamomile Tea", description: "TEA (Twinnings)", price: 100, image_url: "/images/img (16).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Earl grey Tea", description: "TEA (Twinnings)", price: 100, image_url: "/images/img (16).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Peach Tea", description: "TEA (Twinnings)", price: 100, image_url: "/images/img (16).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Lemon & Ginger Tea", description: "TEA (Twinnings)", price: 100, image_url: "/images/img (16).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Pure Green Tea", description: "TEA (Twinnings)", price: 100, image_url: "/images/img (16).jpg", category: "DRINKS", spice_level: 0, featured: false },
  { name: "Peppermint Tea", description: "TEA (Twinnings)", price: 100, image_url: "/images/img (16).jpg", category: "DRINKS", spice_level: 0, featured: false },
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
    is_approved: true,
  },
  {
    name: "Kenji Tanaka",
    rating: 5,
    review: "Reminds me of home in Osaka. Authentic flavors and generous portions. The staff is warm and welcoming.",
    image_url: null,
    is_approved: true,
  },
  {
    name: "Sarah Lim",
    rating: 4,
    review: "Loved the seafood medley curry and the cozy atmosphere. Can't wait for the Mahi Center location to open!",
    image_url: null,
    is_approved: true,
  },
  {
    name: "James Cruz",
    rating: 5,
    review: "Reserved for a birthday dinner and they made it special. The beef hayashi curry is a must-try.",
    image_url: null,
    is_approved: true,
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
