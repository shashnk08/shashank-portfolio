import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { InfoDrawer } from './components/InfoDrawer';
import { ScrambleText } from './components/ScrambleText';

// Custom inline SVG icons for socials
const GithubIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// Custom SVG Dot Grid component
const DotGrid: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="2" fill="#E2E2E2" />
    <circle cx="30" cy="10" r="2" fill="#E2E2E2" />
    <circle cx="50" cy="10" r="2" fill="#E2E2E2" />
    <circle cx="10" cy="30" r="2" fill="#E2E2E2" />
    <circle cx="30" cy="30" r="2" fill="#E2E2E2" />
    <circle cx="50" cy="30" r="2" fill="#E2E2E2" />
    <circle cx="10" cy="50" r="2" fill="#E2E2E2" />
    <circle cx="30" cy="50" r="2" fill="#E2E2E2" />
    <circle cx="50" cy="50" r="2" fill="#E2E2E2" />
    <circle cx="10" cy="70" r="2" fill="#E2E2E2" />
    <circle cx="30" cy="70" r="2" fill="#E2E2E2" />
    <circle cx="50" cy="70" r="2" fill="#E2E2E2" />
  </svg>
);

// Custom SVG Neon Lime Asterisk shape
const LimeAsterisk: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="44" y="10" width="12" height="80" rx="6" fill="#CCFF00" transform="rotate(0 50 50)" />
    <rect x="44" y="10" width="12" height="80" rx="6" fill="#CCFF00" transform="rotate(45 50 50)" />
    <rect x="44" y="10" width="12" height="80" rx="6" fill="#CCFF00" transform="rotate(90 50 50)" />
    <rect x="44" y="10" width="12" height="80" rx="6" fill="#CCFF00" transform="rotate(135 50 50)" />
  </svg>
);

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState<'menu' | 'about' | 'projects' | 'contact'>('menu');
  const [headlineIndex, setHeadlineIndex] = useState(0);

  const headlinePhrases = ['INTENT', 'CREATIVITY', 'IMPACT', 'PURPOSE'];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlinePhrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const openDrawerWithView = (view: 'menu' | 'about' | 'projects' | 'contact') => {
    setDrawerView(view);
    setIsDrawerOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-white text-black font-sans selection:bg-[#CCFF00] selection:text-black">
      
      {/* 1. Background Division (Light Gray Polygon at Bottom) */}
      <div 
        className="absolute inset-0 bg-[#F5F5F5] pointer-events-none z-0" 
        style={{ clipPath: 'polygon(0 80%, 100% 60%, 100% 100%, 0 100%)' }} 
      />

      {/* 2. Background Outlined Text "BUILD" */}
      <div className="absolute top-[18%] right-[10%] font-display text-[15vw] leading-none text-transparent text-stroke-fade-dark uppercase select-none tracking-widest z-0 pointer-events-none">
        BUILD
      </div>

      {/* 3. Dot Grid Background Accents */}
      <DotGrid className="absolute left-[45%] top-[40%] z-0 pointer-events-none opacity-80" />
      <DotGrid className="absolute right-[2%] bottom-[28%] z-0 pointer-events-none opacity-80" />

      {/* 4. Subtle Crosshairs / Plus elements */}
      <div className="absolute left-[55%] top-[55%] font-mono text-neutral-300 font-light select-none pointer-events-none text-2xl z-0">+</div>
      <div className="absolute right-[6%] top-[42%] font-mono text-neutral-300 font-light select-none pointer-events-none text-2xl z-0">+</div>

      {/* Z-30: Sticky Header */}
      <Header 
        onCommissionClick={() => openDrawerWithView('contact')}
        onArchiveClick={() => openDrawerWithView('projects')}
        onProcessClick={() => openDrawerWithView('about')}
        onLabsClick={() => openDrawerWithView('projects')}
      />

      {/* Main content container */}
      <main className="flex-1 flex flex-col justify-center items-center relative z-20 px-6 sm:px-12 md:px-20 lg:px-24 pt-28 pb-20 w-full max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Software Engineer Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left select-none z-20">
            {/* Top Label */}
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-mono text-xs md:text-sm tracking-widest text-neutral-500 font-bold mb-4"
            >
              // SOFTWARE ENGINEER
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="font-display leading-none text-black text-[12vw] sm:text-[60px] md:text-[80px] lg:text-[90px] xl:text-[100px] uppercase flex flex-col font-black"
            >
              <span className="tracking-tight text-neutral-950">ENGINEERED WITH</span>
              <span className="text-[#CCFF00] text-stroke-black tracking-normal drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.15)] -mt-2 sm:-mt-4">
                <ScrambleText text={headlinePhrases[headlineIndex]} />
              </span>
            </motion.h1>

            {/* Description Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="mt-6 text-neutral-600 font-sans text-sm md:text-base max-w-lg leading-relaxed font-medium"
            >
              I’m Shashank — a software engineer crafting scalable digital products, clean interfaces, and purposeful user experiences.
            </motion.p>

            {/* Primary Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <button 
                onClick={() => openDrawerWithView('projects')}
                className="group flex items-center gap-4 bg-black text-white px-6 py-3 rounded-full hover:bg-neutral-800 transition-all duration-300 font-mono text-xs font-bold tracking-widest shadow-md cursor-pointer"
              >
                <span>VIEW MY WORK</span>
                <div className="w-6 h-6 rounded-full bg-[#CCFF00] flex items-center justify-center text-black group-hover:translate-x-1 transition-transform duration-300">
                  <span className="text-sm font-bold">→</span>
                </div>
              </button>
            </motion.div>

            {/* Social Icons row */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex items-center gap-3"
            >
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-black hover:border-black hover:shadow-md transition-all duration-300 shadow-xs"
              >
                <GithubIcon />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-black hover:border-black hover:shadow-md transition-all duration-300 shadow-xs"
              >
                <LinkedinIcon />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-black hover:border-black hover:shadow-md transition-all duration-300 shadow-xs"
              >
                <InstagramIcon />
              </a>
              <a 
                href="mailto:contact@example.com"
                className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-black hover:border-black hover:shadow-md transition-all duration-300 shadow-xs"
              >
                <MailIcon />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Portrait, Accent shapes, Handwriting accent & Floating card */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-end h-[60vh] lg:h-[75vh] min-h-[450px] lg:min-h-[580px] w-full select-none">
            
            {/* Neon Lime Asterisk shape behind portrait */}
            <LimeAsterisk className="absolute right-[2%] bottom-[35%] w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 opacity-100 rotate-[15deg] z-0" />

            {/* The Main Portrait Image */}
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              src="/image copy.png"
              alt="Shashank Portrait"
              className="relative z-10 h-[60vh] sm:h-[70vh] lg:h-[82vh] w-auto object-contain filter grayscale contrast-110 brightness-95"
            />

          </div>

        </div>
      </main>

      {/* Z-50: Sliding drawer */}
      <InfoDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} initialView={drawerView} />
    </div>
  );
}
