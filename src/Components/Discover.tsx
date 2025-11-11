import React from "react";
import { EventCard } from "@/Components/EventCard";
import { EVENTS } from "@/Data/Data";
import { Search } from "lucide-react";
import { Select } from "@/Components/Select";

export const Discover: React.FC = () => {
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
