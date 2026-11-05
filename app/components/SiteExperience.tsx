"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SiteExperience({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const sites = Array.from(document.querySelectorAll<HTMLElement>(".retro-site"));
    if (!sites.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = sites.flatMap((site) => Array.from(site.querySelectorAll<HTMLElement>(
      "main > section, main > header, .poster-work-item, .gallery-card, .package-card, .poster-footer"
    )));
    targets.forEach((target) => target.classList.add("reveal-target"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px 60px 0px" });
    targets.forEach((target) => observer.observe(target));
    const frame = requestAnimationFrame(() => sites.forEach((site) => site.classList.add("reveal-ready")));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sites.forEach((site) => site.classList.remove("reveal-ready"));
      targets.forEach((target) => target.classList.remove("reveal-target", "is-visible"));
    };
  }, [pathname]);

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      setAudioError(false);
      await audio.play();
    } catch {
      setAudioError(true);
    }
  }

  return <>
    {children}
    <div className="music-player" aria-label="Site music player">
      <div className="music-player-copy"><span className="music-player-label">SITE SOUNDTRACK</span><span className="music-player-title">Grapes Upon the Vine</span></div>
      <button type="button" onClick={toggleAudio} aria-label={playing ? "Pause Grapes Upon the Vine" : "Play Grapes Upon the Vine"} aria-pressed={playing}>{playing ? "Pause" : "Play"}</button>
      {audioError && <span className="music-player-error" role="alert">Could not play audio.</span>}
      <audio ref={audioRef} src="/grapes-upon-the-vine.mp3" preload="none" loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setAudioError(true)} />
    </div>
  </>;
}
