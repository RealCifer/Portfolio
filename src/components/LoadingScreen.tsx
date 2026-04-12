"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Noto_Sans_Devanagari } from "next/font/google";
import { useEffect, useState } from "react";

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["600"],
  display: "swap",
  preload: true,
});

const easeOut = [0.22, 1, 0.36, 1] as const;

const SPLASH_MS = 2200;
const EXIT_MS = 380;

const textContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export default function LoadingScreen({
  onComplete,
}: Readonly<{ onComplete: () => void }>) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, EXIT_MS);
    }, SPLASH_MS);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.35, ease: easeOut }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050508] will-change-[opacity,transform]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_38%,rgba(16,185,129,0.11),transparent_58%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_50%_92%,rgba(129,140,248,0.05),transparent_55%)]" />

          <div className="relative z-10 flex flex-col items-center gap-9 px-6">
            <div className="loading-spinner h-14 w-14 rounded-full border-2 border-white/[0.1] border-t-emerald-400 md:h-16 md:w-16" />

            <motion.h1
              variants={textContainer}
              initial="hidden"
              animate="visible"
              lang="mr"
              className={`${notoDevanagari.className} text-center`}
            >
              <motion.span
                variants={textItem}
                className="block text-[1.5rem] font-semibold leading-tight tracking-wide text-white/90 md:text-[1.85rem]"
              >
                Namaskar
              </motion.span>
              <motion.span
                variants={textItem}
                className="mt-1 block bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-[1.75rem] font-semibold leading-tight tracking-wide text-transparent md:mt-1.5 md:text-[2.15rem]"
              >
                Mitranno
              </motion.span>
            </motion.h1>

            <div className="relative h-[2px] w-[min(17rem,85vw)] overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-600/30 via-emerald-400 to-teal-300"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SPLASH_MS / 1000 - 0.15, ease: easeOut }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
