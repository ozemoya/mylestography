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
      const dx = x - width / 2;
      const dy = y - height / 2;
      const radius = Math.hypot(width, height) * 0.85;
      const distanceSquared = dx * dx + dy * dy;
      const inward = 0.3 * Math.max(0, 1 - distanceSquared / (radius * radius));
      return [x - dx * inward, y - dy * inward];
    }

    function draw(offset: number) {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      context.beginPath();
      const margin = Math.max(width, height) * 0.35;
      for (let x = -margin - offset; x <= width + margin; x += SPACING) {
        for (let y = -margin; y <= height + margin; y += 12) {
          const [px, py] = warp(x, y);
          if (y === -margin) context.moveTo(px, py);
          else context.lineTo(px, py);
        }
      }
      for (let y = -margin; y <= height + margin; y += SPACING) {
        for (let x = -margin; x <= width + margin; x += 12) {
          const [px, py] = warp(x - offset, y);
          if (x === -margin) context.moveTo(px, py);
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
