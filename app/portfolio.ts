import images from "./images.js";
import hiddenPhotos from "./hidden-photos.json";

const hidden = new Set(hiddenPhotos);
export const visibleImages: string[] = images.filter((src: string) => !hidden.has(src));
const keep = (src: string) => !hidden.has(src);
export const heroImage = keep(images[1]) ? images[1] : visibleImages[0];
export const aboutImage = keep(images[95]) ? images[95] : visibleImages[0];
export const closingImage = keep(images[139]) ? images[139] : visibleImages[0];
const originalFeatured = [images[1], images[24], images[95], images[139], images[180], images[210]];
export const featuredImages = [...new Set([...originalFeatured.filter(keep), ...visibleImages])].slice(0, 6);
// Filter the original gallery selection without changing the remaining photographs.
export const galleryImages = images.filter((_: string, i: number) => i % 7 === 0).slice(0, 30).filter(keep);
export const onSiteImages = [...new Set([heroImage, aboutImage, closingImage, ...featuredImages, ...galleryImages])];

