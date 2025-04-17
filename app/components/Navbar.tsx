'use client'
import React from 'react';

const Navbar = () => {
  return (
    <div>
       <nav className="translate-y-[-200%] items-center flex flex-col sm:flex-row gap-4">
         <a href="/" className="justify-self-start text-white text-3xl pb-30 font-normal font-['Iowan_Old_Style']">mylestography</a>
        <div className=" flex gap-4 items-center flex-col sm:flex-row">
          <a href="/gallery" className="text-white text-2xl font-normal font-['Iowan_Old_Style']">gallery</a>
          <a href="/menu" className="text-white text-2xl font-normal font-['Iowan_Old_Style']">...</a>
        
        </div>
      </nav>
    </div>
  );
};

export default Navbar;