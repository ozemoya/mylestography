'use client'
import React from 'react';

const Navbar = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <nav className="w-full p-4 flex items-center justify-between fixed top-0 left-0 z-50 bg-transparent">
      <a 
        href="/" 
        className={`font-['MagazineLetter'] ${isMobile ? 'text-3xl' : 'text-4xl'} text-[#8B4513] hover:text-[#D57149] transition-colors`}
      >
        mylestography
      </a>
      <div className="flex gap-8 items-center">
        <a 
          href="/gallery" 
          className="font-['MagazineLetter'] text-xl text-[#6d4c41] hover:text-[#8B4513] transition-colors"
        >
          Gallery
        </a>
        <a 
          href="/menu" 
          className="font-['MagazineLetter'] text-xl text-[#6d4c41] hover:text-[#8B4513] transition-colors"
        >
          ...
        </a>
      </div>
    </nav>
  );
};

export default Navbar;