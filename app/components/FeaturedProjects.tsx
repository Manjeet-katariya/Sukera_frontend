"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';

// Dynamic Grid Data: The 'spanClass' controls the size of each card
const fallbackProjects = [
  {
    id: 'modern-villa',
    title: "The Glass Pavilion",
    category: "Residential",
    location: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    spanClass: "md:col-span-2 md:row-span-2", // BIG SQUARE
  },
  {
    id: 'aura-tower',
    title: "Aura Skyscraper",
    category: "Commercial",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    spanClass: "md:col-span-1 md:row-span-1", // SMALL SQUARE
  },
  {
    id: 'zenith-estate',
    title: "Zenith Estate",
    category: "Luxury Villa",
    location: "Malibu, CA",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    spanClass: "md:col-span-1 md:row-span-1", // SMALL SQUARE
  },
  {
    id: 'lumina-museum',
    title: "Lumina Art Center",
    category: "Cultural",
    location: "Copenhagen",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    spanClass: "md:col-span-2 md:row-span-1", // WIDE RECTANGLE
  },
  {
    id: 'coastal-house',
    title: "Coastal Retreat",
    category: "Residential",
    location: "Sydney, AUS",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    spanClass: "md:col-span-4 md:row-span-1", // FULL WIDTH PANORAMIC
  }
];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/projects?limit=4`);
        if (!response.ok) throw new Error('Failed to fetch featured projects');
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data.slice(0, 4));
        } else {
          setProjects(fallbackProjects.slice(0, 4));
        }
      } catch (error) {
        console.warn('Featured projects fetch failed, using fallback data.', error);
        setProjects(fallbackProjects.slice(0, 4));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const displayedProjects = projects.length > 0 ? projects : fallbackProjects.slice(0, 4);
  const getSpanClass = (index: number) => {
    const pattern = index % 4;
    switch (pattern) {
      case 0:
        return 'md:col-span-2 md:row-span-2';
      case 1:
      case 2:
        return 'md:col-span-1 md:row-span-1';
      case 3:
        return 'md:col-span-2 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  if (loading) {
    return (
      <section className="py-24 md:py-32 bg-white relative z-20 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-6 rounded-xl bg-zinc-100 shadow-sm">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#a68a6b]" />
          </div>
          <p className="mt-6 text-sm uppercase tracking-widest text-zinc-500">Loading featured works...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 bg-white relative z-20 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-12 bg-[#a68a6b]"></div>
              <span className="text-[#a68a6b] font-semibold uppercase tracking-widest text-sm">Portfolio</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900"
            >
              Featured Works
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/portfolio" className="group flex items-center gap-2 text-slate-900 font-semibold hover:text-[#a68a6b] transition-colors text-sm sm:text-base">
              VIEW ALL PROJECTS
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* --- RESPONSIVE MOSAIC GRID --- */}
        {/* Note: auto-rows-[300px] is disabled on mobile so text fits perfectly without breaking */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[300px] gap-6 md:gap-4">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project._id || project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden bg-white shadow-sm md:shadow-none border border-zinc-100 md:border-transparent ${project.spanClass || getSpanClass(index)}`}
            >
              <Link href={`/portfolio/${project._id || project.id}`} className="flex flex-col md:block w-full h-full">
                
                {/* 1. IMAGE CONTAINER */}
                <div className="relative w-full aspect-[4/3] md:aspect-auto md:absolute md:inset-0 overflow-hidden shrink-0">
                  <img 
                    src={project.image || project.featuredImage} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out md:group-hover:scale-110"
                  />
                  {/* Hover Overlay (Desktop Only) */}
                  <div className="hidden md:block absolute inset-0 bg-black/40 backdrop-blur-[2px] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-10"></div>
                </div>

                {/* 2. CONTENT CONTAINER */}
                {/* Mobile: Always visible, dark text on light bg. Desktop: Fades in on hover, white text on dark bg. */}
                <div className="relative md:absolute md:inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-end z-20 transition-all duration-700 ease-out bg-zinc-50 md:bg-transparent flex-1 md:opacity-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:delay-100">
                  
                  {/* Category Tag */}
                  <span className="text-white bg-[#a68a6b] self-start px-2.5 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 md:mb-4 block shadow-sm md:shadow-md">
                    {project.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900 md:text-white mb-2 md:drop-shadow-md transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Location */}
                  <div className="flex items-center gap-2 text-slate-500 md:text-zinc-200 text-xs sm:text-sm font-light mb-5 md:mb-6 md:drop-shadow-md transition-colors">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#a68a6b]" />
                    {project.location}
                  </div>

                  {/* Divider & Action Button */}
                  <div className="mt-auto md:mt-0 pt-4 md:pt-5 border-t border-zinc-200 md:border-white/30 flex items-center justify-between transition-colors">
                    <span className="text-slate-900 md:text-white text-xs md:text-sm uppercase tracking-wider font-bold transition-colors">
                      View Project
                    </span>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-300 md:border-white/50 flex items-center justify-center text-slate-900 md:text-white group-hover:bg-[#a68a6b] group-hover:border-[#a68a6b] group-hover:text-white transition-colors duration-500">
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}