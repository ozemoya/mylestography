'use client';
import poloroid from "../../public/poloroid.png";
import Navbar from "../components/Navbar";
import Image from "next/image";
import images from '../images.js';
import { useEffect, useState, Fragment } from "react";


// Custom hook to detect mobile viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}


/**
 * The homepage of the site, containing the main heading and a call to action to book a session.
 * The images inside of the poloroid photos should 'rotate' to new images periodically maybe about a 1 minute or so.
 */
export default function menu() {
  const [currentImage, setCurrentImage] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [currentImage]);
  
  // Mobile menu items
  const menuItems = [
    { href: 'https://ozemoya.github.io/', label: 'Personal Website' },
    { href: 'https://www.instagram.com/mylestography/?next=%2F', label: 'Instagram' },
    { href: '/about', label: 'About' },
    { href: '/', label: 'Home' },
    { href: '/book', label: 'Book' },
  ];

  // Mobile UI: completely different aesthetic
  if (isMobile) {
    return (
      <div className="bg-[#EFD5AD] min-h-screen p-4 flex flex-col items-center">
        <main className="flex flex-col items-center justify-start w-full max-w-md mx-auto">
          {/* Polaroid Stack - Mobile Friendly */}
          <div className="relative w-full h-[360px] mt-8 mb-10">
            {/* First polaroid */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 rotate-[-5deg] w-52 h-64 z-10">
              <Image
                src={images[currentImage]}
                alt="Rotating Polaroid 1"
                width={208}
                height={260}
                className="object-cover w-52 h-64 aspect-[4/5]"
              />
              <Image 
                src={poloroid}
                alt="Polaroid Frame"
                width={208}
                height={260}
                className="absolute top-0 left-0 w-52 h-64"
              />
            </div>
            
            {/* Second polaroid */}
            <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-[20px] rotate-[5deg] w-52 h-64 z-20">
              <Image
                src={images[(currentImage + 1) % images.length]}
                alt="Rotating Polaroid 2"
                width={208}
                height={260}
                className="object-cover w-52 h-64 aspect-[4/5]"
              />
              <Image
                src={poloroid}
                alt="Polaroid Frame"
                width={280}
                height={260}
                className="absolute top-0 left-0 w-52 h-64"
              />
            </div>
          </div>
          
          {/* Menu options - Styled like desktop */}
          <div className="flex flex-col gap-5 items-center w-full px-4 mt-4">
            <a 
              href="https://ozemoya.github.io/"
              className="text-white text-2xl font-normal font-['Iowan_Old_Style'] transition-transform hover:scale-105"
            >
              personal website
            </a>
            <a 
              href="https://www.instagram.com/mylestography/?next=%2F"
              className="text-white text-2xl font-normal font-['Iowan_Old_Style'] transition-transform hover:scale-105"
            >
              instagram
            </a>
            <a 
              href="/about"
              className="text-white text-2xl font-normal font-['Iowan_Old_Style'] transition-transform hover:scale-105"
            >
              about
            </a>
            <a 
              href="/"
              className="text-white text-2xl font-normal font-['Iowan_Old_Style'] transition-transform hover:scale-105"
            >
              back
            </a>
          </div>
          
          {/* Navbar component for consistency */}
          <div className="mt-8 w-full flex justify-center">
            <Navbar />
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="bg-[#EFD5AD] grid grid-rows-[20px_1fr_20px]  items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div id="title" className="w-[635px] text-center justify-start">
          <div id="menu options" className="flex flex-col gap-10 items-center p-10 translate-x-[-80%]">
            <a 
              href="https://ozemoya.github.io/"
              className="text-white text-4xl font-normal font-['Iowan_Old_Style']">
                personal website
            </a>
            <a 
              href="https://www.instagram.com/mylestography/?next=%2F"
              className="text-white text-4xl font-normal font-['Iowan_Old_Style']">
                instagram
            </a>
            <a 
              href="/about"
              className="flex flex-row text-white text-4xl font-normal font-['Iowan_Old_Style']">
                about
            </a>
            <a 
            href= "/"
            className="text-white text-4xl font-normal font-['Iowan_Old_Style']">
                back
            </a>
          </div>
          {/* first pol */}
          <Image
            src={images[currentImage]}
            alt="Rotating Polaroid"
            className="object-cover z-0 absolute translate-y-[-75%] translate-x-[150%] rotate-2 aspect-[4/5]"
            width={290}
            height={250}  
          />    
          <Image
            id="poloroid1"
            src={poloroid}
            alt="Polaroid"
            className="absolute z-0 translate-y-[-70%] translate-x-[50%] rotate-2"
          />
          {/* second pol */}
          <Image
            src={images[(currentImage + 1) % images.length]}
            alt="Rotating Polaroid"
            className="object-cover z-0 absolute translate-y-[-75%] translate-x-[210%] rotate-12 aspect-[4/5]"
            width={290}
            height={290}
          />
          <Image
            id="poloroid2"
            src={poloroid}
            alt="Polaroid"
            className="absolute z-0 translate-y-[-70%] translate-x-[80%] rotate-12 " 
          />
          <Image
            src={images[(currentImage + 2) % images.length]}
            alt="Rotating Polaroid"
            className="object-cover z-0 absolute translate-y-[-75%] translate-x-[70%] rotate-350 aspect-[4/5]"
            width={290}
            height={290}
          />
          <Image
            id="poloroid3"
            src={poloroid}
            alt="Polaroid"
            className="absolute z-0 translate-y-[-70%] translate-x-[10%] rotate-350 "
          />
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Navbar />
        </div>
      </main>
    </div>
  );
}