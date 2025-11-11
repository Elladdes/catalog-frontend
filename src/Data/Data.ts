export type EventItem = {
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

export const EVENTS: EventItem[] = [
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
