"use client";
import React from "react";
import { format } from "date-fns";

export default function TaskList({ tasks = [], onEdit, onDelete }) {
  if (!tasks.length) return <div className="p-4">No tasks yet</div>;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {tasks.map((t) => (
        <div key={t._id} className="card">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{t.title}</h3>
            <span className="text-sm text-slate-500">
              {format(new Date(t.deadline), "MMM d, yyyy")}
            </span>
          </div>
          <p className="text-sm mt-2 text-slate-600">{t.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                t.status === "Done"
                  ? "bg-green-100 text-green-800"
                  : t.status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {t.status}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(t)}
                className="text-sm text-primary"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(t)}
                className="text-sm text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
