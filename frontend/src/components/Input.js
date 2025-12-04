"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Input({ label, error, ...props }) {
  const { dark } = useTheme();
  const labelClass = `block text-sm mb-1 ${
    dark ? "text-slate-300" : "text-slate-700"
  }`;
  const inputClass = `w-full p-2 border rounded ${
    error ? "border-red-500" : ""
  } ${
    dark
      ? "bg-slate-700 border-slate-600 text-slate-100"
      : "bg-white border-slate-300 text-slate-900"
  }`;
  return (
    <div className="mb-3">
      {label && <label className={labelClass}>{label}</label>}
      <input className={inputClass} {...props} />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}
