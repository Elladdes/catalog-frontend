"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./Button";

export const Navbar: React.FC = () => {
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
