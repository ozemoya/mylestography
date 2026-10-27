export const packages = [
  { id: "creative-photo", service: "Photos", tier: "Creative", minPrice: 100, maxPrice: 150, description: "A distinct visual style built around your idea.", details: ["All photos straight from camera", "Up to 20 edited photos"] },
  { id: "professional-photo", service: "Photos", tier: "Professional", minPrice: 150, maxPrice: 250, description: "Polished portraits for work or personal branding.", details: ["Up to 3 looks and 15 edited photos", "Guided posing, color and light retouching"] },
  { id: "event-photo", service: "Photos", tier: "Event", minPrice: 300, maxPrice: 500, description: "Photography for your event.", details: ["60–100 edited photos, depending on the event"] },
  { id: "video", service: "Video", tier: "Video", minPrice: 250, maxPrice: 500, description: "A polished video for a brand, service or event.", details: ["One edited video, up to 90 seconds", "Longer videos can be arranged upon request, with pricing adjusted to the project’s scope"] },
  { id: "mixed-media", service: "Mixed media", tier: "Mixed media", minPrice: 250, maxPrice: 300, description: "An expressive collage treatment for one artistic concept.", details: ["One 15–30 second video", "Up to 5 animated accent moments"] },
] as const;

export function packageLabel(item: { tier: string; service: string }) {
  return item.service === "Photos" ? `${item.tier} photography` : item.tier;
}

export function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2, minimumFractionDigits: value % 1 ? 2 : 0 }).format(value);
}

export function priceRange(item: { minPrice: number; maxPrice: number }) {
  return `${money(item.minPrice)}–${money(item.maxPrice)}`;
}

export function depositRange(item: { minPrice: number; maxPrice: number }) {
  return `${money(item.minPrice / 4)}–${money(item.maxPrice / 4)}`;
}
