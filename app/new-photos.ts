export const newPhotos = [
  { src: "/images/new-work/studio-smile.jpg", alt: "Smiling studio portrait with a pink flower" },
  { src: "/images/new-work/garden-portrait.jpg", alt: "Outdoor portrait in a pink floral shirt in warm sunlight" },
  { src: "/images/new-work/concert-violet.jpg", alt: "Singer performing under violet and red stage lights" },
  { src: "/images/new-work/studio-campaign.jpg", alt: "Four models in a warm-toned studio campaign" },
  { src: "/images/new-work/studio-headshot.jpg", alt: "Smiling portrait with glasses against a peach studio backdrop" },
  { src: "/images/new-work/chenayder-performance.jpg", alt: "Chenayder singing into a microphone under warm red stage lighting" },
  { src: "/images/new-work/studio-relaxed.jpg", alt: "Relaxed studio portrait with folded arms" },
  { src: "/images/new-work/studio-friends.jpg", alt: "Friends smiling together in a studio portrait" },
];

export function photoAlt(src: string, fallback: string) {
  return newPhotos.find((photo) => photo.src === src)?.alt ?? fallback;
}
