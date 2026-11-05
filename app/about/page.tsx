import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { aboutImage } from "../portfolio";

export default function About() {
  return (
    <div className="retro-site">
      <Navbar />
      <main className="poster-about">
        <div className="poster-about-photo"><Image src={aboutImage} alt="Portrait by Mylestography" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <section className="poster-about-copy">
          <p className="poster-label">BEHIND THE LENS / MYLESTOGRAPHY</p>
          <h1>Photographs<br />with <em>soul.</em></h1>
          <p>Mylestography is built around a simple belief: the most powerful images don&apos;t just show how a moment looked—they bring back how it felt.</p>
          <p>With a style that blends cinematic color, thoughtful composition, and natural expression, every session is shaped around the person in front of the camera. Expect room to be yourself and photographs that feel polished without losing their honesty.</p>
          <Link href="/book" className="poster-button">Work with me <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
