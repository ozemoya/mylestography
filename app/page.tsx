'use client';
import { useState, useEffect } from "react";
import { getImages } from "../lib/getImages"; // Adjust the path as needed
import Image from "next/image";
import Navbar from "./components/Navbar";
import poloroid from "../public/poloroid.png"; // Adjust the path as needed
import images from './images.js';

export default function Home(){
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [currentImage]);
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The homepage of the site, containing the main heading and a call to action to book a session.
 * The images inside of the poloroid photos should 'rotate' to new images periodically maybe about a 1 minute or so.
 */
  return (
    //The images inside of the poloroid photos hould 'rotate' to new images periodically maybe about a 1 minute or so
    <div className="bg-[#EFD5AD] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div id ="title" className="w-[635px] y-2 text-center justify-start translate-y-70">
      {/* #the images inside of the poloroid photos should 'rotate' to new images periodically maybe about a 1 minute or so */}
      {/* first pol */}
      <Image
      src = {images[currentImage]}
      alt="Rotating Polaroid"
      className="object-cover z-0 absolute translate-y-[-110%] translate-x-[50%] rotate-2 aspect-[4/5]" 
      width={290}
      height={250}
      />
      <Image
      id = "poloroid1"
      // src="/images/IMG_0142.JPG"
        src={poloroid}
        alt="Poloroid"
        className="absolute z-0 translate-y-[-100%] rotate-2"
     
     />
     {/* second pol */}
     <Image 
     src = {images[currentImage + 1 ]}
      alt="Rotating Polaroid"
      className="object-cover z-0 absolute translate-y-[-225%] translate-x-[-175%] rotate-12 aspect-[4/5]"
      width={140}
      height={140}
      />

      <Image
        id = "poloroid2"
        src={poloroid}
        alt="Polaroid"
        className="object-cover absolute z-0 translate-y-[-120%] translate-x-[-80%] rotate-12 scale-50 " 
      />
{/* third pol */}
    <Image 
    src = {images[currentImage + 2 ]}
      alt="Rotating Polaroid"
      className="object-cover z-0 absolute translate-y-[-170%] translate-x-[390%] rotate-350 aspect-[4/5]"
      width={170}
      height={170}
      />
      <Image
        id = "poloroid3"
        src={poloroid}
        alt="Polaroid"
        className="absolute z-0 translate-y-[-110%] translate-x-[80%] rotate-350 scale-60"
        //  className="absolute z-0 translate-y-[-110%] translate-x-[80%] rotate-350 scale-60"
      />
      {/* fourth pol */}
      <Image
        src = {images[currentImage + 3 ]}
        alt="Rotating Polaroid"
        className="object-cover z-0 absolute translate-y-[-35%] translate-x-[315%] rotate-12 aspect-[4/5]"
        width={220}
        height={220}
      />
      
      <Image
        id = "poloroid4"
        src={poloroid}
        alt="Poloroid"
        className="absolute z-0 translate-y-[-40%] translate-x-[90%] rotate-12 scale-75"
      />
      {/* fifth pol */}
      <Image
        src = {images[currentImage + 4 ]}
        alt="Rotating Polaroid"
        className="object-cover z-0 absolute translate-y-[-55%] translate-x-[-155%] rotate-350 aspect-[4/5]"
        width={225}
        height={225}
      />
      
      <Image
        id = "poloroid5"
        src={poloroid}
        alt="Polaroid"
        className="absolute z-0 translate-y-[-50%] translate-x-[-90%] rotate-350 scale-80"
      />
      <span className="text-white text-6xl font-normal font-['Iowan_Old_Style']">Bringing </span>
      <span className="text-orange-500 text-6xl font-bold font-['Iowan_Old_Style'] italic">AESTHETIC </span>
      <span className="text-white text-6xl font-normal font-['Iowan_Old_Style']">into Photography</span>
      </div>
      <button className="w-50 h-14 bg-orange-300 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black font-['Iowan_Old_Style'] justify-start transform translate-y-70 translate-x-50 text-2xl">
        book a session
      </button>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
        <Navbar />
        </div>
      </main>                
    </div>
  );
}