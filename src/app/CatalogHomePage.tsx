"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown, Search } from "lucide-react";

// If you're using shadcn/ui, uncomment these imports and ensure the paths match your setup.
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type EventItem = {
  id: string;
  title: string;
  dateISO: string; // e.g., "2024-06-05"
  dateLabel: string; // e.g., "June 5, 2024"
  city: string;
  region: string; // e.g., "IL" or country code
  imageSrc: string;
  section: string; // category/track
  slug: string;
};

// -----------------------------------------------------------------------------
// Mock Data (replace with your CMS / API data)
// -----------------------------------------------------------------------------

const EVENTS: EventItem[] = [
  {
    id: "ascs",
    title: "American Supply Chain Summit",
    dateISO: "2024-06-05",
    dateLabel: "June 5, 2024",
    city: "Chicago",
    region: "IL",
    imageSrc: "/images/events/supply-chain.jpg",
    section: "Supply Chain",
    slug: "american-supply-chain-summit",
  },
  {
    id: "cges",
    title: "Canadian Green Energy Summit",
    dateISO: "2024-07-15",
    dateLabel: "July 15, 2024",
    city: "Toronto",
    region: "ON",
    imageSrc: "/images/events/green-energy.jpg",
    section: "Energy",
    slug: "canadian-green-energy-summit",
  },
  {
    id: "efss",
    title: "European Financial Services Summit",
    dateISO: "2024-09-10",
    dateLabel: "September 10, 2024",
    city: "London",
    region: "UK",
    imageSrc: "/images/events/financial-services.jpg",
    section: "Finance",
    slug: "european-financial-services-summit",
  },
];

// -----------------------------------------------------------------------------
// Helpers (SEO JSON-LD)
// -----------------------------------------------------------------------------

function buildEventsJsonLd(items: EventItem[]) {
  const events = items.map((e) => ({
    "@type": "Event",
    name: e.title,
    startDate: e.dateISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: `${e.city}, ${e.region}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: e.city,
        addressRegion: e.region,
      },
    },
    image: [e.imageSrc],
    url: `/events/${e.slug}`,
    description: `${e.title} hosted by Generis` ,
    organizer: {
      "@type": "Organization",
      name: "Generis",
      url: "https://www.generis.com",
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Generis Events Catalog",
    itemListElement: events.map((ev, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: ev,
    })),
  };
}

// -----------------------------------------------------------------------------
// Simple UI primitives (so this file works even without shadcn/ui)
// -----------------------------------------------------------------------------

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>= ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Select: React.FC<{
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  label?: string;
}> = ({ value, onChange, children, placeholder, label }) => (
  <label className="flex items-center gap-2 text-sm text-gray-300">
    {label && <span className="sr-only">{label}</span>}
    <div className="relative w-56">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 pr-10 text-white placeholder-gray-400 outline-none transition focus:border-blue-500"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" />
    </div>
  </label>
);

// -----------------------------------------------------------------------------
// Header / Navbar
// -----------------------------------------------------------------------------

const Navbar: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="inline-block h-6 w-6 rounded-sm bg-gradient-to-br from-blue-400 to-blue-600" />
          <span className="text-lg font-semibold tracking-wide">GENERIS</span>
        </Link>

        {/* Center Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {[
            { href: "/events", label: "Events" },
            { href: "/sponsors", label: "Sponsors" },
            { href: "/delegates", label: "Delegates" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-200 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right CTAs */}
        <div className="flex items-center gap-3">
          <Link href="/register">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Register</Button>
          </Link>
          <Link href="/login">
            <Button className="border border-white/20 bg-transparent text-white hover:bg-white/10">Log In</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

// -----------------------------------------------------------------------------
// Hero Section
// -----------------------------------------------------------------------------

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background image */}
      <Image
        src="/images/hero-business.jpg"
        alt="Business leaders in a meeting"
        fill
        className="object-cover opacity-30"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="text-balance text-5xl font-bold text-white md:text-6xl">
          Explore Our Catalog of Business Events
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Access top-tier business events designed for industry leaders and innovators.
        </p>
        <div className="mt-8">
          <Link href="#discover">
            <Button className="bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
              Browse Events
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// Filters + Grid
// -----------------------------------------------------------------------------

const Discover: React.FC = () => {
  const [section, setSection] = React.useState<string>("All Sections");
  const [date, setDate] = React.useState<string>("Any Date");
  const [sortBy, setSortBy] = React.useState<string>("Date (Asc)");
  const [query, setQuery] = React.useState<string>("");

  // Filter + sort pipeline
  const items = React.useMemo(() => {
    let list = [...EVENTS];

    if (section !== "All Sections") {
      list = list.filter((e) => e.section === section);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((e) => e.title.toLowerCase().includes(q) || e.city.toLowerCase().includes(q));
    }

    if (date !== "Any Date") {
      // naive example: year-only filter
      const year = date.replace(/[^0-9]/g, "");
      list = list.filter((e) => e.dateISO.startsWith(year));
    }

    if (sortBy.startsWith("Date")) {
      list.sort((a, b) => (sortBy.includes("Asc") ? a.dateISO.localeCompare(b.dateISO) : b.dateISO.localeCompare(a.dateISO)));
    } else if (sortBy === "Name (A→Z)") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Name (Z→A)") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [section, date, sortBy, query]);

  const sections = ["All Sections", ...Array.from(new Set(EVENTS.map((e) => e.section)))];
  const years = ["Any Date", ...Array.from(new Set(EVENTS.map((e) => e.dateISO.slice(0, 4))))];

  return (
    <section id="discover" className="relative z-10 bg-slate-950 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
          Discover Upcoming Events
        </h2>

        {/* Search + Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search events, cities..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search events"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-white outline-none placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>

          <Select value={section} onChange={setSection} placeholder="All Sections" label="Sections">
            {sections.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>

          <Select value={date} onChange={setDate} placeholder="Any Date" label="Date">
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>

          <Select value={sortBy} onChange={setSortBy} placeholder="Sort By" label="Sort By">
            {["Date (Asc)", "Date (Desc)", "Name (A→Z)", "Name (Z→A)"].map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((e) => (
            <EventCard key={e.id} item={e} />)
          )}
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// Event Card
// -----------------------------------------------------------------------------

const EventCard: React.FC<{ item: EventItem }> = ({ item }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/events/${item.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
        </div>
        <div className="mt-4 space-y-2 px-1 pb-2">
          <h3 className="line-clamp-2 text-sm font-semibold tracking-wide text-white">
            {item.title.toUpperCase()}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Calendar className="h-4 w-4" />
            <time dateTime={item.dateISO}>{item.dateLabel}</time>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="h-4 w-4" />
            <span>{item.city}, {item.region}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

// -----------------------------------------------------------------------------
// Footer
// -----------------------------------------------------------------------------

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-14 text-gray-400">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">About</h4>
          <p className="text-sm leading-relaxed">Generis connects leaders and innovators through premium business events worldwide.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Events</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/events" className="hover:text-white">All Events</Link></li>
            <li><Link href="/calendar" className="hover:text-white">Calendar</Link></li>
            <li><Link href="/speakers" className="hover:text-white">Speakers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Sponsors</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/sponsors" className="hover:text-white">Why Sponsor</Link></li>
            <li><Link href="/sponsors#packages" className="hover:text-white">Packages</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white" href="mailto:info@generis.com">info@generis.com</a></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Generis. All rights reserved.
      </div>
    </footer>
  );
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

const CatalogHomePage: React.FC = () => {
  const jsonLd = React.useMemo(() => buildEventsJsonLd(EVENTS), []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* SEO: Events JSON-LD */}
      <Script
        id="events-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <Hero />
      <Discover />
      <Footer />
    </main>
  );
};

export default CatalogHomePage;
