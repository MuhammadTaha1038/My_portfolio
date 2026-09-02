"use client";

import { useState, useEffect } from "react";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  {
    name: "Gold (Default)",
    color: "#F5C518",
    vars: {
      "--color-accent": "#F5C518",
      "--color-accent-dim": "#D4A617",
      "--color-accent-light": "#FFE066",
    }
  },
  {
    name: "Emerald",
    color: "#10b981",
    vars: {
      "--color-accent": "#10b981",
      "--color-accent-dim": "#059669",
      "--color-accent-light": "#34d399",
    }
  },
  {
    name: "Cyberpunk",
    color: "#d946ef",
    vars: {
      "--color-accent": "#d946ef",
      "--color-accent-dim": "#c026d3",
      "--color-accent-light": "#e879f9",
    }
  },
  {
    name: "Ocean Blue",
    color: "#3b82f6",
    vars: {
      "--color-accent": "#3b82f6",
      "--color-accent-dim": "#2563eb",
      "--color-accent-light": "#60a5fa",
    }
  }
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(themes[0]);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) {
      const theme = themes.find(t => t.name === saved);
      if (theme) {
        applyTheme(theme);
      }
    }
  }, []);

  const applyTheme = (theme: typeof themes[0]) => {
    setActiveTheme(theme);
    localStorage.setItem("portfolio-theme", theme.name);
    
    // Apply CSS variables to root
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full border border-white/10 hover:border-accent/50 text-gray-400 hover:text-accent transition-all bg-black/50 backdrop-blur-sm"
        aria-label="Customize Theme"
      >
        <Palette className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible backdrop to close dropdown */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 p-3 bg-[#111111] border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col gap-2 min-w-[150px]"
            >
              <div className="text-xs text-gray-400 font-medium px-2 pb-1 uppercase tracking-wider border-b border-white/5 mb-1">
                Accent Color
              </div>
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => {
                    applyTheme(theme);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-2 py-2 rounded-xl transition-all ${
                    activeTheme.name === theme.name 
                      ? "bg-white/10 text-white" 
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`}
                >
                  <span 
                    className="w-4 h-4 rounded-full shadow-inner" 
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className="text-sm font-medium">{theme.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
