"use client";

import { useEffect, useRef } from "react";

const SPACING = 54;
const SPEED = 24;

export default function WallpaperGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    let start = 0;

    function resize() {
      if (!canvas || !context) return;
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(0);
    }

    function warp(x: number, y: number): [number, number] {
      const centerX = width * 0.09;
      const spread = width * 0.14;
      const arc = Math.exp(-Math.pow((x - centerX) / spread, 2));
      const verticalFade = Math.max(0, Math.sin(Math.PI * y / height));
      return [x, y - 24 * arc * verticalFade];
    }

    function draw(offset: number) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      context.beginPath();
      for (let x = -SPACING * 2 - offset; x <= width + SPACING * 2; x += SPACING) {
        for (let y = -20; y <= height + 20; y += 12) {
          const [px, py] = warp(x, y);
          if (y === -20) context.moveTo(px, py);
          else context.lineTo(px, py);
        }
      }
      for (let y = -SPACING; y <= height + SPACING; y += SPACING) {
        for (let x = -20; x <= width + 20; x += 12) {
          const [px, py] = warp(x - offset, y);
          if (x === -20) context.moveTo(px, py);
          else context.lineTo(px, py);
        }
      }
      context.strokeStyle = "rgba(227, 212, 167, .33)";
      context.lineWidth = 1.4;
      context.stroke();
    }

    function tick(time: number) {
      if (!start) start = time;
      draw(reducedMotion.matches ? 0 : ((time - start) / 1000 * SPEED) % SPACING);
      if (!reducedMotion.matches) frame = requestAnimationFrame(tick);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  return <canvas className="desktop-wallpaper-grid" ref={canvasRef} aria-hidden="true" />;
}
