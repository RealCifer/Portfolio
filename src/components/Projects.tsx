"use client";

import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const projects = [
  {
    title: "Polling Application Backend",
    category: "Node.js, MySQL",
    year: "2024",
    desc: "Backend-driven polling platform with real-time results and transactional logic.",
  },
  {
    title: "Backend & ETL System",
    category: "MongoDB, REST APIs",
    year: "2024",
    desc: "Scalable data ingestion service with protected routing and document persistence.",
  },
  {
    title: "ArogyaVoice AI Agent",
    category: "Python, FastAPI",
    year: "2024",
    desc: "Multilingual scheduling agent using Phi-3 LLM and Redis-based memory.",
  },
  {
    title: "Real-Time Collaborative Canvas",
    category: "React, WebSockets",
    year: "2023",
    desc: "Live drawing platform handling concurrent events and low-latency rendering.",
  },
  {
    title: "E-Commerce Web App",
    category: "Full Stack",
    year: "2023",
    desc: "React/Node store with Firebase auth and RESTful product management.",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-20 min-h-screen px-6 py-24 md:px-12 lg:px-24 text-black dark:text-white overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex items-end justify-between">
          <h3 className="font-display text-3xl font-light tracking-tight md:text-5xl">
            Selected <span className="font-semibold">Work</span>
          </h3>
          <a href="#contact" className="text-sm uppercase tracking-widest text-emerald-600 dark:text-[#a8ff35] hover:text-black dark:hover:text-white transition-colors">
            Get in touch →
          </a>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((project, i) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              key={i}
              className="group relative flex aspect-video cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-8 backdrop-blur-md transition-all duration-500 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/10 dark:hover:bg-white/10"
            >
              <div className="absolute inset-0 -z-10 translate-y-[100%] bg-gradient-to-t from-black/10 dark:from-white/10 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
               
              <div className="flex w-full flex-col justify-between h-full">
                <div className="text-black/60 dark:text-white/60 text-sm">{project.desc}</div>
                <div className="flex w-full items-end justify-between mt-auto">
                  <div>
                    <p className="mb-2 text-sm font-medium tracking-widest text-black/50 dark:text-white/50 uppercase">
                      {project.category}
                    </p>
                    <h4 className="font-display inline-block border-b border-transparent text-2xl font-medium tracking-tight transition-all group-hover:border-black/20 dark:group-hover:border-white/20 md:text-3xl">
                      {project.title}
                    </h4>
                  </div>
                  <div className="text-sm text-black/40 dark:text-white/40">{project.year}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
