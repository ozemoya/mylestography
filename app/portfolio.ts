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
// A varied edit of the portfolio: generally one image per subject or scene, with
// a few second frames where the composition adds something distinct.
const gallerySelection = [
  ...forefrontPhotos,
  "/images/new-work/studio-campaign.jpg",
  folderPhoto("DSC00835"),
  folderPhoto("DSC00787"),
  folderPhoto("DSCF2006"),
  folderPhoto("DSC06561"),
  folderPhoto("DSCF1142"),
  folderPhoto("DSCF0746"),
  folderPhoto("DSCF2265"),
  folderPhoto("DSC06069"),
  folderPhoto("DSCF0488"),
  folderPhoto("DSC09114"),
  folderPhoto("DSCF1041"),
  folderPhoto("DSCF1391"),
  folderPhoto("DSCF3229"),
  folderPhoto("DSC01498"),
  "/images/new-work/studio-headshot.jpg",
  folderPhoto("DSCF0535"),
  folderPhoto("DSCF2010"),
  "/images/DSC00607.JPG",
  folderPhoto("DSCF2416"),
  folderPhoto("DSCF1182"),
  "/images/DSC00800.JPG",
  "/images/new-work/studio-relaxed.jpg",
  folderPhoto("DSCF1045"),
  "/images/DSC01711.JPG",
  "/images/IMG_5102.JPG",
];
export const galleryImages = [...new Set(gallerySelection)].filter(keep);
export const onSiteImages = [...new Set([heroImage, aboutImage, closingImage, ...featuredImages, ...galleryImages])];
