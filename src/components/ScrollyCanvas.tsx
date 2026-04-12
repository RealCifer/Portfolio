"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

const FRAME_COUNT = 75;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const layoutRef = useRef({ w: 0, h: 0, dpr: 1 });
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll();
  const frameIndex = useTransform(scrollYProgress, [0, 0.8], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const bump = () => {
      loadedCount++;
      setImagesLoaded(loadedCount);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(2, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.066s.png`;
      img.decoding = "async";
      img.onload = bump;
      img.onerror = bump;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(globalThis.devicePixelRatio || 1, 2);
      const w = globalThis.innerWidth;
      const h = globalThis.innerHeight;
      layoutRef.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let lastDrawn = -1;
    let rafScheduled = false;

    const drawFrame = (index: number) => {
      const imgs = imagesRef.current;
      const img = imgs[index];
      if (!img?.complete) return;

      const { w, h } = layoutRef.current;
      if (w === 0 || h === 0) {
        resizeCanvas();
      }
      const { w: cw, h: ch } = layoutRef.current;
      if (cw === 0 || ch === 0) return;

      const scale = Math.max(cw / img.width, ch / img.height);
      const x = cw / 2 - (img.width / 2) * scale;
      const isMobile = cw < 768;
      const y = isMobile
        ? ch * 0.25 - (img.height * 0.25) * scale
        : ch / 2 - (img.height / 2) * scale;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      lastDrawn = index;
    };

    resizeCanvas();
    if (images[0]?.complete) {
      drawFrame(0);
    }

    const scheduleDraw = (raw: number) => {
      const i = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(raw)));
      if (i === lastDrawn && layoutRef.current.w > 0) return;

      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(() => {
          rafScheduled = false;
          const latest = frameIndex.get();
          const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest)));
          drawFrame(idx);
        });
      }
    };

    const unsubscribe = frameIndex.on("change", scheduleDraw);

    const handleResize = () => {
      resizeCanvas();
      lastDrawn = -1;
      const latest = frameIndex.get();
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest)));
      drawFrame(idx);
    };

    globalThis.addEventListener("resize", handleResize, { passive: true });

    return () => {
      unsubscribe();
      globalThis.removeEventListener("resize", handleResize);
    };
  }, [images, frameIndex]);

  return (
    <div className="absolute left-0 top-0 h-full w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-black dark:text-white">
            <div className="mb-4 text-sm font-medium uppercase tracking-widest text-black/50 dark:text-white/50">
              Loading Experience
            </div>
            <div className="flex h-1 w-48 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div
                className="h-full bg-black transition-all duration-300 ease-out dark:bg-white"
                style={{ width: `${(imagesLoaded / FRAME_COUNT) * 100}%` }}
              />
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="block h-full w-full object-cover [contain:strict]"
        />
      </div>
    </div>
  );
}
