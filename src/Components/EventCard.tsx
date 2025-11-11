"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { EventItem } from "@/Data/Data";
import { Calendar, MapPin} from "lucide-react";

export const EventCard: React.FC<{ item: EventItem }> = ({ item }) => {
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


