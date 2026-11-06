import Image from "next/image";
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
          <picture>
            <source media="(prefers-reduced-motion: reduce)" srcSet="/mixed-media-video-still.webp" />
            <Image src="/mixed-media-video.gif" alt="Mylestography video excerpt" width={400} height={225} unoptimized />
          </picture>
        </div>
      </section>
    </main>
  </div></DesktopChrome>;
}
