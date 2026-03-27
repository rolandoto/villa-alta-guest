'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed left-0 w-full z-50 transition-all duration-500',
        scrolled
          ? 'top-0 bg-black/70 backdrop-blur-md shadow-lg'
          : 'top-0 bg-black/30 backdrop-blur-sm'
      )}
    >
      {/* CONTAINER FULL WIDTH */}
      <div className="w-full px-6 md:px-10 lg:px-16">

        {/* ================= MOBILE ================= */}
        <div className="flex md:hidden items-center justify-between py-6">
          
          {/* LOGO */}
          <Link
            href="/"
            className="text-white text-lg tracking-[0.15em] font-light"
          >
            VILLA·ALTA
          </Link>

          {/* MENU BUTTON */}
          <button className="flex items-center gap-2 text-white text-base tracking-[0.1em]">
            <span className="flex flex-col gap-[3px]">
              <span className="w-5 h-px bg-white" />
              <span className="w-4 h-px bg-white" />
            </span>
            MENU
          </button>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center justify-between py-8 relative">

          {/* LEFT - MENU */}
          <button className="flex items-center gap-3 text-white text-base tracking-[0.1em] hover:text-white/70 transition">
            <span className="flex flex-col gap-[3px]">
              <span className="w-5 h-px bg-white" />
              <span className="w-4 h-px bg-white" />
            </span>
            MENU
          </button>

          {/* CENTER - LOGO */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-white text-xl lg:text-2xl tracking-[0.2em] font-light hover:opacity-80 transition"
          >
            VILLA·ALTA
          </Link>

          {/* RIGHT - NAV LINKS */}
          <div className="flex items-center gap-10 lg:gap-14">
            
            <NavLink href="/" label="HOME" active />

            <NavLink href="/book" label="BOOK NOW" />

            <button className="text-white/70 text-base tracking-[0.1em] hover:text-white transition">
              EN ∨
            </button>

          </div>
        </div>
      </div>

      {/* LINE DECORATION */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </nav>
  );
}

/* ================= COMPONENTE REUTILIZABLE ================= */
function NavLink({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'text-base tracking-[0.1em] transition relative',
        active
          ? 'text-white font-medium'
          : 'text-white/70 hover:text-white'
      )}
    >
      {label}

      {/* LINE HOVER PREMIUM */}
      <span className="absolute left-0 -bottom-1 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}