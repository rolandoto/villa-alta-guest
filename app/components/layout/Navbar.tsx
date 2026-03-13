'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed left-0 w-full z-50 transition-all duration-300',
        scrolled ? 'top-0 shadow-lg bg-black/80 backdrop-blur-sm' : 'absolute top-0 bg-transparent'
      )}
    >
      {/* Mobile */}
      <div className="flex items-center justify-between px-8 py-6 md:hidden">
        <Link href="/" className="text-white text-lg tracking-widest font-light">
          VILLA·ALTA
        </Link>
        <button className="text-white text-base tracking-widest">MENU</button>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between max-w-[1800px] mx-auto px-16 py-8">
        {/* Left — Menu */}
        <button className="flex items-center gap-2 text-white text-base tracking-widest hover:opacity-70 transition">
          <span className="flex flex-col gap-1">
            <span className="block w-5 h-px bg-white" />
            <span className="block w-5 h-px bg-white" />
          </span>
          MENU
        </button>

        {/* Center — Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-white text-xl tracking-[0.3em] font-light"
        >
          VILLA·ALTA
        </Link>

        {/* Right — Nav links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-white text-base tracking-widest font-semibold hover:opacity-70 transition">
            HOME
          </Link>
          <Link href="/book" className="text-white/70 text-base tracking-widest hover:opacity-100 transition">
            BOOK NOW
          </Link>
          <span className="text-white/70 text-base tracking-widest">EN ∨</span>
        </div>
      </div>

      {/* Bottom border line */}
      <div className="hidden md:block absolute bottom-0 left-0 w-5/12 h-px bg-white/20" />
    </nav>
  );
}