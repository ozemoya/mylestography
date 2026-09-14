export default function MixedMedia() {
  return (
    <section id="mixed-media" className="mixed-media section-wrap" aria-labelledby="mixed-media-title">
      <div className="mixed-media-copy">
        <p className="eyebrow">Mixed media</p>
        <h2 id="mixed-media-title">Beyond the<br /><em>still frame.</em></h2>
        <p>A little movement. A different perspective. Explore another side of Mylestography.</p>
        <a className="text-link" href="https://www.instagram.com/p/Da88v3kRvfs/" target="_blank" rel="noopener noreferrer">
          Watch on Instagram <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="mixed-media-player">
        <iframe
          src="https://www.instagram.com/p/Da88v3kRvfs/embed/"
          title="Mylestography mixed-media video on Instagram"
          loading="lazy"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <p>Video not loading? <a href="https://www.instagram.com/p/Da88v3kRvfs/" target="_blank" rel="noopener noreferrer">Open it on Instagram ↗</a></p>
      </div>
    </section>
  );
}
