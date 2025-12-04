"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="max-w-2xl w-full p-8 bg-white dark:bg-slate-800 rounded-lg shadow text-gray-900 dark:text-white">
        <h1 className="text-4xl font-bold">Mini Task Manager</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Manage your tasks across web and mobile. Fast, simple and secure.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="/login" className="px-4 py-2 bg-primary text-white rounded">
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-2 border border-gray-200 rounded text-gray-700 dark:text-gray-200"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
