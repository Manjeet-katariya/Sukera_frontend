"use client";

import { motion } from 'framer-motion';
import { Target, Compass } from 'lucide-react';

export default function MissionVision() {
  return (
    <section className="relative flex flex-col md:flex-row w-full overflow-hidden border-t border-zinc-200">
      
      {/* MISSION SECTION (Crisp White) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 bg-white text-slate-900 p-16 md:p-24 lg:p-32 relative flex flex-col justify-center group"
      >
        {/* Soft Bronze Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#a68a6b]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#a68a6b]/10 transition-colors duration-700"></div>

        <div className="relative z-10 max-w-lg ml-auto">
          {/* Icon Container */}
          <div className="inline-flex p-4 bg-zinc-50 border border-zinc-100 rounded-sm mb-8 group-hover:border-[#a68a6b]/40 transition-all duration-500 shadow-sm group-hover:shadow-md">
            <Target className="w-8 h-8 text-[#a68a6b]" />
          </div>
          
          <h2 className="text-sm font-semibold text-[#a68a6b] uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
            <span className="h-[1px] w-8 bg-[#a68a6b]"></span> Our Mission
          </h2>
          
          <h3 className="text-4xl md:text-5xl font-serif mb-6 leading-tight text-slate-900 transition-colors duration-500">
            Elevating the human experience through design.
          </h3>
          
          <p className="text-slate-600 text-lg font-light leading-relaxed">
            We are committed to delivering architectural excellence by blending innovative sustainability with timeless aesthetics. Our mission is to transform our clients' most ambitious visions into structural realities that improve the way people live, work, and interact.
          </p>
        </div>
        
        {/* Center Divider Line (Visible on Desktop) */}
        <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-zinc-200 to-transparent hidden md:block z-20"></div>
      </motion.div>

      {/* VISION SECTION (Soft Pearl / Zinc-50) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full md:w-1/2 bg-zinc-50 text-slate-900 p-16 md:p-24 lg:p-32 relative flex flex-col justify-center group"
      >
        {/* Soft Bronze Glow */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#a68a6b]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#a68a6b]/10 transition-colors duration-700"></div>

        <div className="relative z-10 max-w-lg mr-auto">
          {/* Icon Container */}
          <div className="inline-flex p-4 bg-white border border-zinc-100 rounded-sm mb-8 group-hover:border-[#a68a6b]/40 transition-all duration-500 shadow-sm group-hover:shadow-md">
            <Compass className="w-8 h-8 text-[#a68a6b]" />
          </div>
          
          <h2 className="text-sm font-semibold text-[#a68a6b] uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
            <span className="h-[1px] w-8 bg-[#a68a6b]"></span> Our Vision
          </h2>
          
          <h3 className="text-4xl md:text-5xl font-serif mb-6 leading-tight text-slate-900 transition-colors duration-500">
            Shaping the legacy of tomorrow's skylines.
          </h3>
          
          <p className="text-slate-600 text-lg font-light leading-relaxed">
            To be globally recognized as the vanguard of modern architecture. We envision a future where every structure we design acts as a catalyst for community growth, environmental harmony, and unparalleled spatial beauty.
          </p>
        </div>
      </motion.div>

    </section>
  );
}