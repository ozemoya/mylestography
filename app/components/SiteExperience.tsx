"use client";

import { useEffect, useRef, useState } from "react";

export default function SiteExperience({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoPlaying = useRef(false);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);
  const [volume, setVolume] = useState(3);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.03;
    // Audible autoplay is blocked by some browsers. Retry on the first interaction.
    void audio.play().catch(() => {});
    const playAfterInteraction = (event: Event) => {
      if ((event.target as Element)?.closest?.(".music-player")) return;
      if (audio.paused && !videoPlaying.current && !userPaused.current) {
        void audio.play().catch(() => {});
      }
    };
    let resumeMusic = false;
    const syncVideoPlayback = () => {
      const active = Array.from(document.querySelectorAll<HTMLVideoElement>(".mixed-media-player video"))
        .some((video) => !video.paused && !video.ended && !video.error);
      if (active && !videoPlaying.current) {
        resumeMusic = !audio.paused;
        videoPlaying.current = true;
        audio.pause();
      } else if (!active && videoPlaying.current) {
        videoPlaying.current = false;
        if (resumeMusic && !userPaused.current) void audio.play().catch(() => {});
        resumeMusic = false;
      }
    };
    const onVideoPlayback = (event: Event) => {
      if (event.target instanceof HTMLVideoElement && event.target.matches(".mixed-media-player video")) {
        syncVideoPlayback();
      }
    };
    const playbackEvents = ["play", "pause", "ended", "error", "emptied"];
    for (const event of playbackEvents) document.addEventListener(event, onVideoPlayback, true);
    // Removing a playing video from the desktop can happen without a pause event.
    const observer = new MutationObserver(() => {
      if (videoPlaying.current) syncVideoPlayback();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("pointerdown", playAfterInteraction, { once: true });
    document.addEventListener("keydown", playAfterInteraction, { once: true });
    return () => {
      observer.disconnect();
      for (const event of playbackEvents) document.removeEventListener(event, onVideoPlayback, true);
      document.removeEventListener("pointerdown", playAfterInteraction);
      document.removeEventListener("keydown", playAfterInteraction);
    };
  }, []);

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio || videoPlaying.current) return;
    if (!audio.paused) {
      userPaused.current = true;
      audio.pause();
      return;
    }
    try {
      userPaused.current = false;
      setAudioError(false);
      await audio.play();
    } catch {
      setAudioError(true);
    }
  }

  function changeVolume(event: React.ChangeEvent<HTMLInputElement>) {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    if (audioRef.current) audioRef.current.volume = nextVolume / 100;
  }

  return <>
    {children}
    <div className="music-player" aria-label="Site music player">
      <div className="music-player-copy"><span className="music-player-label">MUSIC</span><span className="music-player-title">Feels Like We Only Go Backwards</span></div>
      <button type="button" onClick={toggleAudio} aria-label={playing ? "Pause Feels Like We Only Go Backwards" : "Play Feels Like We Only Go Backwards"} aria-pressed={playing}>{playing ? "Pause" : "Play"}</button>
      <button type="button" className="music-volume-button" onClick={() => setVolumeOpen(!volumeOpen)} aria-label="Volume" aria-expanded={volumeOpen} aria-controls="music-volume-panel">VOL</button>
      {volumeOpen && <div className="music-volume-panel" id="music-volume-panel"><label htmlFor="music-volume">Volume</label><input id="music-volume" type="range" min="0" max="100" value={volume} onChange={changeVolume} /><span>{volume}%</span></div>}
      {audioError && <span className="music-player-error" role="alert">Could not play audio.</span>}
      <audio ref={audioRef} src="/feels-like-we-only-go-backwards-instrumental.mp3" preload="auto" autoPlay loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setAudioError(true)} />
    </div>
  </>;
}
