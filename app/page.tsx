import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import MixedMedia from "./components/MixedMedia";
import SiteFooter from "./components/SiteFooter";
import { photoAlt } from "./new-photos";
import { heroImage, closingImage, featuredImages } from "./portfolio";

export default function Home() {
  return (
    <div className="retro-site">
      <Navbar />
      <main>
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

        <div className="poster-marquee" aria-label="Photo, Video, Mixed Media">
          <span>PHOTO</span><i aria-hidden="true">✳</i><span>VIDEO</span><i aria-hidden="true">✳</i><span>MIXED MEDIA</span><i aria-hidden="true">✳</i><span>ATLANTA</span>
        </div>

        <section className="poster-story poster-pad" aria-labelledby="approach-title">
          <div className="poster-section-meta"><span>01 / THE APPROACH</span><span>MADE TO STAND OUT</span></div>
          <div className="poster-story-grid">
            <h2 id="approach-title">If you need something captured in a <em>unique</em> way.</h2>
            <div className="poster-story-copy">
              <p>I try my best to make photos that stand out from those of the other photographers you see on Instagram, so when you see a photo, you know it&apos;s from me.</p>
              <Link href="/book" className="poster-text-link">Let&apos;s work together <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <section className="poster-statement poster-pad" aria-label="Creative disciplines">
          <div className="poster-section-meta"><span>MORE THAN A PHOTOGRAPH</span><span>EST. IN ATLANTA</span></div>
          <div className="poster-statement-grid">
            <h2>Photo.<br />Video.<br /><span>Mixed media.</span></h2>
            <div className="poster-statement-side"><span className="poster-flower" aria-hidden="true">✳</span><p>For the moments you want to remember—and the ideas you haven&apos;t seen done before.</p></div>
          </div>
        </section>

        <section className="poster-work poster-pad" aria-labelledby="work-title">
          <div className="poster-section-meta"><span>02 / SELECTED WORK</span><span>A LITTLE BIT OF EVERYTHING</span></div>
          <div className="poster-section-heading">
            <h2 id="work-title">Freshly <em>picked.</em></h2>
            <Link href="/gallery" className="poster-text-link">View all work <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="poster-work-grid">
            {featuredImages.map((src, index) => (
              <figure className={`poster-work-item poster-work-item-${index + 1}`} key={src}>
                <Image src={src} alt={photoAlt(src, `Mylestography selected work ${index + 1}`)} fill sizes="(max-width: 760px) 90vw, 50vw" />
                <figcaption>{String(index + 1).padStart(2, "0")} / SELECTED WORK</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <MixedMedia />

        <section className="poster-services poster-pad" aria-labelledby="services-title">
          <div className="poster-section-meta"><span>03 / WHAT I DO</span><span>THE GOOD STUFF</span></div>
          <h2 id="services-title">Made for<br /><em>the moment.</em></h2>
          <div className="poster-service-list">
            <div><span>01</span><h3>Portraits</h3><p>Personal, graduation, couples</p></div>
            <div><span>02</span><h3>Fashion</h3><p>Editorial, campaign, lookbook</p></div>
            <div><span>03</span><h3>Events</h3><p>Celebrations, culture, community</p></div>
          </div>
          <Link href="/book" className="poster-button poster-button-light">Find your session <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="poster-closing" aria-labelledby="closing-title">
          <div className="poster-closing-photo"><Image src={closingImage} alt={photoAlt(closingImage, "Portrait session by Mylestography")} fill sizes="(max-width: 760px) 100vw, 54vw" /></div>
          <div className="poster-closing-copy"><p className="poster-label">LET&apos;S MAKE SOMETHING TIMELESS</p><h2 id="closing-title">Your story deserves to be <em>remembered.</em></h2><Link href="/book" className="poster-button">Start a conversation <span aria-hidden="true">↗</span></Link></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
