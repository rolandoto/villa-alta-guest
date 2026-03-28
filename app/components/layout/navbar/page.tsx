'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import MobileMenu from './mobile-menu';
import LogoSquare from '../../logo-square';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
   useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)};
      window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>

    <style>
        {`
         @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        
                .rs-titlee {
        font-weight: 900;
        font-size: clamp(18, 5vw, 72px);
        line-height: .88;
        text-transform: uppercase;
        color: var(--cream);
        margin-bottom: 8px;
                }



        `}
           
 
    </style>
    
     <nav className={clsx("left-0 w-full  fixed top-0 z-50 bg-[#e8e2d9] translate-y-0 shadow-lg   ", scrolled ? "": "absolute top-0 z-0  translate-y-0")} >
        <div className="flex lg:px-6   px-6 py-4 md:hidden  max-w-4xl items-center">
            <div className="flex   w-full md:w-1/3">
            <Link
                href="/"
                className="mr-2  md:hidden flex w-full items-start justify-start  md:w-auto lg:mr-6">
                <LogoSquare />
              </Link>
            </div>
            <div className="block flex-none md:hidden">
              <Suspense fallback={null}>
                <MobileMenu  />
              </Suspense>
            </div>
          </div>
        <div className="hidden  md:flex  max-w-[1800px] mx-auto px-12 py-6  items-center justify-between">
            <div className="flex items-center gap-10">
            <Link
                href="/"
                className="mr-2  flex w-full items-center justify-center  md:w-auto lg:mr-6">
                  <LogoSquare />
            </Link>
             <Suspense fallback={null}>
                <MobileMenu  />
              </Suspense>
        </div>
         <Link 
            href="https://villa-alta.vercel.app/" /* <-- Cambia esto por tu URL (interna o externa) */
            target="_blank" 
            rel="noopener noreferrer"
            className="rs-btn-reservee z-10 cursor-pointer px-8 py-4 flex w-fit items-center gap-3 text-sm transition"
            >
            Reservar ahora
            <span className="text-lg">↗</span>
            </Link>
        </div>
          <div className=" hidden absolute md:grid  bottom-0 left-0 w-full  grid-cols-[5fr_8.0fr] ">
            <div className={clsx('h-px','bg-gray-300')} /><div />
          </div>
        </nav>
    </>
 
  );
}
