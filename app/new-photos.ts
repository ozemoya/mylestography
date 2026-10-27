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
  if (src.includes("/folder-collection/")) {
    const name = src.split("/").pop()?.replace(".webp", "") ?? "";
    if (["DSC09450", "DSC09462", "DSC09578"].includes(name)) return "Golden outdoor portrait with sunflowers and a parasol";
    if (["DSC00787", "DSCF1040", "DSCF1041", "DSCF1044", "DSCF1045", "DSCF1047"].includes(name)) return "Warm outdoor portrait photographed by Mylestography";
    if (["DSCF0488", "DSCF0535", "DSCF0746"].includes(name)) return "Studio portrait against a warm peach backdrop";
    if (name === "DSC06561") return "Playful low-angle outdoor fashion portrait";
    if (name === "DSC09114") return "Black-and-white portrait in a Spider-Man mask and hat";
    if (["DSCF1973", "DSCF2000", "DSCF2004", "DSCF2006", "DSCF2007", "DSCF2008", "DSCF2010", "DSCF2014"].includes(name)) return "Golden-light portrait among tall green leaves";
    if (["DSCF2265", "DSCF2265-2", "DSCF2416"].includes(name)) return "Evening fashion portrait in a black dress with pink details";
    if (["DSCF3225", "DSCF3229"].includes(name)) return "Celebration portrait with pastel balloon decorations";
    return "Live music performance under colorful stage lighting";
  }
  return newPhotos.find((photo) => photo.src === src)?.alt ?? fallback;
}
