"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import images from '../images.js';
import useIsMobile from '../components/useIsMobile';
import ScrapbookImage from '../components/ScrapbookImage';
import type { StaticImageData } from "next/image";

const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
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
        <main className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Random scattered sunflowers - background layer - artistic placement */}
          <Image src="/Sunflower.png" alt="Sunflower" width={150} height={150} className="absolute -top-8 -right-12 z-0 opacity-40 hidden md:block" style={{ animation: 'spin 30s linear infinite' }} />
          <Image src="/Sunflower.png" alt="Sunflower" width={65} height={65} className="absolute top-24 right-1/4 z-0 opacity-30" style={{ animation: 'spin 17s linear infinite reverse' }} />
          <Image src="/Sunflower.png" alt="Sunflower" width={120} height={120} className="absolute top-1/4 -left-10 z-0 opacity-50" style={{ animation: 'spin 28s linear infinite' }} />
          <Image src="/Sunflower.png" alt="Sunflower" width={55} height={55} className="absolute top-1/3 right-16 z-0 opacity-25" style={{ animation: 'spin 15s linear infinite reverse' }} />
          <Image src="/Sunflower.png" alt="Sunflower" width={95} height={95} className="absolute top-1/2 left-8 z-0 opacity-45" style={{ animation: 'spin 23s linear infinite' }} />
          <Image src="/Sunflower.png" alt="Sunflower" width={75} height={75} className="absolute top-2/3 right-24 z-0 opacity-35" style={{ animation: 'spin 19s linear infinite reverse' }} />
          <Image src="/Sunflower.png" alt="Sunflower" width={160} height={160} className="absolute bottom-32 -left-16 z-0 opacity-55 hidden md:block" style={{ animation: 'spin 34s linear infinite reverse' }} />
          <Image src="/Sunflower.png" alt="Sunflower" width={85} height={85} className="absolute bottom-48 right-12 z-0 opacity-40" style={{ animation: 'spin 21s linear infinite' }} />
          <Image src="/Sunflower.png" alt="Sunflower" width={50} height={50} className="absolute bottom-20 left-1/4 z-0 opacity-30" style={{ animation: 'spin 16s linear infinite reverse' }} />
          <Image src="/Sunflower.png" alt="Sunflower" width={110} height={110} className="absolute bottom-12 right-1/3 z-0 opacity-45 hidden md:block" style={{ animation: 'spin 26s linear infinite' }} />

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
