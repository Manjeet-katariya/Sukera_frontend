"use client";

import Image from 'next/image'; // Next.js ka Image component import kiya
import { MapPin, Calendar, Clock } from 'lucide-react';

// Apne public folder ke path yahan daal lena (e.g., /tournaments/football.png)
const tournamentData = [
  {
    id: 1,
    sport: 'FOOTBALL',
    title: 'Summer Smash Football',
    location: 'Indiranagar, Bangalore',
    prizePool: '₹5,00,000',
    entryFee: '₹2,500',
    date: 'Aug 15-20',
    time: '09:00 AM',
    img: '/Tournamentfootball.jpg', // Local public path
  },
  {
    id: 2,
    sport: 'CRICKET',
    title: 'City Legends Cricket',
    location: 'Indiranagar, Bangalore',
    prizePool: '₹5,00,000',
    entryFee: '₹2,500',
    date: 'Aug 15-20',
    time: '09:00 AM',
    img: '/Tournamentcricket.png', // Local public path
  }
];

export default function Tournaments() {
  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Tournaments</h2>
          <p className="text-gray-500 text-[15px]">
            Rise through the ranks and prove your skills in our curated seasonal leagues.
          </p>
        </div>

        {/* --- Tournament Cards Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tournamentData.map((tournament) => (
            <div 
              key={tournament.id}
              // parent div mein relative dena zaroori hai jab hum Image mein 'fill' use karte hain
              className="relative rounded-[24px] overflow-hidden h-[320px] flex flex-col justify-end p-8 group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* --- Next.js Optimized Image --- */}
              <Image 
                src={tournament.img} 
                alt={tournament.title} 
                fill // 'fill' property image ko container ke barabar kar deti hai
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              
              {/* Dark Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-0" />

              {/* Content */}
              <div className="relative z-10 w-full">
                
                {/* Green Sport Badge */}
                <span className="bg-[#1abc60] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm inline-block mb-4">
                  {tournament.sport}
                </span>

                {/* Tournament Title */}
                <h3 className="text-3xl font-bold text-white mb-1.5">
                  {tournament.title}
                </h3>

                {/* Location with Golden Icon */}
                <div className="flex items-center text-gray-300 text-[13px] mb-6">
                  <MapPin className="w-4 h-4 text-[#FFB800] mr-1.5" /> 
                  {tournament.location}
                </div>

                {/* Prize Pool & Entry Fee Grid */}
                <div className="flex items-center gap-12 mb-4">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-0.5">
                      Prize Pool
                    </div>
                    <div className="text-[22px] font-bold text-white">
                      {tournament.prizePool}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-0.5">
                      Entry Fee
                    </div>
                    <div className="text-[22px] font-bold text-white">
                      {tournament.entryFee}
                    </div>
                  </div>
                </div>

                {/* Date & Time with Golden Icons */}
                <div className="flex items-center gap-6 mb-6 text-[13px] text-gray-300 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#FFB800]" />
                    {tournament.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#FFB800]" />
                    {tournament.time}
                  </div>
                </div>

                {/* Register Button */}
                <button className="bg-[#1abc60] hover:bg-[#169c4e] text-white font-bold py-2.5 px-6 rounded-lg text-[14px] transition-colors shadow-md w-fit">
                  Register Team
                </button>
                
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}