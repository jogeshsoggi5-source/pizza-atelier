import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Pizza Atelier" },
      {
        name: "description",
        content:
          "Explore our signature wood-fired pizzas, antipasti, drinks, and desserts. Handcrafted with fresh, locally sourced ingredients.",
      },
      { property: "og:title", content: "Menu — Pizza Atelier" },
      {
        property: "og:description",
        content: "Signature wood-fired pizzas, antipasti, drinks, and dolci.",
      },
    ],
  }),
  component: MenuPage,
});

const otherCategories: MenuCategory[] = ["sides", "drinks", "desserts"];

function SimpleItemRow({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price });
    toast.success(`${item.name} added to your order`);
  };

  if (item.image) {
    return (
      <article className="hover-lift group overflow-hidden rounded-xl bg-card shadow-card">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={800}
            height={608}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold">{item.name}</h3>
            <span className="font-display text-lg font-semibold text-primary">
              {formatPrice(item.price)}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          <Button onClick={handleAdd} size="sm" className="mt-4 w-full">
            <Plus className="mr-1 h-4 w-4" /> Add to Order
          </Button>
        </div>
      </article>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-card p-5 shadow-card">
      <div>
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-lg font-semibold">{item.name}</h3>
          <span className="font-display font-semibold text-primary">{formatPrice(item.price)}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
      </div>
      <Button
        size="icon"
        variant="outline"
        aria-label={`Add ${item.name} to order`}
        onClick={handleAdd}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

function MenuPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">The Menu</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Baked Over Oak</h1>
        <p className="mt-4 text-muted-foreground">
          Every dish is made from scratch daily. Add your favorites and order online for
          delivery or pickup.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-bold">{categoryLabels.signature}</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {signaturePizzas.map((pizza) => (
            <PizzaCard key={pizza.id} item={pizza} />
          ))}
        </div>
      </section>

      {otherCategories.map((category) => (
        <section key={category} className="mt-16">
          <h2 className="font-display text-3xl font-bold">{categoryLabels[category]}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <SimpleItemRow key={item.id} item={item} />
              ))}
          </div>
        </section>
      ))}

      <div className="mt-16 rounded-xl bg-charcoal p-10 text-center text-cream">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Ready to order?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-cream/70">
          Review your cart and check out for delivery or pickup — fresh from the oven in 30
          minutes.
        </p>
        <Button asChild size="lg" className="mt-6 bg-gold text-charcoal hover:bg-gold/90">
          <Link to="/order">Go to Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
