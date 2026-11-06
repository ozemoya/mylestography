import Image from "next/image";

export default function MixedMedia() {
  return (
    <section id="mixed-media" className="mixed-media section-wrap" aria-labelledby="mixed-media-title">
      <div className="mixed-media-copy">
        <h2 id="mixed-media-title">Mixed media.</h2>
      </div>
      <div className="mixed-media-player">
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet="/mixed-media-animation-still.webp" />
          <Image src="/mixed-media-animation.gif" alt="Mylestography mixed media animation" width={400} height={225} unoptimized />
        </picture>
      </div>
    </section>
  );
}
