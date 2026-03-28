'use client';

import { Dialog, Transition } from '@headlessui/react';
import {  MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment,useEffect, useState } from 'react';
import { menu } from '@/app/lib/constants';
import LogoSquarewhite from '../../logo-square-white';


export default function MobileMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);


  const toggleSubmenu = (title: string) => {
    setExpandedMenu(expandedMenu    === title ? null : title);
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
       <button
         onClick={openMobileMenu}
          className="flex flex-col  gap-[20px] cursor-pointer group md:ml-40 "
        aria-label="Open mobile menu">
              <span className="w-14 h-[2px] bg-[#8b5c66] block"></span>
              <span className="w-14 h-[2px] bg-[#8b5c66] block"></span>
              <span className="w-14 h-[2px] bg-[#8b5c66] block"></span>
          </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel 
            style={{
                   background: "radial-gradient(circle at top, #6e3c49 0%, #2d151a 55%, #12090c 100%)",
            }} className="fixed top-0 right-0 h-full w-[85%] max-w-[420px] bg-[#e8e2d9] shadow-2xl overflow-y-auto">
              <div className="p-8 pb-6">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-serif text-[#C4A962] tracking-wider"><LogoSquarewhite /></span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="p-1 hover:opacity-70 transition-opacity"
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="h-6 cursor-pointer w-6 text-white" strokeWidth={1.5} />
                  </button>
                </div>
                <nav>
                  <ul className="space-y-0">
                    {menu.map((item) => (
                      <li key={item.title} className="border-b border-gray-200">
                        <div className="flex items-center justify-between py-4">
                          {item.submenu ? (
                            <>
                              <span className="text-sm  rs-titlee font-medium text-white uppercase tracking-wide flex-1">
                                {item.title}
                              </span>
                              <button 
                                onClick={() => toggleSubmenu(item.title)}
                                className="p-1  transition-colors"
                                aria-label={`Toggle ${item.title} submenu`}
>
                                {expandedMenu === item.title ? (
                                  <MinusIcon className="h-4 cursor-pointer w-4 text-white" />
                                ) : (
                                  <PlusIcon className="h-4 cursor-pointer w-4 text-white" />
                                )}
                              </button>
                            </>
                          ) : (
                            <Link
                              href={item.path}
                              onClick={closeMobileMenu}
                              className="text-sm rs-titlee font-medium text-white uppercase tracking-wide  transition-colors flex-1"
                            >
                              {item.title}
                            </Link>
                          )}
                        </div>

                        {item.submenu && (
                          <div 
                            className={`overflow-hidden  rs-titlee  transition-all duration-300 ${
                              expandedMenu === item.title 
                                ? 'max-h-96 opacity-100' 
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            <ul className="pl-6 pb-4  space-y-3">
                              {item.submenu.map((subItem) => (
                                <li key={subItem.title}>
                                  <Link
                                    href={subItem.path}
                                    onClick={closeMobileMenu}
                                    className="text-sm text-white  transition-colors block uppercase tracking-wide"
                                  >
                                    {subItem.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="px-8 py-6 ">
                <h3 className="text-xl  rs-titlee  mb-4 text-white">  Hotel</h3>
                <p className="text-sm text-white leading-relaxed mb-6">
                                  Centro Histórico, CL Callejon De Los Estribos
                  Cartagena, Colombia 130001
                </p>
                <div className="space-y-4 rs-titlee">
                  <h4 className="text-base  text-white mb-3">Contacto</h4>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-white pt-2">Cartagena de Indias, Colombia 130001</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <p className="text-sm text-white pt-2">+57 321 5062187</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-white pt-2">hotelvillaaltac@gmail.com</p>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

    </>
  );
}
