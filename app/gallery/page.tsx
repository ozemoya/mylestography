import Image from "next/image";
import Navbar from "../components/Navbar";
import { galleryImages as selected } from "../portfolio";
export default function GalleryPage(){return <div><div className="inner-header"><Navbar/></div><main className="page-main"><p className="eyebrow">Portfolio / Selected work</p><h1 className="page-title">The work.</h1><p className="page-deck">Portraits, fashion, celebrations, and the quiet moments in between—photographed with an editorial eye and an honest heart.</p><div className="gallery-grid">{selected.map((src:string,i:number)=><figure className="gallery-card" key={src}><Image src={src} alt={`Mylestography portfolio photograph ${i+1}`} width={900} height={1200} sizes="(max-width: 700px) 100vw, 33vw"/></figure>)}</div></main></div>}
