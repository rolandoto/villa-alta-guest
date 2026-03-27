'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/app/data/hotel';

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
        'fixed left-0 top-0 w-full z-50 transition-all duration-500',
        scrolled ? 'bg-black/70 backdrop-blur-md shadow-lg' : 'bg-black/30 backdrop-blur-sm'
      )}
    >
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between py-6 md:py-8 relative">
          <Link href="/" className="text-white text-lg md:text-xl tracking-[0.2em] font-light">
            VILLA·ALTA
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label.toUpperCase()} />
            ))}
          </div>

          <Link
            href="/contacto"
            className="text-white border border-white/40 px-4 py-2 text-xs md:text-sm tracking-[0.2em] hover:bg-white hover:text-black transition"
          >
            RESERVAR
          </Link>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm tracking-[0.1em] text-white/80 hover:text-white transition">
      {label}
    </Link>
  );
}
