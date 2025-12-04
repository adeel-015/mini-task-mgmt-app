"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading,
  ...rest
}) {
  const { dark } = useTheme();
  const base =
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2";
  const variants = {
    primary: dark
      ? "bg-blue-500 text-white hover:opacity-90 focus:ring-blue-400"
      : "bg-blue-700 text-white hover:opacity-95 focus:ring-blue-300",
    secondary: dark
      ? "bg-slate-600 text-white hover:opacity-90 focus:ring-slate-500"
      : "bg-gray-100 text-slate-900 border border-slate-300 hover:bg-gray-200 focus:ring-slate-300",
    danger: dark
      ? "bg-red-500 text-white hover:opacity-90 focus:ring-red-400"
      : "bg-red-600 text-white hover:opacity-95 focus:ring-red-300",
  };
  const sizes = { sm: "px-2 py-1 text-sm", md: "px-4 py-2", lg: "px-6 py-3" };
  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      }`}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
