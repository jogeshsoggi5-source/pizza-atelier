import { Link, createFileRoute } from "@tanstack/react-router";
import { ChefHat, Heart, Sprout } from "lucide-react";

import storyChef from "@/assets/story-chef.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Pizza Atelier" },
      {
        name: "description",
        content:
          "Inspired by Italian craftsmanship, Pizza Atelier treats every pizza as a masterpiece. Meet the people and philosophy behind our wood-fired kitchen.",
      },
      { property: "og:title", content: "Our Story — Pizza Atelier" },
      {
        property: "og:description",
        content: "The people and philosophy behind our wood-fired kitchen.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: ChefHat,
    title: "Craftsmanship",
    text: "Our pizzaioli train for years before touching the oven. Technique is everything — from the stretch of the dough to the timing of the bake.",
  },
  {
    icon: Sprout,
    title: "Honest Ingredients",
    text: "We partner with local farms and Italian producers. If it isn't fresh, organic, or genuinely exceptional, it doesn't make the menu.",
  },
  {
    icon: Heart,
    title: "Community",
    text: "Pizza is meant to be shared. Our tables are built for long dinners, loud laughter, and one more slice.",
  },
];

function AboutPage() {
  return (
    <div>
      <section className="container mx-auto grid items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">Our Story</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">
            Where Artisan Pizza Meets Creativity
          </h1>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            At Pizza Atelier, every pizza is treated as a masterpiece. Inspired by Italian
            craftsmanship, our chefs combine premium ingredients with creative recipes to
            create unforgettable flavors.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            It started with a single copper-domed oven and an obsession: could a pizzeria feel
            like an artist's studio? A place where dough is sculpted, sauces are composed, and
            every plate leaves the kitchen signed by fire.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Today, our Brooklyn atelier serves thousands of guests a month — but every pizza
            still gets the same treatment: 48-hour fermented dough, hand-crushed San Marzano
            tomatoes, and a 90-second bake over blazing oak.
          </p>
        </div>
        <img
          src={storyChef}
          alt="Pizza Atelier head chef in front of the wood-fired oven"
          loading="lazy"
          width={960}
          height={1088}
          className="w-full rounded-xl object-cover shadow-card"
        />
      </section>

      <section className="bg-charcoal text-cream">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow">What We Stand For</p>
            <h2 className="mt-3 font-display text-4xl font-bold">Our Values</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl border border-cream/10 p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-gold">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto grid items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <img
          src={galleryInterior}
          alt="Warm modern Italian interior of Pizza Atelier"
          loading="lazy"
          width={800}
          height={800}
          className="w-full rounded-xl object-cover shadow-card"
        />
        <div>
          <p className="eyebrow">Visit Us</p>
          <h2 className="mt-3 font-display text-4xl font-bold">A Modern Italian Home</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Olive-green banquettes, brass details, and the warm glow of the oven — our dining
            room was designed to feel like dinner at a friend's place in Milan. Come for the
            pizza, stay for the atmosphere.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to="/reservations">Reserve a Table</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get Directions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
