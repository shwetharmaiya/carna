"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
    >
      <div className={`w-4 h-4 rounded-full transition-all ${theme === 'dark' ? 'bg-orange-500 shadow-[0_0_8px_orange]' : 'bg-amber-400'}`} />
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        {theme === "dark" ? "Night Mode" : "Day Mode"}
      </span>
    </button>
  );
}