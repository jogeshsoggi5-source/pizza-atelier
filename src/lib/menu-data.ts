import margherita from "@/assets/pizza-margherita.jpg";
import truffle from "@/assets/pizza-truffle.jpg";
import pepperoni from "@/assets/pizza-pepperoni.jpg";
import burrata from "@/assets/pizza-burrata.jpg";
import mediterranean from "@/assets/pizza-mediterranean.jpg";
import bbq from "@/assets/pizza-bbq.jpg";

export type MenuCategory = "signature" | "sides" | "drinks" | "desserts";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image?: string;
  tag?: string;
}

export const categoryLabels: Record<MenuCategory, string> = {
  signature: "Signature Pizzas",
  sides: "Antipasti & Sides",
  drinks: "Drinks",
  desserts: "Dolci",
};

export const menuItems: MenuItem[] = [
  {
    id: "margherita-atelier",
    name: "Margherita Atelier",
    description: "San Marzano tomato, fior di latte, fresh basil, cold-pressed olive oil.",
    price: 14,
    category: "signature",
    image: margherita,
    tag: "Classic",
  },
  {
    id: "truffle-mushroom",
    name: "Truffle Mushroom",
    description: "Black truffle cream, roasted wild mushrooms, fontina, fresh thyme.",
    price: 18,
    category: "signature",
    image: truffle,
    tag: "Chef's Pick",
  },
  {
    id: "spicy-pepperoni",
    name: "Spicy Pepperoni",
    description: "Cup-and-char pepperoni, Calabrian chili honey, smoked mozzarella.",
    price: 16,
    category: "signature",
    image: pepperoni,
    tag: "Spicy",
  },
  {
    id: "burrata-deluxe",
    name: "Burrata Deluxe",
    description: "Creamy burrata, prosciutto di Parma, arugula, aged balsamic glaze.",
    price: 19,
    category: "signature",
    image: burrata,
    tag: "Premium",
  },
  {
    id: "mediterranean-garden",
    name: "Mediterranean Garden",
    description: "Grilled artichokes, kalamata olives, cherry tomato, feta, oregano.",
    price: 16,
    category: "signature",
    image: mediterranean,
    tag: "Vegetarian",
  },
  {
    id: "bbq-chicken-supreme",
    name: "BBQ Chicken Supreme",
    description: "Wood-roasted chicken, smoky BBQ, red onion, cilantro, aged gouda.",
    price: 17,
    category: "signature",
    image: bbq,
    tag: "Fan Favorite",
  },
  {
    id: "garlic-focaccia",
    name: "Wood-Fired Garlic Focaccia",
    description: "House dough, confit garlic butter, rosemary, sea salt.",
    price: 6,
    category: "sides",
  },
  {
    id: "burrata-board",
    name: "Burrata & Heirloom Tomato Board",
    description: "Whole burrata, heirloom tomatoes, basil oil, grilled bread.",
    price: 12,
    category: "sides",
  },
  {
    id: "arancini-trio",
    name: "Arancini Trio",
    description: "Crispy saffron risotto balls, smoked mozzarella heart, marinara.",
    price: 9,
    category: "sides",
  },
  {
    id: "blood-orange-soda",
    name: "Italian Blood-Orange Soda",
    description: "Sparkling Sicilian blood orange, served over ice.",
    price: 5,
    category: "drinks",
  },
  {
    id: "san-pellegrino",
    name: "San Pellegrino",
    description: "Sparkling natural mineral water, 500ml.",
    price: 4,
    category: "drinks",
  },
  {
    id: "house-chianti",
    name: "House Chianti (Glass)",
    description: "A round, cherry-forward Tuscan red — the pizza's best friend.",
    price: 9,
    category: "drinks",
  },
  {
    id: "tiramisu",
    name: "Tiramisù Classico",
    description: "Espresso-soaked savoiardi, mascarpone cream, cocoa dust.",
    price: 8,
    category: "desserts",
  },
  {
    id: "panna-cotta",
    name: "Vanilla Bean Panna Cotta",
    description: "Silky cream, Madagascar vanilla, roasted strawberry compote.",
    price: 7,
    category: "desserts",
  },
];

export const signaturePizzas = menuItems.filter((i) => i.category === "signature");

export const formatPrice = (price: number) => `$${price.toFixed(0)}`;
