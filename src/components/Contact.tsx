"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

export default function Contact() {
  return (
    <section id="contact" className="relative z-20 px-6 py-32 md:px-12 lg:px-24 border-t border-black/5 dark:border-white/5 text-black dark:text-white overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="font-display mb-6 text-5xl font-bold tracking-tight text-black dark:text-white md:text-7xl md:tracking-tighter">
            Let&apos;s <span className="text-emerald-500 dark:text-[#a8ff35]">Connect.</span>
          </h3>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-black/60 dark:text-white/60">
            I&apos;m currently looking for new opportunities in full-stack and backend development.
            Whether you have a question or just want to say hi, my inbox is always open!
          </p>

          <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
            <a
              href="https://github.com/RealCifer"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-3 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 px-8 py-4 text-sm font-medium uppercase tracking-widest transition-all hover:border-black/40 dark:hover:border-white/40 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/aditya-khamait"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-3 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 px-8 py-4 text-sm font-medium uppercase tracking-widest transition-all hover:border-[#0077b5] hover:bg-[#0077b5]/10 hover:text-[#0077b5]"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 flex justify-center"
          >
            <p className="text-sm md:text-base font-medium text-black/60 dark:text-white/60 tracking-wide flex items-center gap-4">
              <span className="hidden sm:block w-12 h-px bg-black/20 dark:bg-white/20"></span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 dark:text-[#a8ff35]" />
                mail me at{" "}
                <a 
                  href="mailto:adityadkhamait@gmail.com" 
                  className="relative inline-flex items-center gap-1.5 font-semibold text-black dark:text-white hover:text-emerald-500 dark:hover:text-[#a8ff35] transition-colors group"
                >
                  adityadkhamait@gmail.com
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-500 dark:bg-[#a8ff35] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </span>
              <span className="hidden sm:block w-12 h-px bg-black/20 dark:bg-white/20"></span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
