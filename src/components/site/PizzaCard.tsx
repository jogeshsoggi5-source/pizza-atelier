import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type MenuItem } from "@/lib/menu-data";

export function PizzaCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price });
    toast.success(`${item.name} added to your order`);
  };

  return (
    <article className="hover-lift group overflow-hidden rounded-xl bg-card shadow-card">
      {item.image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={`${item.name} artisan wood-fired pizza`}
            loading="lazy"
            width={800}
            height={608}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {item.tag && (
            <Badge className="absolute left-3 top-3 bg-gold text-charcoal hover:bg-gold">
              {item.tag}
            </Badge>
          )}
        </div>
      )}
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
