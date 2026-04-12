"use client";

import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const experiences = [
  {
    role: "Frontend Developer Intern",
    company: "Startup Story Media",
    period: "May 2025 – Jul 2025",
    desc: "Integrated 8+ frontend components with Node.js APIs, resolving 15+ integration issues. Optimized API calls and client-side rendering by 20%."
  },
  {
    role: "Backend Developer Intern",
    company: "Edunet Foundation",
    period: "Jan 2024 – Apr 2024",
    desc: "Designed 12+ RESTful APIs (Node.js/Express) and optimized MySQL queries, reducing latency by 40%. Implemented secure auth and logging."
  }
];

export default function Experience() {
  return (
    <section className="relative z-20 overflow-hidden px-6 py-24 md:px-12 lg:px-24 text-black dark:text-white">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <h3 className="font-display mb-16 text-3xl font-light tracking-tight md:text-5xl">
          Professional <span className="font-semibold">Experience</span>
        </h3>
        
        <div className="flex flex-col gap-12 border-l border-black/10 dark:border-white/10 pl-8 md:pl-12">
          {experiences.map((exp, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              key={i}
              className="relative"
            >
              <div className="absolute -left-[39px] md:-left-[55px] top-2 h-4 w-4 rounded-full bg-black/20 dark:bg-white/20 ring-4 ring-white dark:ring-[#121212]" />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="font-display text-2xl font-medium tracking-tight">{exp.role}</h4>
                  <div className="text-lg text-emerald-600 dark:text-[#a8ff35]">{exp.company}</div>
                </div>
                <div className="text-black/40 dark:text-white/40 mt-2 md:mt-0 uppercase tracking-widest text-sm">{exp.period}</div>
              </div>
              <p className="max-w-3xl leading-relaxed text-black/70 dark:text-white/70">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
