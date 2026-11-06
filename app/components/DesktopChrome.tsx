"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import WallpaperGrid from "./WallpaperGrid";

type AppPath = "/" | "/gallery" | "/book" | "/media";
type WindowState = "open" | "minimized" | "closed";

const apps: { path: AppPath; name: string; icon: "home" | "photos" | "book" | "media" }[] = [
  { path: "/", name: "Mylestography", icon: "home" },
  { path: "/gallery", name: "Photo Album", icon: "photos" },
  { path: "/book", name: "Book a Session", icon: "book" },
  { path: "/media", name: "Video & Mixed Media", icon: "media" },
];

function AppIcon({ icon }: { icon: "home" | "photos" | "book" | "media" }) {
  const paths = {
    home: "/icons/win98/camera.png",
    photos: "/icons/win98/photo-album.png",
    book: "/icons/win98/booking.png",
    media: "/icons/win98/mixed-media.png",
  };
  return <span className={`desktop-icon-art desktop-icon-${icon}`} aria-hidden="true"><Image src={paths[icon]} alt="" width={48} height={48} unoptimized /></span>;
}

export default function DesktopChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [windowState, setWindowState] = useState<WindowState>("open");
  const [maximized, setMaximized] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [clock, setClock] = useState("");
  const drag = useRef<{ x: number; y: number; originX: number; originY: number } | null>(null);
  const currentApp = apps.find((app) => app.path === pathname) ?? apps[0];

  useEffect(() => {
    setWindowState("open");
    setStartOpen(false);
    setOffset({ x: 0, y: 0 });
  }, [pathname]);

  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date()));
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  function openApp(path: AppPath) {
    setStartOpen(false);
    setWindowState("open");
    if (pathname !== path) router.push(path);
  }

  function startDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (maximized || window.matchMedia("(max-width: 700px)").matches || (event.target as HTMLElement).closest("button")) return;
    drag.current = { x: event.clientX, y: event.clientY, originX: offset.x, originY: offset.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    setOffset({
      x: Math.max(-130, Math.min(window.innerWidth - 240, drag.current.originX + event.clientX - drag.current.x)),
      y: Math.max(-15, Math.min(window.innerHeight - 130, drag.current.originY + event.clientY - drag.current.y)),
    });
  }

  return <div className="desktop-shell">
    <video className="desktop-wallpaper-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
      <source src="/wallpaper-logo.webm" type="video/webm" />
    </video>
    <WallpaperGrid />
    <nav className="desktop-shortcuts" aria-label="Desktop shortcuts">
      {apps.map((app) => <button type="button" key={app.path} className="desktop-shortcut" onClick={() => openApp(app.path)}><AppIcon icon={app.icon} /><span>{app.name}</span></button>)}
    </nav>

    {windowState === "open" && <div className={`desktop-window${maximized ? " is-maximized" : ""}`} style={maximized ? undefined : { transform: `translate(${offset.x}px, ${offset.y}px)` }}>
      <div className="desktop-window-titlebar" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
        <span className="desktop-window-title"><AppIcon icon={currentApp.icon} /> {currentApp.name} — Mylestography Browser</span>
        <div className="desktop-window-controls">
          <button type="button" aria-label="Minimize window" title="Minimize" onClick={() => setWindowState("minimized")}>_</button>
          <button type="button" aria-label={maximized ? "Restore window" : "Maximize window"} title={maximized ? "Restore" : "Maximize"} onClick={() => { setMaximized(!maximized); setOffset({ x: 0, y: 0 }); }}>{maximized ? "▣" : "□"}</button>
          <button type="button" aria-label="Close window" title="Close" onClick={() => setWindowState("closed")}>×</button>
        </div>
      </div>
      <div className="desktop-browser-toolbar" aria-label="Browser controls">
        <button type="button" onClick={() => router.back()} aria-label="Go back">‹ <span>Back</span></button>
        <button type="button" onClick={() => router.forward()} aria-label="Go forward">› <span>Forward</span></button>
        <button type="button" onClick={() => openApp("/")} aria-label="Open homepage">⌂ <span>Home</span></button>
        <div className="desktop-browser-address"><span>Address</span><output>mylestography.studio{pathname}</output></div>
      </div>
      <div className="desktop-window-body">{children}</div>
      <div className="desktop-window-status"><span>{currentApp.name}</span><span>Atlanta, GA</span></div>
    </div>}

    <div className="desktop-taskbar">
      <button type="button" className={`desktop-start${startOpen ? " is-active" : ""}`} aria-expanded={startOpen} aria-controls="desktop-start-menu" onClick={() => setStartOpen(!startOpen)}><span className="desktop-start-mark" aria-hidden="true" /> Start</button>
      {windowState !== "closed" && <button type="button" className={`desktop-task-button${windowState === "open" ? " is-active" : ""}`} onClick={() => { setWindowState(windowState === "open" ? "minimized" : "open"); setStartOpen(false); }}><AppIcon icon={currentApp.icon} /><span>{currentApp.name}</span></button>}
      <span className="desktop-taskbar-spacer" />
      <span className="desktop-clock" aria-label={clock ? `Current time ${clock}` : "Clock"}>{clock}</span>
    </div>
    {startOpen && <div className="desktop-start-menu" id="desktop-start-menu">
      <div className="desktop-start-side" aria-hidden="true">MYLESTOGRAPHY</div>
      <div className="desktop-start-items">
        <div className="desktop-start-heading">Open</div>
        {apps.map((app) => <button type="button" key={app.path} onClick={() => openApp(app.path)}><AppIcon icon={app.icon} /><span>{app.name}</span></button>)}
        <div className="desktop-start-divider" />
        <button type="button" onClick={() => { setStartOpen(false); setWindowState("closed"); }}><span className="desktop-menu-close" aria-hidden="true">×</span><span>Close window</span></button>
      </div>
    </div>}
  </div>;
}
