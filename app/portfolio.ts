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
// Select one strong frame per subject or scene from the supplied photo folder.
const gallerySelection = [
  "/images/new-work/motion-fashion-portrait.webp",
  folderPhoto("DSC00787"),
  "/images/DSC00617.JPG",
  folderPhoto("DSCF2006"),
  folderPhoto("DSCF0488"),
  folderPhoto("DSC09114"),
  folderPhoto("DSCF2265"),
  folderPhoto("DSC01498"),
  folderPhoto("DSCF1041"),
  "/images/new-work/orange-wig-portrait.webp",
  folderPhoto("DSCF1142"),
  folderPhoto("DSCF0746"),
  folderPhoto("DSC06069"),
  "/images/new-work/golden-costume-portrait.webp",
  folderPhoto("DSCF1391"),
  folderPhoto("DSCF0535"),
  folderPhoto("DSCF1422"),
  folderPhoto("DSCF3229"),
];
export const galleryImages = [...new Set(gallerySelection)].filter(keep);
export const onSiteImages = [...new Set([heroImage, aboutImage, closingImage, ...featuredImages, ...galleryImages])];
