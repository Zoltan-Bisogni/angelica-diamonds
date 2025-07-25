'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import BagsSection from '../components/BagsSection';

export default function Home() {
  useEffect(() => {
    // Component initialization
  }, []);

  return (
    <div className='bg-beige text-darkBrown min-h-screen'>
      {/* Fixed Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-50 bg-beige/90 backdrop-blur-sm border-b border-darkBrown/10'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex items-center space-x-3'>
            <div className='relative w-8 h-8'>
              <Image
                src='/logo-small.png'
                height={48}
                width={48}
                alt='Angelica Diamonds Logo'
                className='object-contain'
              />
            </div>
            <div className='text-2xl font-bold tracking-wider text-darkBrown'>
              ANGELICA&apos;S DIAMONDS
            </div>
          </div>
          <div className='hidden md:flex items-center space-x-8 text-sm tracking-wide'>
            <a
              href='#bags'
              className='hover:text-pinkAccent transition-colors text-darkBrown'
            >
              BAGS
            </a>

            <a
              target='_blank'
              href='https://www.instagram.com/angelica.diamonds?igsh=MTN2NDIwZTJnN2h1Zw=='
              className='hover:text-pinkAccent transition-colors text-darkBrown'
            >
              CONTACT
            </a>
            <Link
              href='/cart'
              className='hover:text-pinkAccent transition-colors flex items-center space-x-1 text-darkBrown'
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 005 16v0a1 1 0 001 1h11M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6'
                />
              </svg>
              <span className='font-bold'>CART</span>
            </Link>
          </div>
          <div className='md:hidden'>
            <button className='text-darkBrown'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen Image */}
      <section className='relative h-screen w-full overflow-hidden'>
        <div className='absolute inset-0 w-full h-full'>
          <Image
            src='/logo.png'
            alt='Angelica Diamonds'
            fill
            className='object-cover object-center'
            priority
          />
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30'>
          <div className='w-6 h-10 border-2 border-darkBrown rounded-full flex justify-center bg-beige/50 backdrop-blur-sm'>
            <div className='w-1 h-3 bg-darkBrown rounded-full mt-2 animate-pulse'></div>
          </div>
        </div>
      </section>

      {/* Bags Collection Section */}
      <BagsSection />

      {/* Footer */}
      <footer className='border-t border-gray-800 py-12'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='text-2xl font-bold tracking-wider mb-4 md:mb-0'>
              ANGELICA&apos;S DIAMONDS
            </div>
            <div className='flex space-x-8 text-sm text-gray-400'>
              <a href='#' className='hover:text-white transition-colors'>
                PRIVACY POLICY
              </a>
              <a href='#' className='hover:text-white transition-colors'>
                TERMS OF SERVICE
              </a>
              <a href='#' className='hover:text-white transition-colors'>
                CUSTOMER CARE
              </a>
            </div>
          </div>
          <div className='text-center mt-8 text-gray-400 text-sm'>
            © 2024 Angelica Bags. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
