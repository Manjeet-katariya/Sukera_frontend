"use client";

import { MapPin, Star, ChevronDown } from 'lucide-react';

// Screenshot ke exact data ke according mock data
const featuredVenues = [
  {
    id: 1,
    name: 'Velocity Sports Park',
    location: 'Downtown Core, NY',
    price: '₹650',
    rating: '4.9',
    // Agar image public folder mein direct padi hai:
    img: '/Perreferred1.png', 
  },
  {
    id: 2,
    name: 'Elite Tennis Club',
    location: 'Riverside Drive, IL',
    price: '₹600',
    rating: '4.8',
    // Agar image public/venues folder ke andar hai:
    img: '/Perreferred2.png', 
  },
  {
    id: 3,
    name: 'Skyline Hoop Hub',
    location: 'Heights District',
    price: '₹450',
    rating: '4.0',
    img: '/Perreferred3..png',
  },
];

export default function FeaturedVenues() {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* --- Header Section --- */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Featured Venues</h2>
            <p className="text-gray-500 text-[14px]">Curated selection of high-performance grounds.</p>
          </div>
          
          {/* Sort By Dropdown - Exactly like screenshot */}
          <button className="flex items-center gap-1 text-[#1abc60] text-[14px] font-medium hover:text-[#169c4e] transition-colors mt-2">
            Sort By <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* --- Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredVenues.map((venue) => (
            <div 
              key={venue.id} 
              className="bg-white rounded-[16px] overflow-hidden border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Rating Badge */}
              <div className="relative h-[200px] w-full p-2.5">
                {/* Under image div for rounded corners specifically matching the design */}
                <div className="w-full h-full rounded-[12px] overflow-hidden relative">
                   <img 
                     src={venue.img} 
                     alt={venue.name} 
                     className="w-full h-full object-cover" 
                   />
                </div>
                
                {/* Rating Badge (Top Right) */}
                <div className="absolute top-5 right-5 bg-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span className="text-[12px] font-bold text-gray-800">{venue.rating}</span>
                  {/* Fill prop use kiya hai solid star ke liye */}
                  <Star className="w-3 h-3 text-[#FFB800] fill-[#FFB800]" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 pt-3 flex flex-col flex-1">
                <h3 className="font-bold text-[17px] text-gray-900 mb-1.5">{venue.name}</h3>
                
                <p className="text-gray-500 text-[13px] flex items-center gap-1.5 mb-6">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> 
                  {venue.location}
                </p>
                
                {/* Bottom Section: Price & Button */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-gray-900 font-bold text-xl flex items-baseline gap-1">
                    {venue.price}
                    <span className="text-[12px] font-medium text-gray-400">/ HR</span>
                  </div>
                  
                  <button className="bg-[#1abc60] hover:bg-[#169c4e] text-white px-5 py-2 rounded-lg text-[13px] font-medium transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}