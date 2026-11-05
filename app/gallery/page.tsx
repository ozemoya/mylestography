import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { photoAlt } from "../new-photos";
import { galleryImages } from "../portfolio";

export default function GalleryPage() {
  return (
    <div className="retro-site">
      <Navbar />
      <main>
        <header className="poster-page-heading poster-gallery-heading">
          <div className="poster-section-meta"><span>THE PORTFOLIO / 01</span><span>MYLESTOGRAPHY · ATLANTA</span></div>
          <h1>In full <em>bloom.</em></h1>
          <div className="poster-page-heading-bottom">
            <span>{String(galleryImages.length).padStart(2, "0")} FRAMES / SELECTED WORK</span>
          </div>
        </header>
        <section className="poster-gallery-body" aria-label="Photography portfolio">
          <div className="poster-gallery-intro"><span>TAKE A LOOK AROUND</span><span>↓ SCROLL TO EXPLORE</span></div>
          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <figure className="gallery-card" key={src}>
                <Image src={src} alt={photoAlt(src, `Mylestography portfolio photograph ${index + 1}`)} width={900} height={1200} sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 33vw" />
                <figcaption>{String(index + 1).padStart(2, "0")} / MYLESTOGRAPHY</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="poster-gallery-end"><span>LIKE WHAT YOU SEE?</span><h2>Let&apos;s make<br /><em>something yours.</em></h2><Link href="/book" className="poster-button">Book a session <span aria-hidden="true">↗</span></Link></section>
      </main>
      <SiteFooter />
    </div>
  );
}
