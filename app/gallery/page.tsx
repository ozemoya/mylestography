"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import poloroid from "../../public/poloroid.png";
import images from '../images.js';



export default function GalleryPage() {


  return (
    <div className="bg-[#EFD5AD] min-h-screen flex flex-col items-center p-8 ">
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-6xl">
        {images.map((img: string, i: number) => (
          <div key={img} className="relative flex flex-col items-center">
            <div className="relative w-48 h-60">
              <Image
                src={img}
                alt={`Gallery photo ${i+1}`}
                fill
                className="object-cover rounded-lg z-10 aspect-[4/5]"
                style={{ zIndex: 2 }}
              />
              <Image
                src={poloroid}
                alt="Polaroid frame"
                fill
                className="object-contain z-20 pointer-events-none scale-200"
                style={{ zIndex: 3 }}
               
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
