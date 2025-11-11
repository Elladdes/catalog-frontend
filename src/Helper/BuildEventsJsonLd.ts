import type { EventItem } from "@/Data/Data";

export default function buildEventsJsonLd(items: EventItem[]) {
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