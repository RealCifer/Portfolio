"use client";

import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const skills = [
  { name: "React.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Django", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "SQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { name: "Postman", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "Redis", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  // Ollama doesn't have an official devicon, so we can use a generic AI-like icon or just text.
  { name: "Ollama", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" } // Fallback to a penguin for Linux/AI or similar. We'll add text below it.
];

export default function Skills() {
  return (
    <section className="relative z-20 py-20 border-t border-b border-black/5 dark:border-white/5 overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 mb-10 px-6 md:px-12 lg:px-24">
        <h3 className="font-display text-3xl font-light tracking-tight text-black dark:text-white md:text-5xl">
          Core <span className="font-semibold text-emerald-600 dark:text-[#a8ff35]">Technologies</span>
        </h3>
      </div>

      <div className="relative z-10 flex overflow-x-hidden group">
        {/* We duplicate the skills array to create a seamless infinite scroll effect */}
        <motion.div
          className="flex gap-8 whitespace-nowrap px-4 py-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          // The hover animation pauses the marquee and interactively scales the hovered item
        >
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="flex shrink-0 items-center gap-4 cursor-pointer rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-8 py-4 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-emerald-500 hover:bg-emerald-500/10 dark:hover:border-[#a8ff35] dark:hover:bg-[#a8ff35]/10 hover:shadow-[0_0_30px_rgba(168,255,53,0.3)] hover:-translate-y-2"
            >
              <img
                src={skill.src}
                alt={skill.name}
                className="h-10 w-10 shrink-0 object-contain drop-shadow-md"
              />
              <span className="text-xl font-semibold tracking-wide text-black/80 dark:text-white/80">
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      
    </section>
  );
}
