"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.47a2.78 2.78 0 0 0-1.95 1.95A29.68 29.68 0 0 0 1 12a29.68 29.68 0 0 0 .47 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29.68 29.68 0 0 0 23 12a29.68 29.68 0 0 0-.46-5.58z" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

const PinterestIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.04C7.2 2.04 4 5 4 8.77c0 2.44 1.24 4.56 3.08 5.37.34.13.5.06.58-.24.06-.26.2-1.02.26-1.3.09-.38.05-.52-.22-.85-0.63-.74-1.03-1.7-1.03-2.73 0-3.53 2.8-6.54 6.58-6.54 3.55 0 6.15 2.53 6.15 5.92 0 3.52-2.22 6.53-5.29 6.53-1.03 0-2-.52-2.33-1.12 0 0-.5 1.88-.62 2.31-.22.76-.82 1.71-1.23 2.29C8.8 22.9 10.35 23.21 12 23.21c4.8 0 8-2.96 8-6.73S16.8 2.04 12 2.04z" />
  </svg>
);

interface ContactDetails {
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone: string;
  email: string;
  businessHours: {
    [day: string]: {
      closed?: boolean;
      open?: string;
      close?: string;
    };
  };
}

const formatAddress = (address: ContactDetails['address']) => {
  return `${address.street}, ${address.city}, ${address.state}${address.zipCode ? ` ${address.zipCode}` : ''}`;
};

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const formatBusinessHours = (hours: ContactDetails['businessHours']) => {
  return Object.entries(hours)
    .map(([day, schedule]) => {
      const label = capitalize(day);
      if (schedule.closed) {
        return `${label}: Closed`;
      }
      return `${label}: ${schedule.open || '--'} - ${schedule.close || '--'}`;
    })
    .join('\n');
};

const Footer = () => {
  const year = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState({ twitter: '', facebook: '', instagram: '', linkedin: '', youtube: '', pinterest: '' });
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/social-icons`);
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (data.success && data.data) setSocialLinks(data.data);
      } catch { /* silent fail */ }
    };
    fetchSocialLinks();
  }, []);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/contact-details`);
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (data.success && data.data) setContactDetails(data.data);
      } catch { /* silent fail */ }
    };
    fetchContactDetails();
  }, []);

  const trackSocialClick = (channel: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/social/click`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
      body: JSON.stringify({ channel })
    }).catch(() => {});
  };

  const socials = [
    { key: 'twitter', href: socialLinks.twitter, Icon: TwitterIcon },
    { key: 'facebook', href: socialLinks.facebook, Icon: FacebookIcon },
    { key: 'instagram', href: socialLinks.instagram, Icon: InstagramIcon },
    { key: 'linkedin', href: socialLinks.linkedin, Icon: LinkedinIcon },
    { key: 'youtube', href: socialLinks.youtube, Icon: YoutubeIcon },
    { key: 'pinterest', href: socialLinks.pinterest, Icon: PinterestIcon },
  ].filter(s => s.href);

  return (
    <footer className="bg-[#080808] relative overflow-hidden">
      {/* Top gold accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter font-serif">SD</span>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20 pb-10 relative z-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand - large */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-8">
<img 
  src="/logo2.png" 
  alt="Logo" 
  className="h-16  object-contain"
/>
</Link>
            <p className="text-white/40 text-sm leading-relaxed font-light max-w-sm mb-8">
              An award-winning interior design and architecture studio. Crafting refined, timeless environments across India and beyond.
            </p>
            {/* Social media stat */}
            <div className="border border-[#C9A96E]/20 p-6 inline-block">
              <div className="text-3xl font-black text-[#C9A96E] font-serif mb-1">2,00,000<span className="text-[#C9A96E]">+</span></div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">People follow our journey</div>
            </div>

            {socials.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {socials.map(({ key, href, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    onClick={() => trackSocialClick(key)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-200 hover:border-[#C9A96E] hover:text-[#C9A96E] hover:bg-white/10"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Studio links */}
          <div className="lg:col-span-2">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E] mb-6">Studio</h4>
            <ul className="space-y-4">
              {['Portfolio', 'Services', 'About', 'Contact', 'Calculator'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`}
                    className="text-white/40 text-sm font-light hover:text-[#C9A96E] transition-colors duration-200 hover:translate-x-1 inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="lg:col-span-2">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E] mb-6">Services</h4>
            <ul className="space-y-4">
              {['Residential', 'Commercial', 'Turnkey', 'PMC', 'Estimation'].map(item => (
                <li key={item}>
                  <span className="text-white/40 text-sm font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#C9A96E] mb-6">Contact</h4>
            <div className="space-y-4 text-white/40 text-sm font-light">
              <p className="leading-relaxed">
                {contactDetails ? formatAddress(contactDetails.address) : 'Loading address...'}
              </p>
              <p>
                {contactDetails?.email ? (
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="hover:text-[#C9A96E] transition-colors"
                  >
                    {contactDetails.email}
                  </a>
                ) : (
                  <span className="text-white/40">Loading email...</span>
                )}
              </p>
              <p>{contactDetails?.phone || 'Loading phone...'}</p>
              <p className="whitespace-pre-line">
                {contactDetails ? formatBusinessHours(contactDetails.businessHours) : 'Loading business hours...'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-white/20 text-[9px] uppercase tracking-[0.25em] font-bold">
            &copy; {year} Sukera Dexterity. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/20 hover:text-[#C9A96E] text-[9px] uppercase tracking-[0.2em] font-bold transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/20 hover:text-[#C9A96E] text-[9px] uppercase tracking-[0.2em] font-bold transition-colors">Terms</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;