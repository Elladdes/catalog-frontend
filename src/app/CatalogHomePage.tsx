"use client";

import React from "react";
import Script from "next/script";
import { Navbar } from "@/Components/Navbar";
import { Footer } from "@/Components/Footer";
import { EVENTS } from "@/Data/Data";
import { Discover } from "@/Components/Discover";
import { Hero } from "@/Components/Hero";
import JsonLd from "@/Helper/BuildEventsJsonLd";



const CatalogHomePage: React.FC = () => {
  const jsonLd = React.useMemo(() => JsonLd(EVENTS), []);

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
