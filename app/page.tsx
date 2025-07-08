// Hook to detect mobile screen
'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import images from './images.js';
import useIsMobile from './components/useIsMobile';
import ScrapbookImage from './components/ScrapbookImage';
import Sunflower from './components/Sunflower';
import type { StaticImageData } from "next/image";

const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Lora:ital,wght@0,400..700&display=swap');

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.8); }
    80% { opacity: 1; transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

// --- Reusable Components for Scrapbook Theme ---

const Section = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <section className={`w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-4xl mx-auto">{children}</div>
  </section>
);

// --- Main Homepage Component ---

export default function Home(){
  const isMobile = useIsMobile();

  return (
    <>
      <style>{keyframes}</style>
      <div 
        className="min-h-screen w-full font-['Lora',_serif] text-[#5D4037]"
        style={{ backgroundColor: '#FDF8F0', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\"6\" height=\"6\" viewBox=\"0 0 6 6\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M5 0h1L0 6V5zM6 5v1H5z\"/%3E%3C/g%3E%3C/svg%3E")' }}
      >
        <Navbar isMobile={isMobile} />

        {/* --- Hero Section --- */}
        <main className="pt-24 pb-12 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center mb-12">
            <ScrapbookImage 
              src={images[1]} 
              alt="Scrapbook main image" 
              rotation={-8} 
              width={450} 
              height={560} 
              className="z-10 absolute left-0 top-0 w-[350px] md:w-[450px]" 
            />
            <ScrapbookImage 
              src={images[2]} 
              alt="Scrapbook secondary image" 
              rotation={12} 
              width={300} 
              height={375} 
              className="absolute right-0 bottom-0 w-[250px] md:w-[300px]" 
            />
            <Sunflower className="absolute top-12 right-200 z-20 transform scale-110" />
            <Sunflower className="absolute bottom-15 left-0 z-20" />
          </div>
          
          <h1 className="font-['Kalam',_cursive] text-5xl md:text-7xl text-[#D57149] mb-4" style={{ animation: 'popIn 1s ease-out' }}>
            Mylestography
          </h1>
          <p className="text-lg md:text-xl max-w-md mx-auto" style={{ animation: 'fadeIn 1s ease-out 0.5s backwards' }}>
            Crafting beautiful, authentic stories through the art of photography.
          </p>
        </main>

        {/* --- About Section --- */}
        <Section className="bg-white/50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-96 flex items-center justify-center">
                <Sunflower className="w-64 h-64" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-['Kalam',_cursive] text-4xl text-[#D57149] mb-4">My Philosophy</h2>
              <p className="mb-4">
                Welcome! I'm Myles, the heart behind the lens. For me, photography is about more than just pictures; it's about connection, emotion, and preserving the moments that matter most.
              </p>
              <p>
                My style is warm, natural, and filled with light. I want you to feel comfortable, have fun, and walk away with images that are a true reflection of you.
              </p>
            </div>
          </div>
        </Section>

        {/* --- Portfolio Preview --- */}
        <Section>
            <h2 className="font-['Kalam',_cursive] text-4xl md:text-5xl text-center text-[#D57149] mb-12">From the Portfolio</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                <div className="md:mt-12"><ScrapbookImage src={images[4]} alt="Portfolio image 1" rotation={-4} width={250} height={310} className="w-full h-auto" /></div>
                <div><ScrapbookImage src={images[5]} alt="Portfolio image 2" rotation={3} width={250} height={310} className="w-full h-auto" /></div>
                <div className="md:mt-12"><ScrapbookImage src={images[6]} alt="Portfolio image 3" rotation={-2} width={250} height={310} className="w-full h-auto" /></div>
                <div><ScrapbookImage src={images[7]} alt="Portfolio image 4" rotation={5} width={250} height={310} className="w-full h-auto" /></div>
            </div>
            <div className="text-center mt-12">
                <a href="/gallery" className="text-[#D57149] font-bold text-xl hover:underline">Explore the Full Gallery &rarr;</a>
            </div>
        </Section>

        {/* --- Booking CTA --- */}
        <Section className="bg-white/50 text-center">
            <Sunflower className="mx-auto mb-4" />
            <h2 className="font-['Kalam',_cursive] text-4xl md:text-5xl text-[#D57149] mb-4">Ready to Create Magic?</h2>
            <p className="max-w-xl mx-auto mb-8">
                I'm so excited to hear about your vision. Let's work together to create something beautiful that you'll treasure for years to come.
            </p>
            <a
              href="/book"
              className="inline-block px-12 py-4 text-lg font-bold text-white bg-[#D57149] rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Book a Session
            </a>
        </Section>

        {/* --- Footer --- */}
        <footer className="bg-[#5D4037] text-white/80 py-8 px-4 text-center font-sans">
            <p>&copy; {new Date().getFullYear()} Mylestography. All Rights Reserved.</p>
            <p className="text-sm opacity-70">Designed with love & a sprinkle of code</p>
        </footer>
      </div>
    </>
  );
}