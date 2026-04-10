"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Building, Loader2 } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  category: 'residential' | 'commercial';
  description: string;
  location: string;
  completionYear: number;
  client: string;
  featuredImage: string;
  images: string[];
  videos: string[];
  technologies: string[];
  materials: string[];
  isActive: boolean;
  order: number;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
}

// Premium Fallback Data to prevent crashes if backend is down
const fallbackProjects: Project[] = [
  {
    _id: "p1",
    title: "The Glass Pavilion",
    category: "residential",
    description: "A contemporary residential masterpiece perched on a dramatic slope.",
    location: "Swiss Alps, Switzerland",
    completionYear: 2023,
    client: "Private Client",
    featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    images: [], videos: [], technologies: [], materials: [], isActive: true, order: 1
  },
  {
    _id: "p2",
    title: "Aura Skyscraper",
    category: "commercial",
    description: "Aura Skyscraper redefines the commercial skyline.",
    location: "Dubai, UAE",
    completionYear: 2024,
    client: "Emaar Properties",
    featuredImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    images: [], videos: [], technologies: [], materials: [], isActive: true, order: 2
  },
  {
    _id: "p3",
    title: "Zenith Estate",
    category: "residential",
    description: "Situated on a rugged cliffside, Zenith Estate provides ultimate luxury.",
    location: "Malibu, California",
    completionYear: 2022,
    client: "Confidential",
    featuredImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    images: [], videos: [], technologies: [], materials: [], isActive: true, order: 3
  },
  {
    _id: "p4",
    title: "Lumina Art Center",
    category: "commercial",
    description: "A brilliant cultural hub wrapped in smart glass.",
    location: "Copenhagen",
    completionYear: 2023,
    client: "City Council",
    featuredImage: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80",
    images: [], videos: [], technologies: [], materials: [], isActive: true, order: 4
  },
  {
    _id: "p5",
    title: "Coastal Retreat",
    category: "residential",
    description: "A sprawling panoramic home facing the Pacific ocean.",
    location: "Sydney, AUS",
    completionYear: 2024,
    client: "Private Client",
    featuredImage: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1600&q=80",
    images: [], videos: [], technologies: [], materials: [], isActive: true, order: 5
  }
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'residential' | 'commercial'>('all');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 20
  });
  const [hasMore, setHasMore] = useState(true);
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Initial load - first 20 projects
  useEffect(() => {
    fetchProjects(1, true);
  }, []);

  // Reset and refetch when category changes
  useEffect(() => {
    setProjects([]);
    fetchProjects(1, true);
  }, [selectedCategory]);

  const fetchProjects = async (page: number, isInitial: boolean = false) => {
    if (isInitial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const categoryParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
      const response = await fetch(`${API_URL}/api/projects?page=${page}&limit=20${categoryParam}`);
      
      if (!response.ok) throw new Error("Failed to fetch from backend");
      
      const data = await response.json();
      if (data.success) {
        const activeProjects = data.data
          .filter((project: Project) => project.isActive)
          .sort((a: Project, b: Project) => a.order - b.order);
        
        if (isInitial) {
          setProjects(activeProjects);
        } else {
          setProjects(prev => [...prev, ...activeProjects]);
        }
        
        setPagination(data.pagination);
        setHasMore(data.pagination.currentPage < data.pagination.totalPages);
      }
    } catch (error) {
      console.warn('Backend unreachable. Loading fallback premium data.', error);
      if (isInitial) {
        setProjects(fallbackProjects);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalRecords: fallbackProjects.length,
          limit: 20
        });
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loadingMore && pagination) {
      fetchProjects(pagination.currentPage + 1, false);
    }
  }, [hasMore, loadingMore, pagination]);

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: '100px'
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Dynamic Helper to create the repeating Mosaic Grid Pattern
  const getSpanClass = (index: number) => {
    const pattern = index % 5; // Repeats every 5 items to keep the grid perfectly shaped
    switch (pattern) {
      case 0: return "md:col-span-2 md:row-span-2"; // Big Square
      case 1: return "md:col-span-1 md:row-span-1"; // Small Square
      case 2: return "md:col-span-1 md:row-span-1"; // Small Square
      case 3: return "md:col-span-2 md:row-span-1"; // Wide Rectangle
      case 4: return "md:col-span-4 md:row-span-1"; // Panoramic Full Width
      default: return "md:col-span-2 md:row-span-2";
    }
  };


  return (
    <div className="min-h-screen bg-zinc-50 font-sans">

      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Architecture Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center space-x-3 mb-4 md:mb-6">
              <div className="h-px w-8 md:w-12 bg-[#a68a6b]"></div>
              <span className="text-[#a68a6b] font-bold uppercase tracking-widest text-xs md:text-sm">Our Work</span>
              <div className="h-px w-8 md:w-12 bg-[#a68a6b]"></div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-4 md:mb-6 leading-tight drop-shadow-md">Selected Portfolio</h1>
            <p className="text-base md:text-xl text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
              Explore our collection of architectural masterpieces, where visionary design meets flawless execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- ELEGANT FILTER SECTION --- */}
      <section className="py-6 md:py-8 bg-white border-b border-zinc-200 sticky top-16 md:top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-8 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
            {['all', 'residential', 'commercial'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`relative pb-2 text-xs sm:text-sm font-bold uppercase tracking-widest transition-colors duration-300 whitespace-nowrap ${
                  selectedCategory === category ? 'text-slate-900' : 'text-zinc-400 hover:text-[#a68a6b]'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
                {selectedCategory === category && (
                  <motion.div layoutId="activeFilter" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#a68a6b]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS GRID (DYNAMIC MOSAIC) --- */}
      <section className="py-16 md:py-24 bg-zinc-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 md:py-32 border border-dashed border-zinc-300 rounded-sm bg-white">
              <Building className="w-10 h-10 md:w-12 md:h-12 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-serif text-slate-900 mb-2">No Projects Found</h3>
              <p className="text-sm md:text-base text-slate-500 font-light">Check back soon for our latest architectural work.</p>
            </div>
          ) : (
            /* DYNAMIC GRID: Responsive spans based on mobile vs desktop */
            <motion.div layout className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[350px] gap-6 md:gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    key={project._id}
                    className={`group relative overflow-hidden bg-white shadow-sm md:shadow-none border border-zinc-100 md:border-transparent ${getSpanClass(index)}`}
                  >
                    <Link href={`/portfolio/${project._id}`} className="flex flex-col md:block w-full h-full">
                      
                      {/* 1. IMAGE CONTAINER */}
                      <div className="relative w-full aspect-[4/3] md:aspect-auto md:absolute md:inset-0 overflow-hidden shrink-0">
                        <img 
                          src={project.featuredImage} 
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
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 md:text-white mb-2 md:drop-shadow-md transition-colors">
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
              </AnimatePresence>
            </motion.div>
          )}

          {/* Infinite Scroll Loading Indicator */}
          {filteredProjects.length > 0 && (
            <div ref={loadMoreRef} className="flex justify-center items-center py-12 md:py-16">
              {loadingMore && (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-6 h-6 md:w-8 md:h-8 text-[#a68a6b] animate-spin" />
                  <p className="text-zinc-500 mt-2 text-xs md:text-sm">Loading more projects...</p>
                </div>
              )}
              {!hasMore && !loadingMore && pagination.totalRecords > 0 && (
                <p className="text-zinc-400 text-xs md:text-sm uppercase tracking-widest">
                  Showing all {pagination.totalRecords} projects
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}