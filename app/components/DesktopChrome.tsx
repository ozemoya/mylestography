"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type AppPath = "/" | "/gallery" | "/book";
type WindowState = "open" | "minimized" | "closed";

const apps: { path: AppPath; name: string; icon: "home" | "photos" | "book" }[] = [
  { path: "/", name: "Mylestography", icon: "home" },
  { path: "/gallery", name: "Photo Album", icon: "photos" },
  { path: "/book", name: "Book a Session", icon: "book" },
];

function AppIcon({ icon }: { icon: "home" | "photos" | "book" }) {
  return <span className={`desktop-icon-art desktop-icon-${icon}`} aria-hidden="true">
    {icon === "home" && <svg viewBox="0 0 48 48" fill="none"><rect x="7" y="7" width="34" height="29" fill="#e7d5ad" stroke="#263d2b" strokeWidth="3"/><rect x="11" y="11" width="26" height="21" fill="#84a278" stroke="#263d2b" strokeWidth="2"/><path d="M13 31 21 22l6 5 5-8 4 12" fill="#bd9560" stroke="#263d2b" strokeWidth="2"/><path d="M14 42h20" stroke="#263d2b" strokeWidth="4"/></svg>}
    {icon === "photos" && <svg viewBox="0 0 48 48" fill="none"><path d="M5 15h38v27H5z" fill="#dec89a" stroke="#263d2b" strokeWidth="3"/><path d="M5 15V8h14l4 5h20v5" fill="#b88a55" stroke="#263d2b" strokeWidth="3"/><rect x="13" y="23" width="22" height="13" fill="#7c9a70" stroke="#263d2b" strokeWidth="2"/><circle cx="29" cy="27" r="2" fill="#f3dfaa"/><path d="m15 34 6-6 5 5" stroke="#f3dfaa" strokeWidth="2"/></svg>}
    {icon === "book" && <svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="34" fill="#ead9b3" stroke="#263d2b" strokeWidth="3"/><path d="M8 17h32" stroke="#263d2b" strokeWidth="3"/><path d="M15 5v8m18-8v8" stroke="#263d2b" strokeWidth="4"/><path d="M15 25h7m4 0h7m-18 7h7m4 0h7" stroke="#8f5d3e" strokeWidth="3"/></svg>}
  </span>;
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
    <div className="desktop-wallpaper-label" aria-hidden="true">MYLESTOGRAPHY<br /><span>PHOTO · VIDEO · MIXED MEDIA</span></div>
    <nav className="desktop-shortcuts" aria-label="Desktop shortcuts">
      {apps.map((app) => <button type="button" key={app.path} className="desktop-shortcut" onClick={() => openApp(app.path)}><AppIcon icon={app.icon} /><span>{app.name}</span></button>)}
    </nav>

    {windowState === "open" && <div className={`desktop-window${maximized ? " is-maximized" : ""}`} style={maximized ? undefined : { transform: `translate(${offset.x}px, ${offset.y}px)` }}>
      <div className="desktop-window-titlebar" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
        <span className="desktop-window-title"><AppIcon icon={currentApp.icon} /> {currentApp.name} — Mylestography</span>
        <div className="desktop-window-controls">
          <button type="button" aria-label="Minimize window" title="Minimize" onClick={() => setWindowState("minimized")}>_</button>
          <button type="button" aria-label={maximized ? "Restore window" : "Maximize window"} title={maximized ? "Restore" : "Maximize"} onClick={() => { setMaximized(!maximized); setOffset({ x: 0, y: 0 }); }}>{maximized ? "▣" : "□"}</button>
          <button type="button" aria-label="Close window" title="Close" onClick={() => setWindowState("closed")}>×</button>
        </div>
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
