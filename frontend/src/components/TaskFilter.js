"use client";

import { useTheme } from "../context/ThemeContext";

export default function TaskFilter({ filters, onChange }) {
  const { dark } = useTheme();
  const handleStatus = (e) => onChange({ ...filters, status: e.target.value });
  const handleSort = (e) => onChange({ ...filters, sortBy: e.target.value });

  const containerClass = `rounded-lg shadow-sm border p-4 transition-colors duration-200 ${
    dark
      ? "bg-slate-800 border-slate-700 text-slate-100"
      : "bg-white border-slate-200 text-slate-900"
  }`;
  const labelClass = `block text-sm font-medium mb-2 ${
    dark ? "text-slate-300" : "text-slate-700"
  }`;
  const selectClass = `w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    dark
      ? "bg-slate-700 border-slate-600 text-slate-100"
      : "bg-white border-slate-300 text-slate-900"
  }`;

  return (
    <div className={containerClass}>
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[150px]">
          <label className={labelClass}>Filter by Status</label>
          <select
            value={filters.status || ""}
            onChange={handleStatus}
            className={selectClass}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className={labelClass}>Sort by</label>
          <select
            value={filters.sortBy || "deadline"}
            onChange={handleSort}
            className={selectClass}
          >
            <option value="deadline">Deadline</option>
            <option value="createdAt">Created Date</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>
    </div>
  );
}
