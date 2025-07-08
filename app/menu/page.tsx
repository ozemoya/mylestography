'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import images from '../images.js';
import Navbar from '../components/Navbar';
import useIsMobile from '../components/useIsMobile';
import ScrapbookImage from '../components/ScrapbookImage';
import Sunflower from '../components/Sunflower';

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
      <main className="container mx-auto pt-24">
        
        
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
                <ScrapbookImage
                    src={images[(currentImage + 1) % images.length]}
                    alt="Another beautiful moment"
                    width={250}
                    height={300}
                    rotation={15}
                    className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[250px] z-10"
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
  );
}
