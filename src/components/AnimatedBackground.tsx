"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[5%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-emerald-500/20 dark:bg-[#a8ff35]/20 blur-[100px] sm:blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[50%] right-[0%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-blue-500/20 dark:bg-indigo-500/20 blur-[120px] sm:blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] left-[30%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-teal-500/20 dark:bg-purple-500/20 blur-[100px] sm:blur-[150px]"
      />
    </div>
  );
}
