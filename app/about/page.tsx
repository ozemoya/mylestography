import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import DesktopChrome from "../components/DesktopChrome";
import { aboutImage } from "../portfolio";

export default function About() {
  return (
    <DesktopChrome><div className="retro-site">
      <Navbar />
      <main className="poster-about">
        <div className="poster-about-photo"><Image src={aboutImage} alt="Portrait by Mylestography" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <section className="poster-about-copy">
          <p className="poster-label">MYLESTOGRAPHY / ATLANTA</p>
          <h1>About.</h1>
          <p>I&apos;m Myles Miller. I shoot photos, video, and mixed media in Atlanta.</p>
          <Link href="/book" className="poster-button">BOOK A SHOOT <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div></DesktopChrome>
  );
}
