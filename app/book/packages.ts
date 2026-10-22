export const packages = [
  { id: "creative-photo", service: "Photos", tier: "Creative", minPrice: 75, maxPrice: 100, description: "A concept-driven mini shoot with a distinct visual style.", details: ["30-minute session · 1 location · 1 look", "5 edited photos", "Expressive posing and stylized color for personal projects"] },
  { id: "professional-photo", service: "Photos", tier: "Professional", minPrice: 125, maxPrice: 150, description: "A fuller, polished portrait session for work or personal branding.", details: ["90-minute session · up to 2 nearby locations", "Up to 3 looks · 15 edited photos", "Guided posing, consistent color and light retouching"] },
  { id: "creative-video", service: "Video", tier: "Creative", minPrice: 150, maxPrice: 175, description: "A short artistic video built around one focused idea.", details: ["Up to 45 minutes filming · 1 location", "One edited video, up to 30 seconds", "Stylized color, expressive cuts and music sync"] },
  { id: "professional-video", service: "Video", tier: "Professional", minPrice: 175, maxPrice: 200, description: "A polished video for a brand, service or event.", details: ["Up to 90 minutes filming · 1 location", "One video, up to 90 seconds + one 15-second cutdown", "Planned coverage, consistent color and a clear brand message"] },
  { id: "creative-mixed-media", service: "Mixed media", tier: "Creative", minPrice: 250, maxPrice: 275, description: "An expressive collage treatment for one artistic concept.", details: ["One 15–30 second video · 1 visual concept", "Up to 5 animated accent moments", "Textures, cutouts and hand-drawn details"] },
  { id: "professional-mixed-media", service: "Mixed media", tier: "Professional", minPrice: 275, maxPrice: 300, description: "A fuller, polished mixed-media treatment tailored to your brand.", details: ["One 45–60 second video · 1 visual concept", "Up to 12 animated accent moments", "Branded text, controlled textures and cohesive transitions", "Includes one 15-second cutdown for social"] },
] as const;

export function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2, minimumFractionDigits: value % 1 ? 2 : 0 }).format(value);
}

export function priceRange(item: { minPrice: number; maxPrice: number }) {
  return `${money(item.minPrice)}–${money(item.maxPrice)}`;
}

export function depositRange(item: { minPrice: number; maxPrice: number }) {
  return `${money(item.minPrice / 4)}–${money(item.maxPrice / 4)}`;
}
