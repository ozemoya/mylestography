import DesktopChrome from "../components/DesktopChrome";
import MixedMedia from "../components/MixedMedia";
import Navbar from "../components/Navbar";

export default function MediaPage() {
  return <DesktopChrome><div className="retro-site">
    <Navbar />
    <main>
      <MixedMedia />
      <section id="video" className="mixed-media media-video-section" aria-labelledby="media-video-title">
        <div className="mixed-media-copy">
          <h2 id="media-video-title">Video.</h2>
        </div>
        <div className="mixed-media-player">
          <video controls playsInline preload="metadata" aria-label="Mylestography video">
            <source src="/mixed-media-video.mp4" type="video/mp4" />
            <a href="/mixed-media-video.mp4">Open video</a>
          </video>
        </div>
      </section>
    </main>
  </div></DesktopChrome>;
}
