'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import images from '../images.js';
import poloroid from '../../public/poloroid.png';
import Navbar from '../components/Navbar';

export default function MenuPage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const[useMobile, setUseMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setUseMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = useMobile;

  // Menu links

  const menuLinks = [
    { href: 'https://ozemoya.github.io/', label: 'Personal Website' },
    { href: 'https://www.instagram.com/mylestography/?next=%2F', label: 'Instagram' },
    { href: '/about', label: 'About' },
  ];

  return (
    <div className="bg-[#EFD5AD] min-h-screen p-4 sm:p-8 font-['Iowan_Old_Style']">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10 sm:mb-16">
         
        </header>

        <main className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Left side: Menu Links */}
          <nav className="flex flex-col gap-5 sm:gap-6 items-center md:items-start">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white text-2xl sm:text-3xl hover:scale-105 transition-transform duration-300"
              >
                {link.label}
              </a>
            ))}
             <div className="mt-6 sm:mt-8">
                <Navbar isMobile={isMobile} />
             </div>
          </nav>

          {/* Right side: Polaroid Stack */}
          { isMobile ? (
          <div className="relative h-80 sm:h-96 w-full mt-5 ml-6 flex items-center justify-center">
            {/* Background polaroid */}
            <div className="absolute w-36 sm:w-64 h-44 sm:h-80 transform -rotate-6 transition-transform duration-500 hover:rotate-[-8deg] hover:scale-105">
                <Image
                    src={images[(currentImage + 1) % images.length]}
                    alt="Background Polaroid"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm translate-x-[20%] translate-y-[80%]"
                />
                <Image
                    src={poloroid}
                    alt="Polaroid Frame"
                    layout="fill"
                    className='scale-x-200 scale-y-150 translate-x-[20%] translate-y-[90%]'
                />
            </div>
            {/* Foreground polaroid */}
            <div className="absolute w-56 sm:w-64 h-72 sm:h-80 transform rotate-6 transition-transform duration-500 hover:rotate-[8deg] hover:scale-105 z-10 ">
                 <Image
                    src={images[currentImage]}
                    alt="Foreground Polaroid"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm translate-x-[-40%] translate-y-[-30%]"
                />
                <Image
                    src={poloroid}
                    alt="Polaroid Frame"
                    layout="fill"
                    className='scale-x-200 scale-y-150 translate-x-[-40%] translate-y-[-20%]'

                />
            </div>
          </div>
          ):(
          <div className="relative h-80 sm:h-96 w-full flex items-center justify-center">
            {/* Background polaroid */}
            <div className="absolute w-56 sm:w-64 h-72 sm:h-80 transform -rotate-6 transition-transform duration-500 hover:rotate-[-8deg] hover:scale-105">
                <Image
                    src={images[(currentImage + 1) % images.length]}
                    alt="Background Polaroid"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm translate-x-[-50%] translate-y-[70%]"
                />
                <Image
                    src={poloroid}
                    alt="Polaroid Frame"
                    layout="fill"
                    className="translate-x-[-50%] translate-y-[80%] scale-x-200 scale-y-150"
                />
            </div>
            {/* Foreground polaroid */}
            <div className="absolute w-56 sm:w-64 h-72 sm:h-80 transform rotate-6 transition-transform duration-500 hover:rotate-[8deg] hover:scale-105 z-10 ">
                 <Image
                    src={images[currentImage]}
                    alt="Foreground Polaroid"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm translate-x-[-100%] translate-y-[-20%]"
                />
                <Image
                    src={poloroid}
                    alt="Polaroid Frame"
                    layout="fill"
                    className="translate-x-[-100%] translate-y-[-10%] scale-x-200 scale-y-150"
                />
            </div>
          </div>
          )}
        </main>
      </div>
    </div>
  );
}
