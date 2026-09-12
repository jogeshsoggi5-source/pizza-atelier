import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PizzaCard } from "@/components/site/PizzaCard";
import { useCart } from "@/lib/cart-context";
import {
  categoryLabels,
  formatPrice,
  menuItems,
  signaturePizzas,
  type MenuCategory,
  type MenuItem,
} from "@/lib/menu-data";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Online — Pizza Atelier" },
      {
        name: "description",
        content:
          "Order wood-fired artisan pizzas online for delivery or pickup. Fresh from our oven in 30 minutes.",
      },
      { property: "og:title", content: "Order Online — Pizza Atelier" },
      {
        property: "og:description",
        content: "Delivery or pickup — fresh from the wood-fired oven.",
      },
    ],
  }),
  component: OrderPage,
});

const otherCategories: MenuCategory[] = ["sides", "drinks", "desserts"];
const DELIVERY_FEE = 3;

function AddRow({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-card p-4 shadow-card">
      <div>
        <div className="flex items-baseline gap-2">
          <p className="font-medium">{item.name}</p>
          <span className="text-sm font-semibold text-primary">{formatPrice(item.price)}</span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
      </div>
      <Button
        size="icon"
        variant="outline"
        aria-label={`Add ${item.name} to order`}
        onClick={() => {
          addItem({ id: item.id, name: item.name, price: item.price });
          toast.success(`${item.name} added to your order`);
        }}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

function OrderPage() {
  const { items, updateQty, removeItem, clear, total, count } = useCart();
  const [fulfillment, setFulfillment] = useState<"delivery" | "pickup">("delivery");
  const [placedOrder, setPlacedOrder] = useState<string | null>(null);

  const grandTotal = total + (fulfillment === "delivery" ? DELIVERY_FEE : 0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty — add something delicious first!");
      return;
    }
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const address = String(form.get("address") ?? "").trim();
    if (!name || !phone || (fulfillment === "delivery" && !address)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const orderNumber = `PA-${Math.floor(1000 + Math.random() * 9000)}`;
    setPlacedOrder(orderNumber);
    clear();
  };

  if (placedOrder) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-secondary" />
          <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl">Order Confirmed!</h1>
          <p className="mt-3 text-muted-foreground">
            Your order <span className="font-semibold text-foreground">{placedOrder}</span> is
            in the oven. {fulfillment === "delivery"
              ? "It will be at your door in about 30–40 minutes."
              : "It will be ready for pickup in about 20 minutes."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={() => setPlacedOrder(null)}>Order Again</Button>
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Order Online</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Fresh to Your Door</h1>
        <p className="mt-4 text-muted-foreground">
          Build your order below, then check out for delivery or pickup.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Menu */}
        <div>
          <h2 className="font-display text-2xl font-bold">{categoryLabels.signature}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {signaturePizzas.map((pizza) => (
              <PizzaCard key={pizza.id} item={pizza} />
            ))}
          </div>

          {otherCategories.map((category) => (
            <div key={category} className="mt-10">
              <h2 className="font-display text-2xl font-bold">{categoryLabels[category]}</h2>
              <div className="mt-5 grid gap-3">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <AddRow key={item.id} item={item} />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart & checkout */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl bg-card p-6 shadow-card">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-bold">Your Order</h2>
              {count > 0 && (
                <span className="ml-auto text-sm text-muted-foreground">{count} item{count !== 1 ? "s" : ""}</span>
              )}
            </div>

            {items.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">
                Your cart is empty. Add a pizza to get started!
              </p>
            ) : (
              <ul className="mt-5 space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => updateQty(item.id, item.qty - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={fulfillment === "delivery" ? "default" : "outline"}
                onClick={() => setFulfillment("delivery")}
              >
                Delivery
              </Button>
              <Button
                type="button"
                variant={fulfillment === "pickup" ? "default" : "outline"}
                onClick={() => setFulfillment("pickup")}
              >
                Pickup
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" required />
              </div>
              {fulfillment === "delivery" && (
                <div className="space-y-1.5">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input id="address" name="address" placeholder="Street, city, zip" />
                </div>
              )}

              <div className="space-y-1.5 border-t pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {fulfillment === "delivery" && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery fee</span>
                    <span>${DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Place Order — ${grandTotal.toFixed(2)}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Pay at the door or on pickup. Online payment coming soon.
              </p>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
