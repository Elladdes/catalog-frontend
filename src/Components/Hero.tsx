import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./Button";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background image */}
      <Image
        src="/hires/hero-business.jpg"
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