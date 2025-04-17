'use client'
import React from 'react';


const Navbar = () => {
  return (
    <nav className="w-full p-4 flex items-center justify-between translate-y-[-330%] translate-x-[-90%] ">
      <a 
        href="/" 
        className="text-white text-3xl font-normal font-['Iowan_Old_Style']"
      >
        mylestography
      </a>
      <div className="translate-x-[400%] p-10 flex gap-10 items-center">
        <a 
          href="/gallery" 
          className="text-white text-2xl font-normal font-['Iowan_Old_Style']"
        >
          gallery
        </a>
        <a 
          href="/menu" 
          className="text-white text-2xl font-normal font-['Iowan_Old_Style']"
        >
          ...
        </a>
      </div>
    </nav>
  );
};

export default Navbar;