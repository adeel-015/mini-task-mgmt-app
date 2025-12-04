"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, LogOut } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <h2 className="text-xl font-semibold">Mini Task</h2>
      <div className="flex items-center gap-3">
        <button onClick={toggle} className="p-2 rounded">
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        {user && <span className="hidden sm:inline">{user.name}</span>}
        <button onClick={logout} className="p-2 rounded">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
