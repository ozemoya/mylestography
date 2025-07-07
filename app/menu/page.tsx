'use client';
import poloroid from "../../public/poloroid.png";
import Navbar from "../components/Navbar";
import { getImages } from "../lib/getImages"; // Adjust the path as needed
import Image from "next/image";
import images from '../images.js';
import { useEffect, useState } from "react";




/**
 * The homepage of the site, containing the main heading and a call to action to book a session.
 * The images inside of the poloroid photos should 'rotate' to new images periodically maybe about a 1 minute or so.
 */
export default function menu() {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [currentImage]);
  // The images inside of the poloroid photos should 'rotate' to new images periodically maybe about a 1 minute or so

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
            alt="Poloroid"
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
            alt="Poloroid"
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
            alt="Poloroid"
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