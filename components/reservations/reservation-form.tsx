"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, Select } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { UtensilsCrossed, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import type { MenuItem } from "@/types/database";

const TIME_SLOTS = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
  "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM",
];

export function ReservationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    special_request: "",
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Record<string, { name: string; price: number; quantity: number }>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [showModal, setShowModal] = useState(false);

  // Load menu items for pre-ordering
  useEffect(() => {
    const fetchMenu = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("menu_items").select("*").order("name");
      if (data && data.length > 0) {
        setMenuItems(data as MenuItem[]);
      } else {
        const { SEED_MENU_ITEMS } = await import("@/lib/data/seed");
        setMenuItems(SEED_MENU_ITEMS.map((item, idx) => ({
          ...item,
          id: `fallback-${idx}`,
          created_at: "",
        }) as MenuItem));
      }
    };
    fetchMenu();
  }, []);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const current = prev[item.id];
      return {
        ...prev,
        [item.id]: {
          name: item.name,
          price: item.price,
          quantity: current ? current.quantity + 1 : 1,
        },
      };
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const newQty = current.quantity + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: {
          ...current,
          quantity: newQty,
        },
      };
    });
  };

  const cartItems = Object.entries(cart).map(([id, details]) => ({
    id,
    ...details,
  }));

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const minDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const preorderList = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    if (!isSupabaseConfigured()) {
      setTimeout(async () => {
        try {
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: form.email,
              subject: "Table Reservation Request Received - Oretachi no Curry-ya",
              text: `
            Dear ${form.name},
            
            Thank you for requesting a table at Oretachi no Curry-ya!
            
            Reservation Details:
            Name: ${form.name}
            Guests: ${form.guests}
            Date: ${form.date}
            Time: ${form.time}
            
            Pre-ordered Items:
            ${cartItems
                  .map(
                    (c) =>
                      `- ${c.name} x${c.quantity} (₱${c.price * c.quantity})`
                  )
                  .join("\n")}
            
            Total: ₱${cartTotal}
            
            Status: PENDING
            
            We will review and confirm your reservation shortly.
            
            Warm regards,
            Oretachi no Curry-ya Team
            `,
              ownerText: `
            🔔 NEW RESERVATION RECEIVED
            
            Customer Name: ${form.name}
            Customer Email: ${form.email}
            Phone Number: ${form.phone}
            
            Guests: ${form.guests}
            Date: ${form.date}
            Time: ${form.time}
            
            Special Request:
            ${form.special_request || "None"}
            
            Pre-Ordered Items:
            ${cartItems
                  .map(
                    (c) =>
                      `- ${c.name} x${c.quantity} = ₱${c.price * c.quantity}`
                  )
                  .join("\n")}
            
            Total Preorder: ₱${cartTotal}
            `,
            }),
          });
        } catch (err) {
          console.error(err);
        }
        setStatus("success");
        setShowModal(true);
      }, 1000);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.from("reservations").insert({
      ...form,
      guests: parseInt(form.guests),
      status: "pending",
      preorder: preorderList,
    } as any);

    if (!error) {
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: form.email,
            subject: "Table Reservation Request Received - Oretachi no Curry-ya",
            text: `Dear ${form.name},\n\nThank you for requesting a table at Oretachi no Curry-ya!\n\nWe have received your reservation request for ${form.guests} guests on ${form.date} at ${form.time}.\n\nPre-ordered items:\n${cartItems.map((c) => `- ${c.name} x${c.quantity} (${c.price * c.quantity} PHP)`).join("\n")}\nTotal: ${cartTotal} PHP\n\nStatus: PENDING (We will review and confirm your booking soon via email)\n\nWarm regards,\nOretachi no Curry-ya Team`,
          }),
        });
      } catch (emailErr) {
        console.error("Failed to send reservation confirmation email:", emailErr);
      }
      setStatus("success");
      setShowModal(true);
    } else {
      console.error(error);
      setStatus("idle");
    }
  };

  return (
    <>
      {/* Force all inputs/selects/textareas inside this form to respect container width */}
      <style>{`
        .reservation-form input,
        .reservation-form select,
        .reservation-form textarea {
          box-sizing: border-box !important;
          max-width: 100% !important;
          width: 100% !important;
        }
      `}</style>
      <Card className="w-full max-w-full overflow-hidden glass">
        <CardContent className="p-3 sm:p-6 md:p-8 box-border">
          <form onSubmit={handleSubmit} className="reservation-form space-y-4 sm:space-y-6 w-full">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 w-full">
              <div className="space-y-3 sm:space-y-4 min-w-0 w-full">
                <h3 className="text-base sm:text-lg font-semibold border-b pb-2">1. Booking Details</h3>
                <div className="w-full">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    className="mt-1 w-full max-w-full box-border"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="email">
                    Email <span className="text-green-500 text-xs">(We'll send you updates)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    className="mt-1 w-full max-w-full box-border"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    required
                    className="mt-1 w-full max-w-full box-border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <div className="min-w-0">
                    <Label htmlFor="guests">Guests</Label>
                    <Select
                      id="guests"
                      value={form.guests}
                      onChange={(e) => update("guests", e.target.value)}
                      className="mt-1 w-full max-w-full box-border"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="min-w-0">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      min={minDate}
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      required
                      className="mt-1 w-full max-w-full box-border"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Label htmlFor="time">Time</Label>
                  <Select
                    id="time"
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    required
                    className="mt-1 w-full max-w-full box-border"
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="w-full">
                  <Label htmlFor="special_request">Special Requests (Optional)</Label>
                  <Textarea
                    id="special_request"
                    value={form.special_request}
                    onChange={(e) => update("special_request", e.target.value)}
                    className="mt-1 w-full max-w-full box-border"
                    placeholder="e.g. Dietary restrictions, high chair needed"
                  />
                </div>
              </div>

              {/* Pre-order menu items */}
              <div className="space-y-3 sm:space-y-4 min-w-0 w-full">
                <h3 className="text-base sm:text-lg font-semibold border-b pb-2 flex items-center gap-2">
                  <UtensilsCrossed size={18} className="text-soft-gold" />
                  2. Pre-order Menu (Optional)
                </h3>
                <p className="text-xs text-muted-foreground">
                  Pre-order your favorite curries now so they are ready shortly after you are seated.
                </p>
                {/* cap scroll area at 240px on mobile so submit button stays visible */}
                <div className="max-h-[240px] sm:max-h-[360px] overflow-y-auto border rounded-xl divide-y bg-muted/10 p-2">
                  {menuItems.map((item) => {
                    const inCart = cart[item.id];
                    return (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between py-2 px-1">
                        <div className="overflow-hidden pr-2">
                          <p className="text-sm font-semibold truncate whitespace-nowrap">{item.name}</p>
                          {/* <p className="text-xs text-muted-foreground whitespace-nowrap">{item.price} PHP</p> */}
                        </div>
                        {inCart ? (
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="rounded-lg border bg-card p-1 text-foreground transition hover:bg-muted"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-semibold min-w-[20px] text-center">
                              {inCart.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="rounded-lg border bg-card p-1 text-foreground transition hover:bg-muted"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            className="rounded-lg border bg-card px-2 py-1 text-xs font-medium transition hover:bg-muted shrink-0"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Preorder Summary */}
                {cartItems.length > 0 && (
                  <div className="rounded-xl border border-curry-yellow/30 bg-curry-yellow/5 p-3 sm:p-4 space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-soft-gold flex items-center gap-1.5">
                      <ShoppingBag size={14} />
                      Order Summary
                    </p>
                    <div className="max-h-[80px] sm:max-h-[120px] overflow-y-auto space-y-1 text-xs border-b pb-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="font-semibold">{/* {item.price * item.quantity} */} PHP</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-1">
                      <span>Total Pre-order:</span>
                      <span>{cartTotal} PHP</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t">
              <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Reserve Table"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-deep-black/60 p-3 sm:p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-card p-5 sm:p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="stamp-effect mx-auto mb-4 sm:mb-6 inline-block text-xl sm:text-2xl bg-curry-yellow/20 text-curry-yellow px-4 py-1.5 rounded-full ring-1 ring-curry-yellow/30">
                予約完了
              </div>
              <h3 className="text-lg sm:text-xl font-bold">Reservation Confirmed!</h3>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Thank you, {form.name}. We&apos;ve received your reservation for{" "}
                {form.guests} guests on {form.date} at {form.time}.
              </p>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                A confirmation email has been logged to your inbox.
              </p>
              <Button className="mt-4 sm:mt-6" onClick={() => setShowModal(false)}>
                Done
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}