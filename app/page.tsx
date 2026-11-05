import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import DesktopChrome from "./components/DesktopChrome";
import { photoAlt } from "./new-photos";
import { heroImage } from "./portfolio";

export default function Home() {
  return (
    <DesktopChrome>
      <div className="retro-site desktop-home-app">
        <Navbar />
        <main className="desktop-home-main">
          <section className="poster-hero" aria-labelledby="home-title">
            <div className="poster-hero-photo">
              <Image src={heroImage} alt={photoAlt(heroImage, "Editorial portrait photographed by Mylestography")} fill priority sizes="(max-width: 760px) 100vw, 55vw" />
              <span className="poster-photo-stamp">MYLESTOGRAPHY / 01</span>
            </div>
            <div className="poster-hero-content">
              <h1 id="home-title">You won&apos;t see<br /><em>photos like these.</em></h1>
              <Link href="/gallery" className="poster-button">VIEW PHOTOS <span aria-hidden="true">↗</span></Link>
            </div>
          </section>
        </main>
      </div>
    </DesktopChrome>
  );
}
