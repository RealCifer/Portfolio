"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

export default function SmoothScroll({ children }: Readonly<{ children: ReactNode }>) {
  const [respectReducedMotion, setRespectReducedMotion] = useState(false);

  useEffect(() => {
    const mq = globalThis.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setRespectReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const options = useMemo(
    () => ({
      autoRaf: true,
      // Higher lerp = scroll catches up faster (less floaty / less input lag)
      lerp: 0.14,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.12,
      syncTouch: true,
      anchors: true,
      overscroll: true,
    }),
    []
  );

  if (respectReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
