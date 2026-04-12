"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Section 1: 0% to 10% (Pans up and out of view)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1], [0, -500]);
  const scale1 = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  // Section 2: 30% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [100, 0, -100]);

  // Section 3: 60% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.7, 0.8], [100, 0, -100]);

  return (
    <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
      <div className="sticky left-0 top-0 z-10 flex h-screen w-full flex-col justify-center overflow-hidden">
        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1, scale: scale1 }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
        >
          <h1 className="font-display bg-gradient-to-b from-black to-black/50 bg-clip-text pb-2 text-6xl font-black text-transparent drop-shadow-[0_0_40px_rgba(0,0,0,0.3)] dark:from-white dark:to-white/50 dark:drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] md:text-8xl">
            Aditya Khamait.
          </h1>
          <p className="font-display mt-6 text-xl font-bold uppercase tracking-[0.2em] text-emerald-600 drop-shadow-[0_0_20px_rgba(5,150,105,0.5)] dark:text-[#a8ff35] dark:drop-shadow-[0_0_20px_rgba(168,255,53,0.5)] md:text-3xl md:tracking-[0.28em]">
            MERN & AI Developer
          </p>

          {/* Elegant Scroll Indicator */}
          <motion.div
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 md:bottom-16"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-black/50 dark:text-white/50 md:text-xs">
                Scroll
              </span>
              <div className="relative h-16 w-[1px] overflow-hidden bg-black/10 dark:bg-white/10 md:h-24">
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-transparent via-black/60 to-transparent dark:via-white/60"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-24"
        >
          <h2 className="font-display max-w-xl text-4xl font-medium leading-[1.12] tracking-tight text-white drop-shadow-2xl mix-blend-difference md:text-6xl">
            I build <span className="italic text-white/50">scalable backend systems.</span>
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center px-8 text-right md:px-24"
        >
          <h2 className="font-display max-w-xl text-4xl font-medium leading-[1.12] tracking-tight text-white drop-shadow-2xl mix-blend-difference md:text-6xl">
            Bridging <br />
            <span className="font-bold">APIs</span> and <span className="font-bold">user experiences.</span>
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
