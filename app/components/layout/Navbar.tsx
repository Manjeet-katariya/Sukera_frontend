"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

// Custom Premium SVGs for Social Icons
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});

  // Fetch social media links from SocialIcons API
  const fetchSocialLinks = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/social-icons`);
      if (!response.ok) {
        throw new Error(`Social links fetch failed with status ${response.status}`);
      }
      const data = await response.json();

      if (data.success && data.data) {
        setSocialLinks({
          facebook: data.data.facebook || '',
          instagram: data.data.instagram || '',
          twitter: data.data.twitter || '',
          linkedin: data.data.linkedin || ''
        });
      }
    } catch (error) {
      console.warn('Navbar social links unavailable:', error);
      setSocialLinks({});
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const socialIcons = [
    { channel: 'facebook', href: socialLinks.facebook, icon: FacebookIcon },
    { channel: 'instagram', href: socialLinks.instagram, icon: InstagramIcon },
    { channel: 'twitter', href: socialLinks.twitter, icon: TwitterIcon },
    { channel: 'linkedin', href: socialLinks.linkedin, icon: LinkedInIcon }
  ].filter(link => link.href); // Only show if URL exists

  // Advanced scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trackSocialClick = (channel: string) => {
    const payload = JSON.stringify({ channel });
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      navigator.sendBeacon(`${API_URL}/api/social/click`, new Blob([payload], { type: 'application/json' }));
      return;
    }

    fetch(`${API_URL}/api/social/click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: payload
    }).catch(() => undefined);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-md py-2 border-b border-gray-200/50'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 border-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Changed to an exact 3-column layout for perfect centering */}
        <div className="flex justify-between items-center h-16">
          
          {/* --- 1. LOGO (Flex-1 forces left alignment while sharing equal outer space) --- */}
          <div className="flex flex-1 items-center justify-start">
            <Link href="/" className="relative h-12 w-32 sm:h-14 sm:w-40 block group">
              <Image
                src="/logo1.png"
                alt="Site logo"
                fill
                sizes="(max-width: 640px) 128px, 160px"
                loading="eager"
                className="object-contain object-left"
              />
            </Link>
          </div>

          {/* --- 2. DESKTOP NAVIGATION (Flex-none ensures absolute center) --- */}
          <div className="hidden lg:flex flex-none justify-center items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group font-semibold text-[13px] uppercase tracking-[0.12em] transition-colors duration-300 py-2 ${
                  scrolled 
                    ? 'text-slate-700 hover:text-[#a68a6b]' 
                    : 'text-gray-100 hover:text-white'
                }`}
              >
                {link.name}
                {/* Animated Underline */}
                <span 
                  className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 ease-out group-hover:w-full bg-[#a68a6b]`}
                ></span>
              </Link>
            ))}
          </div>
            
          {/* --- 3. RIGHT SIDE: SOCIALS & MOBILE TOGGLE (Flex-1 forces right alignment) --- */}
          <div className="flex flex-1 items-center justify-end space-x-4 lg:space-x-5">
            
            {/* Vertical Divider (Desktop Only) */}
            <div className={`hidden lg:block h-8 w-px mr-1 transition-colors duration-300 ${scrolled ? 'bg-zinc-300' : 'bg-white/20'}`}></div>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              {socialIcons.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.channel}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.channel}
                    onClick={() => trackSocialClick(link.channel)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                      scrolled
                        ? 'bg-zinc-100 text-slate-600 hover:bg-[#a68a6b] hover:text-white hover:shadow-md'
                        : 'bg-white/10 backdrop-blur-md text-white hover:bg-[#a68a6b] hover:text-white'
                    }`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>

            {/* Mobile Hamburger Menu Button (Turns into X when open) */}
            <div className="lg:hidden ml-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`transition-colors p-1 flex items-center justify-center ${
                  scrolled ? 'text-slate-900 hover:text-[#a68a6b]' : 'text-white hover:text-[#a68a6b]'
                }`}
              >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>
            </div>

          </div>
          
        </div>
      </div>

      {/* --- MOBILE NAVIGATION PANEL --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-zinc-100 shadow-2xl overflow-hidden absolute w-full top-full left-0"
          >
            <div className="px-6 pt-2 pb-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-2 py-4 text-slate-800 hover:text-[#a68a6b] hover:bg-zinc-50 rounded-sm font-serif text-xl transition-all duration-300 border-b border-zinc-100 last:border-0"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}