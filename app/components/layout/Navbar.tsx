'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
   useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)};
      window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
  <nav className={clsx( "left-0 w-full z-40 fixed   ", scrolled ? " top-0 z-50  translate-y-0 shadow-lg": "absolute top-0 z-0  translate-y-0")} >
        <div className="flex lg:px-6   px-6 py-4 md:hidden  max-w-4xl items-center">
            <div className="flex   w-full md:w-1/3">
            <Link
                href="/"
                
                className="mr-2 , md:hidden flex w-full items-start justify-start  md:w-auto lg:mr-6">
                <span className="'h-24 w-34'"></span> 
              </Link>
            </div>
            <div className="block flex-none md:hidden">
             
            </div>
          </div>
        <div className="hidden  md:flex  max-w-[1800px] mx-auto px-12 py-6  items-center justify-between">
            <div className="flex items-center gap-10">
                       
        </div>
            <button className={clsx( scrolled  ?  "bg-[#f0c98d]" :"bg-white",' z-10 cursor-pointer border-black px-8 py-4 flex items-center gap-3 text-sm tracking-widest  hover:text-black transition')}>
              Reservas ahora
              <span className="text-lg">↗</span>
            </button>
        </div>
          <div className=" hidden absolute md:grid  bottom-0 left-0 w-full  grid-cols-[5fr_8.0fr] ">
            <div className={clsx('h-px','bg-gray-300')} /><div />
          </div>
        </nav>
  );
}
