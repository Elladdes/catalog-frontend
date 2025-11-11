import React from "react";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>= ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);