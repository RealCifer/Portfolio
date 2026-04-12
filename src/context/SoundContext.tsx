"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playPop: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Load preference from localStorage
    const savedSound = localStorage.getItem("soundEnabled");
    if (savedSound !== null) {
      setIsSoundEnabled(savedSound === "true");
    }
  }, []);

  const toggleSound = () => {
    const newValue = !isSoundEnabled;
    setIsSoundEnabled(newValue);
    localStorage.setItem("soundEnabled", newValue.toString());
  };

  const playPop = () => {
    if (!isSoundEnabled) return;

    try {
      // Initialize AudioContext on first interaction
      if (!audioContextRef.current) {
        const AudioCtx =
          window.AudioContext ??
          (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      
      // Resume context if suspended (browser behavior)
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (error) {
      console.error("Audio synthesis failed:", error);
    }
  };

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playPop }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
};
