"use client";

import { useRef, useState } from "react";

export default function SiteExperience({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

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
      <div className="music-player-copy"><span className="music-player-label">MUSIC</span><span className="music-player-title">Grapes Upon the Vine</span></div>
      <button type="button" onClick={toggleAudio} aria-label={playing ? "Pause Grapes Upon the Vine" : "Play Grapes Upon the Vine"} aria-pressed={playing}>{playing ? "Pause" : "Play"}</button>
      {audioError && <span className="music-player-error" role="alert">Could not play audio.</span>}
      <audio ref={audioRef} src="/grapes-upon-the-vine.mp3" preload="none" loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setAudioError(true)} />
    </div>
  </>;
}
