import images from "./images.js";
import hiddenPhotos from "./hidden-photos.json";
import { newPhotos } from "./new-photos";
import { folderPhotos } from "./folder-photos";

const hidden = new Set(hiddenPhotos);
const forefrontPhotos = ["/images/featured/sunhat-portrait.webp", "/images/featured/sunflower-parasol.webp"];
const additions = newPhotos.map((photo) => photo.src);
export const visibleImages: string[] = [...new Set([...forefrontPhotos, ...folderPhotos, ...additions, ...images])].filter((src: string) => !hidden.has(src));
const keep = (src: string) => !hidden.has(src);
export const heroImage = forefrontPhotos.find(keep) ?? visibleImages[0];
export const aboutImage = keep(images[95]) ? images[95] : visibleImages[0];
const folderPhoto = (name: string) => `/images/folder-collection/${name}.webp`;
export const closingImage = keep(folderPhoto("DSCF2010")) ? folderPhoto("DSCF2010") : visibleImages[0];
const originalFeatured = [images[1], images[24], images[95], images[139], images[180], images[210]];
const folderFeatured = ["DSC09450", "DSCF2006", "DSC01498", "DSCF2265", "DSCF0746", "DSCF1142"].map(folderPhoto);
export const featuredImages = [...new Set([forefrontPhotos[1], ...folderFeatured, ...additions, ...originalFeatured, ...visibleImages].filter(keep))].slice(0, 6);
// Filter the original gallery selection without changing the remaining photographs.
export const galleryImages = [...new Set([...forefrontPhotos, ...folderPhotos, ...additions, ...images.filter((_: string, i: number) => i % 7 === 0).slice(0, 30)])].filter(keep);
export const onSiteImages = [...new Set([heroImage, aboutImage, closingImage, ...featuredImages, ...galleryImages])];
