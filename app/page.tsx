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
              <p className="poster-label">Atlanta, GA · Photo / Video / Mixed Media</p>
              <h1 id="home-title">Images that<br /><em>feel like you.</em></h1>
              <p className="poster-hero-intro">You won&apos;t see photos like these.</p>
              <Link href="/gallery" className="poster-button">Explore the portfolio <span aria-hidden="true">↗</span></Link>
              <p className="poster-hero-bottom">Photography with personality, presence, and a point of view.</p>
            </div>
          </section>
        </main>
      </div>
    </DesktopChrome>
  );
}
