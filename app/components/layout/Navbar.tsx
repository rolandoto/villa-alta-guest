'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/app/data/hotel';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/15'
            : 'bg-gradient-to-b from-black/65 to-transparent'
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-12">
          <Link href="/" className="text-white tracking-[0.28em] text-base md:text-lg font-light uppercase">
            Villa·Alta
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/85 text-sm tracking-[0.14em] uppercase hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contacto"
              className="hidden sm:inline-flex border border-white/40 text-white text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Reservar
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center border border-white/30 rounded-full text-white"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-300 lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="h-full pt-28 px-8 flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-white text-2xl uppercase tracking-[0.14em]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex w-fit border border-white/50 px-5 py-2 rounded-full uppercase tracking-[0.2em] text-sm text-white"
          >
            Reservar
          </Link>
        </div>
      </div>
    </>
  );
}
