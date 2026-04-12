"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import SideMenu from "./SideMenu";
import SmoothScroll from "./SmoothScroll";
import InteractiveBackground from "./InteractiveBackground";
import { ThemeProvider } from "./ThemeProvider";
import { SoundProvider, useSound } from "@/context/SoundContext";

function GlobalClickListener({ children }: { children: React.ReactNode }) {
  const { playPop } = useSound();

  useEffect(() => {
    const handleGlobalClick = () => {
      playPop();
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    return () => window.removeEventListener("click", handleGlobalClick, { capture: true });
  }, [playPop]);

  return <>{children}</>;
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SoundProvider>
      <GlobalClickListener>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScroll>
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            <div
              className={
                isLoading
                  ? "opacity-0 invisible h-screen overflow-hidden"
                  : "opacity-100 visible h-auto transition-opacity duration-500 ease-out"
              }
            >
              <InteractiveBackground />
              <SideMenu />
              {children}
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </GlobalClickListener>
    </SoundProvider>
  );
}
