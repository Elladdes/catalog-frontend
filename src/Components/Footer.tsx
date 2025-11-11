"use client";

import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
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
