import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pizza Atelier" },
      {
        name: "description",
        content:
          "Find Pizza Atelier at 214 Artisan Lane, Brooklyn. Call, email, or drop by — see our opening hours and directions.",
      },
      { property: "og:title", content: "Contact — Pizza Atelier" },
      {
        property: "og:description",
        content: "Find us in Brooklyn — hours, phone, email, and directions.",
      },
    ],
  }),
  component: ContactPage,
});

const details = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["214 Artisan Lane", "Brooklyn, NY 11201"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+1 (555) 012-3456"],
    href: "tel:+15550123456",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@pizzaatelier.com"],
    href: "mailto:hello@pizzaatelier.com",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    lines: ["Mon–Thu: 11:30 – 22:00", "Fri–Sat: 11:30 – 23:00", "Sun: 12:00 – 21:30"],
  },
];

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Come Say Ciao</h1>
        <p className="mt-4 text-muted-foreground">
          Questions, catering, or just craving a slice? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {details.map((detail) => (
          <div key={detail.title} className="rounded-xl bg-card p-6 text-center shadow-card">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
              <detail.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold">{detail.title}</h2>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              {detail.lines.map((line) =>
                detail.href ? (
                  <a
                    key={line}
                    href={detail.href}
                    className="block transition-colors hover:text-primary"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={line}>{line}</p>
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-xl shadow-card">
        <iframe
          title="Pizza Atelier location on Google Maps"
          src="https://www.google.com/maps?q=Brooklyn%2C+NY+11201&output=embed"
          className="h-[400px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="mt-12 text-center">
        <p className="eyebrow">Follow Us</p>
        <div className="mt-4 flex justify-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="rounded-full border p-3 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="rounded-full border p-3 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="rounded-full border p-3 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
