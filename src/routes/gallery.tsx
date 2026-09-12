import { createFileRoute } from "@tanstack/react-router";

import heroPizza from "@/assets/hero-pizza.jpg";
import galleryPrep from "@/assets/gallery-prep.jpg";
import galleryIngredients from "@/assets/gallery-ingredients.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryOven from "@/assets/gallery-oven.jpg";
import galleryCustomers from "@/assets/gallery-customers.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Pizza Atelier" },
      {
        name: "description",
        content:
          "A look inside the atelier: pizza preparation, fresh ingredients, our wood-fired oven, the dining room, and happy guests.",
      },
      { property: "og:title", content: "Gallery — Pizza Atelier" },
      { property: "og:description", content: "A look inside our wood-fired pizza atelier." },
    ],
  }),
  component: GalleryPage,
});

const photos = [
  { src: galleryOven, alt: "Blazing wood-fired oven with a pizza on the peel", caption: "The Wood-Fired Oven" },
  { src: galleryPrep, alt: "Chef dusting flour over fresh pizzas", caption: "Pizza Preparation" },
  { src: galleryIngredients, alt: "Fresh tomatoes, basil, mozzarella, and olive oil", caption: "Fresh Ingredients" },
  { src: galleryInterior, alt: "Modern Italian dining room with olive banquettes", caption: "The Dining Room" },
  { src: galleryCustomers, alt: "Friends sharing pizzas over candlelight", caption: "Happy Guests" },
  { src: heroPizza, alt: "Margherita pizza fresh out of the oven", caption: "Signed by Fire" },
];

function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Gallery</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Inside the Atelier</h1>
        <p className="mt-4 text-muted-foreground">
          Fire, flour, and the moments in between — a glimpse of life at Pizza Atelier.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <figure key={photo.caption} className="hover-lift group overflow-hidden rounded-xl shadow-card">
            <div className="aspect-square overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="bg-card px-5 py-4 font-display text-lg font-semibold">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
