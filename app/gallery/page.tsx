import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import DesktopChrome from "../components/DesktopChrome";
import { photoAlt } from "../new-photos";
import { galleryImages } from "../portfolio";

export default function GalleryPage() {
  return (
    <DesktopChrome><div className="retro-site">
      <Navbar />
      <main>
        <header className="poster-page-heading poster-gallery-heading">
          <div className="poster-section-meta"><span>PHOTO ALBUM</span><span>MYLESTOGRAPHY</span></div>
          <h1>Photos.</h1>
          <div className="poster-page-heading-bottom">
            <span>{galleryImages.length} PHOTOS</span>
          </div>
        </header>
        <section className="poster-gallery-body" aria-label="Photography portfolio">
          <div className="poster-gallery-intro"><span>PHOTO ALBUM</span><span>SCROLL ↓</span></div>
          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <figure className="gallery-card" key={src}>
                <Image src={src} alt={photoAlt(src, `Mylestography portfolio photograph ${index + 1}`)} width={900} height={1200} sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 33vw" />
                <figcaption>PHOTO {String(index + 1).padStart(2, "0")}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="poster-gallery-end"><h2>Need photos?</h2><Link href="/book" className="poster-button">BOOK A SHOOT <span aria-hidden="true">↗</span></Link></section>
      </main>
      <SiteFooter />
    </div></DesktopChrome>
  );
}
