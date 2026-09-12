import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <p className="font-logo text-2xl font-semibold">
            Pizza <span className="text-gold">Atelier</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">
            Where artisan pizza meets creativity. Handcrafted, wood-fired, and made with
            locally sourced ingredients.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-cream/20 p-2 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-cream/20 p-2 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="rounded-full border border-cream/20 p-2 transition-colors hover:border-gold hover:text-gold"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li><Link to="/menu" className="transition-colors hover:text-gold">Menu</Link></li>
            <li><Link to="/order" className="transition-colors hover:text-gold">Order Online</Link></li>
            <li><Link to="/reservations" className="transition-colors hover:text-gold">Reservations</Link></li>
            <li><Link to="/gallery" className="transition-colors hover:text-gold">Gallery</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-gold">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Opening Hours</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li className="flex justify-between gap-4"><span>Mon – Thu</span><span>11:30 – 22:00</span></li>
            <li className="flex justify-between gap-4"><span>Fri – Sat</span><span>11:30 – 23:00</span></li>
            <li className="flex justify-between gap-4"><span>Sunday</span><span>12:00 – 21:30</span></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>214 Artisan Lane, Brooklyn, NY</li>
            <li>
              <a href="tel:+15550123456" className="transition-colors hover:text-gold">
                +1 (555) 012-3456
              </a>
            </li>
            <li>
              <a href="mailto:hello@pizzaatelier.com" className="transition-colors hover:text-gold">
                hello@pizzaatelier.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Pizza Atelier. All rights reserved.</p>
          <p>Crafted like art. Baked with passion.</p>
        </div>
      </div>
    </footer>
  );
}
