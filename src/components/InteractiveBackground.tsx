"use client";

import { useEffect, useRef } from "react";

class Orb {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  baseRadius: number;

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.baseRadius = radius;
    this.radius = radius;
    this.color = color;
    // random velocity
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
  }

  update(width: number, height: number, mouse: { x: number; y: number; clicked: boolean }) {
    this.x += this.vx;
    this.y += this.vy;

    // bounce off walls loosely to allow them to go slightly off screen
    if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1;
    if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1;

    // Interaction with mouse
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // repulse based on mouse proximity
    const interactionRadius = 300;
    if (distance < interactionRadius) {
      const force = (interactionRadius - distance) / interactionRadius;
      this.x -= (dx / distance) * force * 5;
      this.y -= (dy / distance) * force * 5;
    }

    if (mouse.clicked && distance < interactionRadius * 1.5) {
      // push away strongly on click
      this.vx -= (dx / distance) * 15;
      this.vy -= (dy / distance) * 15;
    }
    
    // add some friction if moving too fast
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 2.5) {
      this.vx *= 0.95;
      this.vy *= 0.95;
    } else if (speed < 0.5) {
       // gently bump up speed to keep them moving
       this.vx *= 1.05;
       this.vy *= 1.05;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );
    gradient.addColorStop(0, `${this.color}80`); // center opacity
    gradient.addColorStop(1, `${this.color}00`); // transparent edge

    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let orbs: Orb[] = [];
    // Super vibrant, premium colors
    const colors = ["#ec4899", "#8b5cf6", "#3b82f6", "#14b8a6", "#f43f5e"];
    const numOrbs = 15; 

    const mouse = { x: -1000, y: -1000, clicked: false };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initOrbs();
    };

    const initOrbs = () => {
      orbs = [];
      for (let i = 0; i < numOrbs; i++) {
        const radius = Math.random() * 250 + 150; 
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        orbs.push(new Orb(x, y, radius, color));
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener("mousedown", () => {
      mouse.clicked = true;
      setTimeout(() => (mouse.clicked = false), 150);
    });
    
    // handle mouse leaving window so orbs don't bunch up near edges
    document.addEventListener("mouseleave", () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    resize();

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // On dark mode, "screen" or "lighter" looks great. On light mode, "multiply" or default is better.
      // We will just use default source-over for consistently beautiful rendering across both,
      // since the colors are already vibrant and have alpha applied in the gradient.
      
      orbs.forEach((orb) => {
        orb.update(canvas.width, canvas.height, mouse);
        orb.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-white dark:bg-[#121212]">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 dark:opacity-40 transition-opacity duration-1000"
      />
    </div>
  );
}
