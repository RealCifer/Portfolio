"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop, Menu, X, FileText, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/context/SoundContext";

export default function SideMenu() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isSoundEnabled, toggleSound } = useSound();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-lg text-black dark:text-white transition-all hover:scale-105"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 flex flex-col gap-2 p-2 bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl min-w-[160px]"
            >
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Theme
              </div>
              <button
                onClick={() => { setTheme("light"); setIsOpen(false); }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${theme === "light" ? "bg-black/5 dark:bg-white/10 font-medium" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
              >
                <Sun size={18} />
                <span>Light</span>
              </button>
              <button
                onClick={() => { setTheme("dark"); setIsOpen(false); }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${theme === "dark" ? "bg-black/5 dark:bg-white/10 font-medium" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
              >
                <Moon size={18} />
                <span>Dark</span>
              </button>
              <button
                onClick={() => { setTheme("system"); setIsOpen(false); }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${theme === "system" ? "bg-black/5 dark:bg-white/10 font-medium" : "hover:bg-black/5 dark:hover:bg-white/5"}`}
              >
                <Laptop size={18} />
                <span>System</span>
              </button>

              <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/5">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Settings
                </div>
                <button
                  onClick={() => toggleSound()}
                  className={`flex w-full items-center gap-3 px-3 py-2 rounded-xl transition-colors ${isSoundEnabled ? "text-emerald-600 dark:text-[#a8ff35] bg-emerald-500/5 dark:bg-[#a8ff35]/5" : "hover:bg-black/5 dark:hover:bg-white/5 opacity-60"}`}
                >
                  {isSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  <span>Sound {isSoundEnabled ? "On" : "Off"}</span>
                </button>
                <a
                  href="https://drive.google.com/file/d/12FG3LCVUgLohih02tOdnEApI-x6272UW/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="mt-1 flex items-center gap-3 px-3 py-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <FileText size={18} />
                  <span>Resume</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
