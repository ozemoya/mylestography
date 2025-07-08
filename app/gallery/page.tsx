"use client";
import Navbar from "../components/Navbar";
import images from '../images.js';
import useIsMobile from '../components/useIsMobile';
import ScrapbookImage from '../components/ScrapbookImage';
import type { StaticImageData } from "next/image";

const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
`;

export default function GalleryPage() {
  const isMobile = useIsMobile();

  const getRandomRotation = () => Math.floor(Math.random() * 16) - 8; // -8 to 8 degrees

  return (
    <>
      <style>{keyframes}</style>
      <div 
        className="min-h-screen w-full font-['Lora',_serif] text-[#5D4037]"
        style={{ backgroundColor: '#FDF8F0', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"6\" height=\"6\" viewBox=\"0 0 6 6\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M5 0h1L0 6V5zM6 5v1H5z\"/%3E%3C/g%3E%3C/svg%3E")' }}
      >
        <Navbar isMobile={isMobile} />
        <main className="py-24 px-4 sm:px-6 lg:px-8">
          <h1 className="font-['Kalam',_cursive] text-5xl md:text-7xl text-center text-[#D57149] mb-16">
            Gallery
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center">
            {images.map((img: string | StaticImageData, i: number) => (
              <div key={i} className="flex justify-center items-center even:mt-12 odd:mb-12">
                <ScrapbookImage 
                  src={img} 
                  alt={`Gallery photo ${i + 1}`} 
                  rotation={getRandomRotation()} 
                  width={250} 
                  height={300}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </main>
        <footer className="bg-[#5D4037] text-white/80 py-8 px-4 text-center font-sans mt-16">
            <p>&copy; {new Date().getFullYear()} Mylestography. All Rights Reserved.</p>
            <p className="text-sm opacity-70">Designed with love & a sprinkle of code</p>
        </footer>
      </div>
    </>
  );
}
