"use client";

import { motion } from 'framer-motion';
import MissionVision from '../components/MissionVision'; 
import FeaturedProjects from '../components/FeaturedProjects'; 
import { Award, Users, Clock, CheckCircle } from 'lucide-react';

export default function Home() {
  const features = [
    { icon: Award, title: 'Award Winning', description: 'Recognized globally for excellence in visionary architectural design.' },
    { icon: Users, title: 'Expert Team', description: 'A collective of master architects with decades of shared experience.' },
    { icon: Clock, title: 'Timely Delivery', description: 'Meticulous project management ensuring precision and punctuality.' },
    { icon: CheckCircle, title: 'Quality Assurance', description: 'Uncompromising standards in both material selection and construction.' },
  ];

  return (
    <div className="relative bg-white font-sans">

      {/* --- 1. HERO SECTION --- */}
      {/* Changed mobile height to min-h-[70vh] and desktop to min-h-screen */}
      <main className="relative min-h-[70vh] lg:min-h-screen flex items-center justify-center lg:justify-start bg-zinc-900 overflow-hidden">
        
        {/* Background Image with slow zoom animation */}
        <motion.div 
          className="absolute inset-0 z-0 origin-center" 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div 
            className="w-full h-full" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')", 
              backgroundSize: "cover", 
              backgroundPosition: "center" 
            }} 
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-0" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} 
            className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 sm:p-12 md:p-16 max-w-3xl shadow-2xl"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-t-[3px] border-l-[3px] border-[#a68a6b]"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-b-[3px] border-r-[3px] border-[#a68a6b]"></div>

            <motion.span 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, delay: 0.5 }} 
              className="text-[#a68a6b] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs mb-4 block"
            >
              Our Masterpieces
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.7 }} 
              className="text-4xl sm:text-5xl md:text-7xl font-serif text-white tracking-wide mb-4 sm:mb-6"
            >
              PROJECTS
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.8, delay: 0.9 }} 
              className="text-zinc-300 text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-xl"
            >
              We transform empty spaces into refined sanctuaries. Explore our curated portfolio of sophisticated interior designs, where elegance meets functionality.
            </motion.p>
          </motion.div>
        </div>
      </main>

      {/* --- 2. WHO WE ARE SECTION --- */}
      <section className="py-20 md:py-32 bg-zinc-50 relative z-20 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Added flex-col-reverse for mobile so text shows above image */}
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Image Box */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }} 
              className="w-full lg:w-1/2 h-[350px] sm:h-[500px] md:h-[600px]"
            >
             <img 
  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
  alt="Grand Architecture Interior" 
  className="w-full h-full object-cover rounded-sm shadow-xl" 
/>
            </motion.div>

            {/* Text Content Box */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: 0.2 }} 
              className="w-full lg:w-1/2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-[#a68a6b]"></div>
                <span className="text-[#a68a6b] font-semibold uppercase tracking-widest text-sm">Who We Are</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-8 lg:mb-10 leading-snug not-uppercase">
                RK Interior Studio is a refined interior design firm dedicated to crafting sophisticated and timeless spaces. We seamlessly combine thoughtful design, premium materials, and meticulous attention to detail to create environments that embody elegance and individuality.
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 lg:mb-10 pb-8 lg:pb-10 border-b border-zinc-200">
                <div>
                  <h4 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 sm:mb-2">500+</h4>
                  <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-semibold">Spaces Curated</p>
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 sm:mb-2">10+</h4>
                  <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-semibold">Years Excellence</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1 sm:mb-2">100%</h4>
                  <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-semibold">Client Satisfaction</p>
                </div>
              </div>
              
              <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
                With a growing portfolio of thoughtfully designed projects, RK Interior Studio brings expertise in interior design and space planning. Our work is defined by attention to detail, refined aesthetics, and a commitment to creating spaces that elevate everyday living.
              </p>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* --- 3. FEATURED PROJECTS --- */}
      <FeaturedProjects />

      {/* --- 4. PHILOSOPHY SECTION --- */}
      <section className="py-20 md:py-24 bg-zinc-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-serif"
            >
              Our Process
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              className="h-1 w-20 bg-[#a68a6b] mx-auto mb-6" 
            />
            <motion.p 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }} 
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-light"
            >
              From concept to completion, our process is rooted in meticulous planning, thoughtful collaboration, and unwavering attention to detail. Every project reflects our commitment to excellence and refined design.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }} 
                  whileHover={{ y: -5 }} 
                  className="bg-white p-6 sm:p-8 border border-zinc-200 group transition-all duration-300 hover:shadow-xl hover:border-[#a68a6b]"
                >
                  <div className="inline-flex p-4 bg-zinc-50 shadow-sm mb-6 group-hover:bg-[#a68a6b] transition-colors duration-300">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#a68a6b] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 font-serif">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
          
        </div>
      </section>

      {/* --- 5. MISSION & VISION SECTION --- */}
      <MissionVision />
    </div>
  );
}