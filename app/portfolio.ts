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
// Keep one strong frame from each featured subject or repeated scene.
const gallerySelection = [
  ...forefrontPhotos,
  "/images/slide2altaltalt.png",
  folderPhoto("DSC00835"),
  folderPhoto("DSC00787"),
  folderPhoto("DSCF2006"),
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
  "/images/DSC00767.JPG",
  "/images/glide5.png",
  "/images/DSC00775.JPG",
  "/images/_DSC0101 2.JPG",
  "/images/_DSC1133 2.JPG",
  "/images/new-work/orange-wig-portrait.webp",
  "/images/DSC00617.JPG",
  "/images/new-work/motion-fashion-portrait.webp",
  "/images/new-work/golden-costume-portrait.webp",
];
export const galleryImages = [...new Set(gallerySelection)].filter(keep);
export const onSiteImages = [...new Set([heroImage, aboutImage, closingImage, ...featuredImages, ...galleryImages])];
