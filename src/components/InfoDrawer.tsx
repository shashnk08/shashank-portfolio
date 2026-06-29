import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ExternalLink } from 'lucide-react';

interface InfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: DrawerState;
}

type DrawerState = 'menu' | 'projects' | 'contact';

export const InfoDrawer: React.FC<InfoDrawerProps> = ({ isOpen, onClose, initialView }) => {
  const [view, setView] = useState<DrawerState>('menu');
  const [budget, setBudget] = useState('10k-20k');

  useEffect(() => {
    if (isOpen && initialView) {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  const menuItems = [
    { label: 'PROJECTS', action: () => setView('projects') },
    { label: "LET'S WORK", action: () => setView('contact') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your inquiry has been submitted successfully.');
    setView('menu');
    onClose();
  };

  const handleBack = () => {
    setView('menu');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />

          {/* Sliding Side Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Information, Projects, and Timeline Drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-xl md:max-w-2xl bg-[#222222] border-l border-white/5 z-50 flex flex-col shadow-2xl"
          >
            {/* Sticky Header */}
            <div className="sticky top-0 bg-[#222222]/95 backdrop-blur-md z-10 px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div>
                {view !== 'menu' ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 font-mono text-xs text-[#FF5C00] hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
                  >
                    <ArrowLeft size={16} /> BACK
                  </button>
                ) : (
                  <span className="font-mono text-xs text-white/40 tracking-widest">
                    NAVIGATION
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-white/70 hover:text-[#FF5C00] transition-colors p-2 hover:bg-white/5 rounded-full cursor-pointer"
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto px-8 py-12 md:px-12">
              <AnimatePresence mode="wait">
                {/* 1. Main Navigation Menu */}
                {view === 'menu' && (
                  <motion.div
                    key="menu-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-between h-full min-h-[60vh]"
                  >
                    <div className="flex flex-col gap-6 md:gap-8 mt-4">
                      {menuItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={item.action}
                          className={`text-left font-display text-4xl md:text-5xl tracking-wide transition-colors group relative w-fit cursor-pointer ${item.label === "LET'S WORK"
                            ? 'text-[#FF5C00] hover:text-white'
                            : 'text-white hover:text-[#FF5C00]'
                            }`}
                        >
                          {item.label}
                          <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#FF5C00] transition-all group-hover:w-full" />
                        </button>
                      ))}
                    </div>

                    {/* Quick Socials Footer in Menu */}
                    <div className="border-t border-white/5 pt-8 mt-12 flex flex-col gap-4">
                      <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                        Direct Connection
                      </span>
                      <div className="flex gap-4">
                        <a
                          href="https://wa.me/1234567890"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 font-mono text-xs text-white/60 hover:text-[#FF5C00] transition-colors"
                        >
                          WhatsApp ↗
                        </a>
                        <a
                          href="https://instagram.com"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 font-mono text-xs text-white/60 hover:text-[#FF5C00] transition-colors"
                        >
                          Instagram ↗
                        </a>
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 font-mono text-xs text-white/60 hover:text-[#FF5C00] transition-colors"
                        >
                          GitHub ↗
                        </a>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 font-mono text-xs text-white/60 hover:text-[#FF5C00] transition-colors"
                        >
                          LinkedIn ↗
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Key Projects */}
                {view === 'projects' && (
                  <motion.div
                    key="projects-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    <h2 className="font-display text-3xl md:text-4xl text-white mb-2 tracking-wide">
                      KEY PROJECTS
                    </h2>
                    <p className="text-white/50 text-xs font-mono mb-8 uppercase tracking-wider">
                      Selected Digital Works & Visual Systems
                    </p>

                    <div className="flex flex-col gap-6">
                      {/* Project 1: HOMESERVO */}
                      <div className="p-6 bg-white/5 border border-white/5 rounded-lg group hover:border-[#FF5C00]/40 transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-display text-xl text-white group-hover:text-[#FF5C00] transition-colors uppercase">
                            HOME-SERVO
                          </h3>
                          <a href="#" className="text-white/40 hover:text-white transition-colors">
                            <ExternalLink size={18} />
                          </a>
                        </div>
                        <p className="text-white/70 text-sm font-sans mb-4 leading-relaxed">
                          A full-stack home services booking platform that connects users with trusted professionals for plumbing, electrical, carpentry, cleaning, and other household services through an intuitive booking experience.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded text-white/60">React</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded text-white/60">Django</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded text-white/60">Django REST Framework</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded text-white/60">PostgreSQL</span>
                        </div>
                      </div>

                      {/* Project 2: XPRESSWASH */}
                      <div className="p-6 bg-white/5 border border-white/5 rounded-lg group hover:border-[#FF5C00]/40 transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-display text-xl text-white group-hover:text-[#FF5C00] transition-colors uppercase">
                            XPRESSWASH
                          </h3>
                          <a href="#" className="text-white/40 hover:text-white transition-colors">
                            <ExternalLink size={18} />
                          </a>
                        </div>
                        <p className="text-white/70 text-sm font-sans mb-4 leading-relaxed">
                          A modern car wash booking platform that streamlines service scheduling, customer management, and appointment workflows with seamless CRM integration for business operations.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded text-white/60">React</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded text-white/60">Supabase</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded text-white/60">Zoho CRM</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded text-white/60">JavaScript</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}



                {/* 4. Let's Work / Contact View */}
                {view === 'contact' && (
                  <motion.div
                    key="contact-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    <h2 className="font-display text-3xl md:text-4xl text-white mb-2 tracking-wide">
                      LET'S WORK
                    </h2>
                    <p className="text-white/60 text-sm mb-8 font-sans">
                      Start a custom project discussion or get in touch on socials below.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-mono text-sm">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-white/50 text-xs tracking-wider">YOUR NAME *</label>
                        <input
                          id="name"
                          type="text"
                          required
                          className="bg-transparent border-b border-white/20 focus:border-[#FF5C00] text-white py-2 focus:outline-none transition-colors duration-300 font-sans"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-white/50 text-xs tracking-wider">EMAIL ADDRESS *</label>
                        <input
                          id="email"
                          type="email"
                          required
                          className="bg-transparent border-b border-white/20 focus:border-[#FF5C00] text-white py-2 focus:outline-none transition-colors duration-300 font-sans"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="budget" className="text-white/50 text-xs tracking-wider">ESTIMATED BUDGET</label>
                        <div className="relative">
                          <select
                            id="budget"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full bg-transparent border-b border-white/20 focus:border-[#FF5C00] text-white py-2 focus:outline-none transition-colors duration-300 font-sans cursor-pointer appearance-none"
                          >
                            <option value="5k-10k" className="bg-[#222222]">Under $10,000</option>
                            <option value="10k-20k" className="bg-[#222222]">$10,000 – $20,000</option>
                            <option value="20k-50k" className="bg-[#222222]">$20,000 – $50,000</option>
                            <option value="50k+" className="bg-[#222222]">$50,000+</option>
                          </select>
                          <div className="absolute right-2 top-3 pointer-events-none text-[#FF5C00]">▼</div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className="text-white/50 text-xs tracking-wider">PROJECT DETAIL *</label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          className="bg-transparent border-b border-white/20 focus:border-[#FF5C00] text-white py-2 focus:outline-none transition-colors duration-300 font-sans resize-none"
                          placeholder="Tell us about your objectives..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-[#FF5C00] text-black font-semibold text-xs tracking-wider py-4 mt-4 rounded hover:bg-white hover:text-black transition-all duration-300 font-mono shadow-[0_0_15px_rgba(204,255,0,0.1)] cursor-pointer"
                      >
                        SUBMIT INQUIRY
                      </button>
                    </form>

                    {/* Socials Connection Block */}
                    <div className="mt-12 border-t border-white/5 pt-8">
                      <span className="font-mono text-xs text-white/40 tracking-wider block mb-4">GET IN TOUCH DIRECTLY</span>
                      <div className="grid grid-cols-2 gap-4">
                        {/* WhatsApp */}
                        <a
                          href="https://wa.me/1234567890"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg group transition-all duration-300 border border-white/5 hover:border-[#FF5C00]/40"
                        >
                          <svg className="w-5 h-5 text-white/60 group-hover:text-[#FF5C00]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.896 0c3.181.001 6.171 1.242 8.423 3.498 2.253 2.256 3.492 5.251 3.491 8.432-.003 6.574-5.329 11.9-11.898 11.9-.001 0-.001 0 0 0-2.003-.001-3.973-.505-5.717-1.464L0 24zm6.549-3.238c1.657.982 3.284 1.488 4.905 1.489 5.352 0 9.709-4.332 9.711-9.654.001-2.577-1.002-5.002-2.827-6.827C16.52 3.946 14.092 2.942 11.52 2.942c-5.351 0-9.71 4.333-9.712 9.656-.001 1.705.452 3.372 1.309 4.869l-.994 3.63 3.738-.98c1.423.774 2.826 1.155 4.745 1.155zm10.052-6.862c-.276-.139-1.636-.807-1.889-.9-.253-.093-.437-.139-.621.139-.184.277-.713.9-.874 1.085-.161.185-.322.208-.598.069-.276-.139-1.168-.43-2.223-1.373-.821-.733-1.376-1.638-1.537-1.916-.161-.277-.017-.427.121-.565.125-.124.276-.323.414-.485.139-.162.185-.277.276-.462.093-.185.047-.347-.023-.485-.069-.139-.621-1.499-.851-2.053-.223-.538-.47-.464-.648-.474l-.552-.01c-.19 0-.501.072-.763.356-.262.285-.999.977-.999 2.382s1.022 2.762 1.166 2.956c.143.195 2.012 3.072 4.874 4.31.681.295 1.213.47 1.627.601.684.217 1.307.186 1.8.113.548-.082 1.636-.669 1.866-1.316.23-.647.23-1.201.161-1.316-.069-.115-.253-.208-.529-.347z" />
                          </svg>
                          <span className="text-white/80 group-hover:text-white transition-colors text-xs">WhatsApp</span>
                        </a>

                        {/* Instagram */}
                        <a
                          href="https://instagram.com"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg group transition-all duration-300 border border-white/5 hover:border-[#FF5C00]/40"
                        >
                          <svg className="w-5 h-5 text-white/60 group-hover:text-[#FF5C00]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                          <span className="text-white/80 group-hover:text-white transition-colors text-xs">Instagram</span>
                        </a>

                        {/* GitHub */}
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg group transition-all duration-300 border border-white/5 hover:border-[#FF5C00]/40"
                        >
                          <svg className="w-5 h-5 text-white/60 group-hover:text-[#FF5C00]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          <span className="text-white/80 group-hover:text-white transition-colors text-xs">GitHub</span>
                        </a>

                        {/* LinkedIn */}
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg group transition-all duration-300 border border-white/5 hover:border-[#FF5C00]/40"
                        >
                          <svg className="w-5 h-5 text-white/60 group-hover:text-[#FF5C00]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                          <span className="text-white/80 group-hover:text-white transition-colors text-xs">LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
