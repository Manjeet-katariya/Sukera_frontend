"use client";

import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#f8f9fa] border-t border-gray-200">
      
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-16">
        
        {/* --- Main 3 Column Grid + Newsletter --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">

          {/* 1. Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img 
                src="/mainlogo.png" // Update with your local logo path
                alt="GameOn Logo" 
                className="h-16 object-contain"
              />
            </Link>
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-[200px]">
              The Kinetic Editorial of Sport. Transforming how the world plays together.
            </p>
          </div>

          {/* 2. Company Links */}
          <div>
            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {['About Us', 'Terms of Service', 'Privacy Policy', 'Careers'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-500 text-[13px] hover:text-[#1abc60] transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Support Links */}
          <div>
            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-6">
              Support
            </h4>
            <ul className="space-y-4">
              {['Contact Support', 'FAQs', 'Owner Help', 'Safety Center'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-500 text-[13px] hover:text-[#1abc60] transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter Box */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-[16px] p-6 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
              <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-3">
                Newsletter
              </h4>
              <p className="text-gray-500 text-[12px] leading-relaxed mb-4">
                Get the latest match alerts and venue openings.
              </p>
              
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-[#f8f9fa] border-none outline-none rounded-md px-4 py-3 text-[13px] w-full text-gray-700 placeholder:text-gray-400 focus:ring-1 focus:ring-[#1abc60]"
                />
                <button 
                  type="submit"
                  className="bg-[#1abc60] hover:bg-[#169c4e] text-white font-bold py-3 rounded-md text-[13px] transition-colors w-full"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* --- Bottom Bar --- */}
        <div className="mt-16 pt-8 flex items-center justify-center border-t border-gray-200">
          <p className="text-gray-400 text-[13px]">
            &copy; {year} GameOn. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;