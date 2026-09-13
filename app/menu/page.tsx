'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { visibleImages as images } from '../portfolio';
import Navbar from '../components/Navbar';
import useIsMobile from '../components/useIsMobile';
import ScrapbookImage from '../components/ScrapbookImage';
import Sunflower from '../components/Sunflower';

const keyframes = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const menuLinks = [
    { href: 'https://ozemoya.github.io/', label: 'Personal Website' },
    { href: 'https://www.instagram.com/mylestography/?next=%2F', label: 'Instagram' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
];

export default function MenuPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <style>{keyframes}</style>
    <div
      className="min-h-screen text-[#4a3b34] p-4 sm:p-6 md:p-8"
      style={{
        backgroundColor: '#FDF8F0',
        backgroundImage: 'url("/paper-texture.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar isMobile={isMobile} />
      <main className="container mx-auto pt-24 relative overflow-hidden">
        {/* Scattered sunflowers - background layer - artistic placement */}
        <Image src="/Sunflower.png" alt="Sunflower" width={135} height={135} className="absolute -top-10 -left-10 z-0 opacity-40 hidden lg:block" style={{ animation: 'spin 28s linear infinite' }} />
        <Image src="/Sunflower.png" alt="Sunflower" width={70} height={70} className="absolute top-24 left-1/4 z-0 opacity-30" style={{ animation: 'spin 18s linear infinite reverse' }} />
        <Image src="/Sunflower.png" alt="Sunflower" width={105} height={105} className="absolute top-12 -right-8 z-0 opacity-45 hidden lg:block" style={{ animation: 'spin 24s linear infinite' }} />
        <Image src="/Sunflower.png" alt="Sunflower" width={55} height={55} className="absolute top-1/3 right-12 z-0 opacity-25" style={{ animation: 'spin 16s linear infinite reverse' }} />
        <Image src="/Sunflower.png" alt="Sunflower" width={85} height={85} className="absolute top-1/2 left-6 z-0 opacity-35" style={{ animation: 'spin 21s linear infinite' }} />
        <Image src="/Sunflower.png" alt="Sunflower" width={95} height={95} className="absolute top-2/3 right-16 z-0 opacity-30" style={{ animation: 'spin 23s linear infinite reverse' }} />
        <Image src="/Sunflower.png" alt="Sunflower" width={150} height={150} className="absolute -bottom-12 -left-14 z-0 opacity-50 hidden lg:block" style={{ animation: 'spin 32s linear infinite reverse' }} />
        <Image src="/Sunflower.png" alt="Sunflower" width={75} height={75} className="absolute bottom-24 right-1/4 z-0 opacity-35" style={{ animation: 'spin 19s linear infinite' }} />
        <Image src="/Sunflower.png" alt="Sunflower" width={60} height={60} className="absolute bottom-16 left-1/3 z-0 opacity-25" style={{ animation: 'spin 17s linear infinite reverse' }} />
        <Image src="/Sunflower.png" alt="Sunflower" width={110} height={110} className="absolute bottom-8 -right-6 z-0 opacity-40 hidden lg:block" style={{ animation: 'spin 26s linear infinite' }} />

        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left side: Menu Links */}
          <nav className="flex flex-col gap-6 items-center md:items-start text-center md:text-left relative z-10 order-2 md:order-1">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-lora text-3xl md:text-4xl text-[#6d4c41] hover:text-[#8B4513] transition-transform duration-300 ease-in-out hover:scale-105"
                style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/book"
              className="mt-6 px-10 py-4 font-kalam text-2xl font-bold text-white bg-[#c5a687] rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-[#b59677] hover:scale-105"
            >
              Book a Session
            </a>
          </nav>

          {/* Right side: Image Collage */}
          <div className="relative h-[450px] sm:h-[500px] w-full flex items-center justify-center order-1 md:order-2">
            {/* Desktop: Single Image */}
            <div className="hidden md:block">
                <Sunflower className="absolute -top-16 -right-16 w-48 h-48 opacity-80" style={{ transform: 'rotate(20deg)' }} />
                <ScrapbookImage
                    src={images[currentImage]}
                    alt="A beautiful moment captured by Mylestography"
                    width={400}
                    height={400}
                    rotation={5}
                    className="w-[400px] h-[400px]"
                />
                <Sunflower className="absolute -bottom-12 -left-12 w-36 h-36 opacity-70" style={{ transform: 'rotate(-30deg)' }} />
            </div>

            {/* Mobile: Two Images */}
            <div className="md:hidden relative w-full h-full">
                <Sunflower className="absolute -top-8 right-0 w-24 h-24 opacity-80" style={{ transform: 'rotate(20deg)' }} />
                <ScrapbookImage
                    src={images[currentImage]}
                    alt="A beautiful moment captured by Mylestography"
                    width={250}
                    height={300}
                    rotation={-10}
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[250px]"
                />
               
                <Sunflower className="absolute bottom-0 left-8 w-20 h-20 opacity-70" style={{ transform: 'rotate(-30deg)' }} />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-12 mt-16 font-lora text-[#6d4c41]">
        <p>&copy; 2024 Mylestography. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
}
