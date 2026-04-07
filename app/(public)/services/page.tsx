"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Plus, Minus, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const [openProcess, setOpenProcess] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const designProcessSteps = [
    { 
      title: "CONCEPT DESIGN", 
      desc: "During this initial phase, we collaborate closely with you to understand your lifestyle, aesthetic preferences, and functional needs. We establish the overarching vision, create initial mood boards, and define the design direction that will guide the entire project." 
    },
    { 
      title: "SCHEMATIC DESIGN", 
      desc: "Here, concepts translate into spatial realities. We develop preliminary space plans, explore structural modifications, and begin sourcing high-level material palettes. You will review initial 2D layouts to ensure the flow of the space aligns perfectly with your requirements." 
    },
    { 
      title: "DETAILED DESIGN", 
      desc: "Every detail is refined. We specify exact finishes, custom millwork, lighting fixtures, and furnishings. You will receive comprehensive 3D renderings and material samples, providing a crystal-clear preview of your future environment before any construction begins." 
    },
    { 
      title: "CONSTRUCTION DRAWINGS", 
      desc: "We produce highly detailed technical drawing packages. These precise blueprints serve as the master guide for contractors, engineers, and builders, ensuring that our design intent is executed flawlessly and up to code." 
    },
    { 
      title: "EXECUTION & STYLING", 
      desc: "Our team oversees the procurement process, coordinates with trusted vendors, and conducts site visits to monitor construction quality. The process culminates in final staging and styling, where we place every piece of furniture and art to complete your sanctuary." 
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#fcf8f2] font-sans text-slate-900 overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[80vh] md:min-h-screen pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-40 md:pb-20 flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Sophisticated Interior" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-zinc-900"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full px-4 sm:px-6 text-center max-w-4xl mx-auto"
        >
          <div className="bg-[#1a1a1a]/90 backdrop-blur-md border-[4px] sm:border-[8px] md:border-[16px] border-[#a68a6b] p-4 sm:p-6 md:p-16 shadow-2xl w-full">
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-widest mb-3 md:mb-6">
              OUR EXPERTISE
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light max-w-2xl mx-auto">
              Creating inspired spaces through strategic design, meticulous management, and seamless execution.
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="w-full py-12 sm:py-16 md:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-4 tracking-wide uppercase">
              Design With Purpose
            </h2>
            <div className="h-1 w-12 md:w-20 bg-[#a68a6b] mx-auto mb-4 md:mb-8"></div>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              At Architecture Studio, we deliver highly customized solutions that span the entire lifecycle of your project. From initial architectural consultancy to complete turnkey handovers, our services are tailored to elevate your environment and remove the stress of construction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICE 1: RESIDENTIAL INTERIORS --- */}
      <section className="w-full py-12 sm:py-16 md:py-24 bg-[#fcf8f2] border-t border-zinc-200">
        <div className="w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16">
            
            {/* Text Content */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
              className="w-full lg:w-1/2"
            >
              <span className="text-[#a68a6b] font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 block">SERVICE 01</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-3 md:mb-6 leading-tight">RESIDENTIAL <br className="hidden sm:block" /> ARCHITECTURE</h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light mb-6 md:mb-10">
                We specialize in crafting bespoke living spaces that are both luxurious and liveable. From ground-up residential builds to complete home transformations, our approach ensures your sanctuary is a true reflection of your personality and lifestyle.
              </p>
              <ul className="space-y-3 md:space-y-6 text-slate-800 mb-6 md:mb-12">
                {["Custom Villa & Home Design", "Kitchen & Bathroom Remodeling", "Master Bedroom Sanctuaries", "Spatial Planning & Flow"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#a68a6b] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base md:text-lg font-medium font-serif">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-block w-full sm:w-auto text-center bg-[#a68a6b] hover:bg-[#8e7358] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-sm font-bold uppercase tracking-wider sm:tracking-widest transition-colors duration-300 shadow-md text-xs sm:text-sm">
                Discuss Your Home
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 h-[200px] xs:h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-sm shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Residential Interior" className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SERVICE 2: COMMERCIAL INTERIORS --- */}
      <section className="w-full py-12 sm:py-16 md:py-24 bg-zinc-950 text-white">
        <div className="w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-stretch lg:items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16">
            
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 h-[200px] xs:h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-sm shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Commercial Office Interior" className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105" />
            </motion.div>

            {/* Text Content */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
              className="w-full lg:w-1/2"
            >
              <span className="text-[#a68a6b] font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 block">SERVICE 02</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 md:mb-6 leading-tight">COMMERCIAL <br className="hidden sm:block" /> SPACES</h2>
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed font-light mb-6 md:mb-10">
                Your commercial space is an extension of your brand. We design dynamic environments that inspire productivity, impress clients, and foster growth, from modern corporate offices to inviting hospitality venues.
              </p>
              <ul className="space-y-3 md:space-y-6 text-zinc-200 mb-6 md:mb-12">
                {["Corporate Office Design & Strategy", "Retail Store Environments", "Hospitality & Restaurant Ambience", "Brand Integration & Signage"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#a68a6b] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base md:text-lg font-medium font-serif">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-block w-full sm:w-auto text-center bg-white text-zinc-900 px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-sm font-bold uppercase tracking-wider sm:tracking-widest transition-colors duration-300 hover:bg-zinc-200 shadow-md text-xs sm:text-sm">
                Elevate Your Workspace
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SERVICE 3: TURNKEY SOLUTIONS --- */}
      <section className="w-full py-12 sm:py-16 md:py-24 bg-white border-b border-zinc-200">
        <div className="w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16">
            
            {/* Text Content */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
              className="w-full lg:w-1/2"
            >
              <span className="text-[#a68a6b] font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 block">SERVICE 03</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-3 md:mb-6 leading-tight">TURNKEY <br className="hidden sm:block" /> SOLUTIONS</h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light mb-6 md:mb-10">
                Experience absolute peace of mind. Our Turnkey solutions offer a single point of contact from conceptualization to the final handover. We manage the design, procurement, construction, and final styling, delivering a fully realized space ready for you to step into.
              </p>
              <ul className="space-y-3 md:space-y-6 text-slate-800 mb-6 md:mb-12">
                {["End-to-End Project Execution", "Single Point of Accountability", "Seamless Design-to-Build Transition", "Furniture & Decor Procurement"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#a68a6b] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base md:text-lg font-medium font-serif">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-block w-full sm:w-auto text-center bg-[#a68a6b] hover:bg-[#8e7358] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-sm font-bold uppercase tracking-wider sm:tracking-widest transition-colors duration-300 shadow-md text-xs sm:text-sm">
                Complete Your Vision
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 h-[200px] xs:h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-sm shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Turnkey Construction" className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SERVICE 4: PMC & CONSULTANCY --- */}
      <section className="w-full py-12 sm:py-16 md:py-24 bg-zinc-900 text-white">
        <div className="w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-stretch lg:items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16">
            
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 h-[200px] xs:h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-sm shadow-2xl"
            >
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Architecture Blueprint" className="w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105 grayscale-[30%]" />
            </motion.div>

            {/* Text Content */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
              className="w-full lg:w-1/2"
            >
              <span className="text-[#a68a6b] font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 block">SERVICE 04</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 md:mb-6 leading-tight">PMC & <br className="hidden sm:block" /> CONSULTANCY</h2>
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed font-light mb-6 md:mb-10">
                Protect your investment. As your Project Management Consultants, we act as your direct representative on-site. We oversee contractors, manage strict timelines, audit budgets, and ensure that execution flawlessly matches the architectural intent without compromise.
              </p>
              <ul className="space-y-3 md:space-y-6 text-zinc-200 mb-6 md:mb-12">
                {["Budget & Timeline Management", "Contractor & Vendor Coordination", "Site Quality Audits", "Feasibility Studies & Master Planning"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 md:gap-4">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#a68a6b] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base md:text-lg font-medium font-serif">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-block w-full sm:w-auto text-center bg-white text-zinc-900 px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-sm font-bold uppercase tracking-wider sm:tracking-widest transition-colors duration-300 hover:bg-zinc-200 shadow-md text-xs sm:text-sm">
                Protect Your Investment
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Features Banner) --- */}
      <section className="w-full py-12 sm:py-16 md:py-20 bg-[#a68a6b] text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-3 md:mb-6 text-white/80" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold mb-2 md:mb-3">Uncompromising Quality</h3>
              <p className="font-light text-white/80 text-xs sm:text-sm md:text-base">We source premium materials and partner with master craftsmen to ensure perfection.</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-3 md:mb-6 text-white/80" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold mb-2 md:mb-3">On-Time Delivery</h3>
              <p className="font-light text-white/80 text-xs sm:text-sm md:text-base">Rigorous project management protocols ensure your space is ready when promised.</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-3 md:mb-6 text-white/80" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold mb-2 md:mb-3">Award-Winning Design</h3>
              <p className="font-light text-white/80 text-xs sm:text-sm md:text-base">Recognized globally for blending innovative aesthetics with functional living.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESIGN PROCESS (Accordion) --- */}
      <section className="w-full py-16 sm:py-20 md:py-32 bg-[#f4f2ee]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 md:mb-16 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-slate-900 mb-3 md:mb-6 tracking-wide">
              OUR PROCESS
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-light">
              We seamlessly translate innovative designs into stunning, executed realities. Our phases manage every aspect, ensuring a flawless execution.
            </p>
          </div>

          <div className="border-t border-slate-300">
            {designProcessSteps.map((step, index) => (
              <div key={index} className="border-b border-slate-300">
                <button
                  onClick={() => setOpenProcess(openProcess === index ? null : index)}
                  className="w-full flex justify-between items-center py-4 sm:py-5 md:py-6 px-2 sm:px-0 focus:outline-none group hover:text-[#a68a6b] transition-colors"
                >
                  <span className={`text-base sm:text-lg md:text-2xl font-light tracking-wider transition-colors text-left ${openProcess === index ? 'text-[#a68a6b]' : 'text-slate-800'}`}>
                    {step.title}
                  </span>
                  <div className="flex-shrink-0 ml-3 sm:ml-4">
                    {openProcess === index ? (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#a68a6b] font-light" strokeWidth={1.5} />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-slate-400 group-hover:text-[#a68a6b]" strokeWidth={1.5} />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openProcess === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 sm:pb-6 md:pb-8 pr-3 sm:pr-4 md:pr-12 text-slate-600 font-light leading-relaxed text-xs sm:text-sm md:text-lg px-2 sm:px-0">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="w-full py-16 sm:py-20 md:py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-6">Ready to realize your vision?</h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-light mb-6 md:mb-10">
            Schedule a consultation with our lead architects today and let's discuss how we can bring your architectural dreams to life.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-900 hover:bg-[#a68a6b] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-sm font-bold uppercase tracking-wider sm:tracking-widest transition-colors duration-300 shadow-xl text-xs sm:text-sm">
            Start Your Project <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}