export default function MixedMedia() {
  return (
    <section id="mixed-media" className="mixed-media section-wrap" aria-labelledby="mixed-media-title">
      <div className="mixed-media-copy">
        <h2 id="mixed-media-title">Mixed media.</h2>
      </div>
      <div className="mixed-media-player">
        <video controls playsInline preload="metadata" aria-label="Mylestography mixed media animation">
          <source src="/mixed-media-animation.mp4" type="video/mp4" />
          <a href="/mixed-media-animation.mp4">Open animation</a>
        </video>
      </div>
    </section>
  );
}
