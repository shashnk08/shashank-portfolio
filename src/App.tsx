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
    <circle cx="10" cy="10" r="2" fill="#E5E5E5" />
    <circle cx="30" cy="10" r="2" fill="#E5E5E5" />
    <circle cx="50" cy="10" r="2" fill="#E5E5E5" />
    <circle cx="10" cy="30" r="2" fill="#E5E5E5" />
    <circle cx="30" cy="30" r="2" fill="#E5E5E5" />
    <circle cx="50" cy="30" r="2" fill="#E5E5E5" />
    <circle cx="10" cy="50" r="2" fill="#E5E5E5" />
    <circle cx="30" cy="50" r="2" fill="#E5E5E5" />
    <circle cx="50" cy="50" r="2" fill="#E5E5E5" />
    <circle cx="10" cy="70" r="2" fill="#E5E5E5" />
    <circle cx="30" cy="70" r="2" fill="#E5E5E5" />
    <circle cx="50" cy="70" r="2" fill="#E5E5E5" />
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-white text-black font-sans selection:bg-[#FF5C00] selection:text-black overflow-y-auto scroll-smooth">

      {/* 1. Background Division (Light Gray Polygon at Bottom of Hero) */}
      <div
        className="absolute top-0 left-0 right-0 h-screen bg-[#F5F5F5] pointer-events-none z-0"
        style={{ clipPath: 'polygon(0 80%, 100% 60%, 100% 100%, 0 100%)' }}
      />

      {/* 2. Background Outlined Text "BUILD" */}
      <div className="absolute top-[18%] right-[10%] font-display text-[15vw] leading-none text-transparent text-stroke-fade-dark uppercase select-none tracking-widest z-0 pointer-events-none">
        BUILD
      </div>

      {/* 3. Dot Grid Background Accent (Hero area only) */}
      <DotGrid className="absolute left-[45%] top-[40%] z-0 pointer-events-none opacity-80" />

      {/* 4. Subtle Crosshairs / Plus elements (Hero area only) */}
      <div className="absolute left-[55%] top-[55%] font-mono text-neutral-300 font-light select-none pointer-events-none text-2xl z-0">+</div>
      <div className="absolute right-[6%] top-[42%] font-mono text-neutral-300 font-light select-none pointer-events-none text-2xl z-0">+</div>

      {/* Z-30: Sticky Header */}
      <Header
        onCommissionClick={() => scrollToSection('contact')}
        onArchiveClick={() => scrollToSection('journey')}
        onProcessClick={() => scrollToSection('about')}
        onLabsClick={() => openDrawerWithView('projects')}
      />

      {/* ================= SECTION 1: HERO SECTION ================= */}
      <main id="home" className="min-h-screen w-full flex flex-col justify-end items-center relative z-20 px-6 sm:px-10 md:px-12 pt-28 pb-0 w-[92vw] max-w-[1500px] mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end">

          {/* Left Column: Software Engineer Copy & CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start text-left select-none z-20 pb-16 lg:pb-24">
            {/* Top Label */}
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-mono text-sm md:text-base tracking-widest text-neutral-600 font-extrabold mb-1"
            >
              // SOFTWARE ENGINEER
            </motion.span>

            {/* Title / Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="font-display leading-[0.82] text-black text-[64px] sm:text-[80px] md:text-[100px] lg:text-[108px] xl:text-[120px] uppercase flex flex-col font-black"
            >
              <span className="tracking-tighter text-neutral-950 font-black">ENGINEERED</span>
              <span className="tracking-tighter text-neutral-950 font-black">WITH</span>
              <span className="text-[#FF5C00] text-stroke-black tracking-normal text-[72px] sm:text-[90px] md:text-[115px] lg:text-[128px] xl:text-[145px] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.15)] mt-1">
                <ScrambleText text={headlinePhrases[headlineIndex]} />
              </span>
            </motion.h1>

            {/* Description Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="mt-6 text-neutral-600 font-sans text-sm md:text-base max-w-[520px] leading-relaxed font-semibold"
            >
              I’m Shashank — a software engineer crafting scalable digital products, clean interfaces, and purposeful user experiences.
            </motion.p>

            {/* Primary Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <button
                onClick={() => scrollToSection('about')}
                className="group flex items-center gap-4 bg-black text-white px-7 py-3.5 rounded-full hover:bg-neutral-800 transition-all duration-300 font-mono text-xs font-bold tracking-widest shadow-md cursor-pointer"
              >
                <span>VIEW MY WORK</span>
                <div className="w-6 h-6 rounded-full bg-[#FF5C00] flex items-center justify-center text-black group-hover:translate-x-1 transition-transform duration-300">
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
                href="https://github.com/shashnk08"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-black hover:border-black hover:shadow-md transition-all duration-300 shadow-xs"
              >
                <GithubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/shashank-g-s-a2b425225/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-black hover:border-black hover:shadow-md transition-all duration-300 shadow-xs"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://www.instagram.com/shashank_shettar08?igsh=MTExaTFyM2Q5Y2pndQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-black hover:border-black hover:shadow-md transition-all duration-300 shadow-xs"
              >
                <InstagramIcon />
              </a>
              <a
                href="mailto:shashankgs082004@gmail.com"
                className="w-10 h-10 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-black hover:border-black hover:shadow-md transition-all duration-300 shadow-xs"
              >
                <MailIcon />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Portrait, Accent shapes */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end items-end h-[75vh] lg:h-[88vh] min-h-[500px] lg:min-h-[680px] w-full select-none overflow-visible">

            {/* Top-Right Info Accent */}
            <div className="absolute top-[8%] right-[5%] z-20 font-mono text-[10px] sm:text-xs text-neutral-400 tracking-widest text-right select-none leading-relaxed hidden sm:block">
              <div>[ BASED IN INDIA ]</div>
              <div className="text-black font-semibold">28.6139° N, 77.2090° E</div>
              <div className="text-[#FF5C00] font-bold">UTC+05:30 // AVAILABLE</div>
            </div>

            {/* Neon Lime Asterisk shape behind portrait */}
            <img src="/asterisk.svg" alt="asterisk" className="absolute right-[15%] bottom-[28%] w-64 h-64 sm:w-80 sm:h-80 lg:w-[360px] lg:h-[360px] opacity-100 rotate-[12deg] z-0 pointer-events-none" />

            {/* The Main Portrait Image */}
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              src="/image copy.webp"
              alt="Shashank Portrait"
              className="relative z-10 h-[75vh] lg:h-[88vh] w-auto object-contain filter grayscale contrast-110 brightness-95 lg:mr-[10%]"
            />

          </div>

        </div>
      </main>

      {/* ================= SECTION 2: ABOUT HERO ================= */}
      <section id="about" className="py-14 sm:py-16 px-6 sm:px-12 md:px-20 lg:px-24 w-[92vw] max-w-[1500px] mx-auto z-20 relative border-t border-neutral-100 overflow-hidden">
        {/* Local Accents */}
        <DotGrid className="absolute right-[2%] top-[10%] z-0 pointer-events-none opacity-80" />
        <div className="absolute left-[10%] bottom-[10%] font-mono text-neutral-300 font-light select-none pointer-events-none text-2xl z-0">+</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <span className="font-mono text-base md:text-lg tracking-widest text-neutral-600 font-extrabold mb-1">
              // ABOUT ME
            </span>
            <h2 className="font-display leading-[0.85] text-black text-[50px] sm:text-[70px] md:text-[85px] lg:text-[100px] uppercase font-black tracking-tighter">
              BUILDING SYSTEMS<br />
              <span className="text-[#FF5C00]">WITH CLARITY</span>
            </h2>
            <p className="mt-8 text-neutral-800 font-sans text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed font-semibold">
              I’m Shashank — a software engineer focused on building scalable digital products, clean interfaces, and purposeful user experiences. My work sits at the intersection of backend engineering, frontend craft, and product thinking.
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-start h-full lg:text-right mt-6 lg:mt-12">
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 font-mono text-xs text-neutral-600 shadow-xs">
              <div>
                <span className="text-neutral-500 block mb-1 font-bold">LOCATION</span>
                <span className="text-black font-bold text-sm">INDIA</span>
              </div>
              <div className="border-t border-neutral-200/60 pt-3">
                <span className="text-neutral-500 block mb-1 font-bold">FOCUS AREAS</span>
                <span className="text-black font-bold text-sm block">BACKEND / FRONTEND / PRODUCT-MINDED</span>
              </div>
              <div className="border-t border-neutral-200/60 pt-3">
                <span className="text-neutral-500 block mb-1 font-bold">STATUS</span>
                <span className="text-[#FF5C00] font-bold text-sm">OPEN TO COLLABORATIONS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 3: WHO I AM (2-Column Editorial) ================= */}
      <section className="py-10 sm:py-12 px-6 sm:px-12 md:px-20 lg:px-24 w-[92vw] max-w-[1500px] mx-auto z-20 relative bg-neutral-50/50 rounded-3xl border border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h3 className="font-display text-3xl sm:text-4xl text-black font-black uppercase tracking-tight">
              WHO I AM
            </h3>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-6 text-neutral-800 font-sans text-base sm:text-lg leading-relaxed font-semibold max-w-3xl">
            <p>
              I’m an engineer who enjoys turning complex ideas into clean, usable products. My work spans backend systems with Django and REST APIs, frontend experiences with React and modern UI tooling, and product-focused engineering that balances performance, clarity, and usability.
            </p>
            <p>
              I care about building software that is not only functional, but intentional — systems that scale well, interfaces that feel polished, and products that solve real problems.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: WHAT I DO (Expertise Strip) ================= */}
      <section className="py-14 sm:py-16 px-6 sm:px-12 md:px-20 lg:px-24 w-[92vw] max-w-[1500px] mx-auto z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-neutral-100 pt-16">
          {/* Card 1 */}
          <div className="flex flex-col items-start p-2 hover:translate-y-[-4px] transition-transform duration-300">
            <span className="font-mono text-sm text-[#FF5C00] font-bold mb-3">// BACKEND</span>
            <h4 className="font-display text-xl sm:text-2xl font-black text-black uppercase mb-4">Backend Engineering</h4>
            <ul className="text-neutral-700 font-mono text-xs sm:text-sm flex flex-col gap-2.5">
              <li>• Django / Django REST Framework</li>
              <li>• PostgreSQL & Database architecture</li>
              <li>• Secure Authentication / API Systems</li>
              <li>• Performance-minded workflows</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-start p-2 hover:translate-y-[-4px] transition-transform duration-300 border-t md:border-t-0 md:border-l border-neutral-100 pt-8 md:pt-0 md:pl-8">
            <span className="font-mono text-sm text-[#FF5C00] font-bold mb-3">// FRONTEND</span>
            <h4 className="font-display text-xl sm:text-2xl font-black text-black uppercase mb-4">Frontend Development</h4>
            <ul className="text-neutral-700 font-mono text-xs sm:text-sm flex flex-col gap-2.5">
              <li>• React & modern state management</li>
              <li>• TypeScript / JavaScript logic</li>
              <li>• Tailwind CSS responsive design</li>
              <li>• Component-driven modular layouts</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-start p-2 hover:translate-y-[-4px] transition-transform duration-300 border-t md:border-t-0 md:border-l border-neutral-100 pt-8 md:pt-0 md:pl-8">
            <span className="font-mono text-sm text-[#FF5C00] font-bold mb-3">// CLOUD</span>
            <h4 className="font-display text-xl sm:text-2xl font-black text-black uppercase mb-4">Cloud & Deployment</h4>
            <ul className="text-neutral-700 font-mono text-xs sm:text-sm flex flex-col gap-2.5">
              <li>• Cloud hosting on AWS & DigitalOcean</li>
              <li>• Dockerized application deployment</li>
              <li>• Nginx, domains, and SSL setup</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: CORE STACK (Skills) ================= */}
      <section className="py-20 sm:py-24 px-6 sm:px-12 md:px-20 lg:px-24 w-[92vw] max-w-[1500px] mx-auto z-20 relative border-t border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <span className="font-mono text-sm md:text-base tracking-widest text-[#FF5C00] font-extrabold mb-1">
              // CORE STACK
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-black font-black uppercase tracking-tight">
              TOOLS I<br />BUILD WITH
            </h3>
          </div>

          {/* Grouped Skills columns */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Column 1: Languages & Frontend */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-mono text-xs text-neutral-600 font-extrabold block mb-1">LANGUAGES</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS'].map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-neutral-100 rounded text-neutral-700 text-xs font-mono">{s}</span>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <span className="font-mono text-xs text-neutral-600 font-extrabold block mb-1">FRONTEND</span>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'Tailwind CSS', 'Redux Toolkit', 'Vite'].map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-neutral-100 rounded text-neutral-700 text-xs font-mono">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Backend */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-mono text-xs text-neutral-600 font-extrabold block mb-1">BACKEND</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Django', 'Django REST', 'PostgreSQL', 'MySQL', 'Redis'].map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-neutral-100 rounded text-neutral-700 text-xs font-mono">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: DevOps & Other */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-mono text-xs text-neutral-600 font-extrabold block mb-1">DEVOPS & TOOLS</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Git', 'GitHub', 'Postman', 'Docker', 'AWS', 'Linux', 'Vercel', 'DigitalOcean'].map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-neutral-100 rounded text-neutral-700 text-xs font-mono">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: JOURNEY (Experience Timeline) ================= */}
      <section id="journey" className="py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-24 w-[92vw] max-w-[1500px] mx-auto z-20 relative border-t border-neutral-100 overflow-hidden">
        {/* Local Accents */}
        <DotGrid className="absolute left-[3%] bottom-[20%] z-0 pointer-events-none opacity-80" />
        <div className="absolute right-[12%] top-[20%] font-mono text-neutral-300 font-light select-none pointer-events-none text-2xl z-0">+</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <span className="font-mono text-sm md:text-base tracking-widest text-[#FF5C00] font-extrabold mb-1">
              // JOURNEY
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-black font-black uppercase tracking-tight">
              WHAT I’VE BEEN<br />BUILDING
            </h3>
          </div>

          {/* Timeline Cards */}
          <div className="lg:col-span-8 flex flex-col gap-10 border-l border-neutral-100 pl-6 sm:pl-8 md:pl-12 ml-2">
            {/* Item 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] md:-left-[55px] top-1.5 w-3 h-3 rounded-full bg-[#FF5C00] border-2 border-white shadow-sm" />
              <span className="font-mono text-xs text-neutral-600 font-extrabold block mb-0.5">2026 – PRESENT</span>
              <h4 className="font-display text-xl sm:text-2xl text-black font-black uppercase">Stalight Technologies</h4>
              <span className="font-mono text-sm text-[#FF5C00] font-extrabold block mb-2">Software Engineer </span>
              <ul className="text-neutral-600 font-sans text-sm leading-relaxed flex flex-col gap-2 font-semibold">
                <li>• Designed robust API endpoints and application workflows using Django and REST Framework.</li>
                <li>• Iterated on product frontends using React to deliver responsive, interactive modules.</li>
                <li>• Managed deployment pipelines, testing cycles, and active production code releases.</li>
              </ul>
            </div>

            {/* Item 2 */}
            <div className="relative border-t border-neutral-100 pt-10">
              <div className="absolute -left-[31px] sm:-left-[39px] md:-left-[55px] top-[46px] w-3 h-3 rounded-full bg-neutral-300 border-2 border-white shadow-sm" />
              <span className="font-mono text-xs text-neutral-600 font-extrabold block mb-0.5">INDEPENDENT</span>
              <h4 className="font-display text-xl sm:text-2xl text-black font-black uppercase">Projects & builds</h4>
              <span className="font-mono text-sm text-neutral-500 font-extrabold block mb-2">Full-Stack Experimenter</span>
              <p className="text-neutral-600 font-sans text-sm leading-relaxed font-semibold">
                Built and hosted application, portfolio projects. Focused on marrying complex database states with clean, user-friendly frontend designs.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ================= SECTION 8: PERSONAL NOTE ================= */}
      <section className="py-24 px-6 sm:px-12 md:px-20 lg:px-24 w-[92vw] max-w-[1500px] mx-auto z-20 relative">
        <div className="border-t border-neutral-100 pt-16">
          <div className="flex flex-col items-start">
            <span className="font-mono text-sm text-[#FF5C00] font-extrabold mb-1">// PERSONAL NOTE</span>
            <h3 className="font-display text-2xl sm:text-3xl text-black font-black uppercase mb-4">Beyond the code</h3>
            <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed font-semibold max-w-3xl">
              When I’m not building, you’ll probably find me sketching, cooking, catching up on sleep, or just enjoying life outside the screen.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 8.5: IMAGE ================= */}
      <div className="w-full z-20 relative pb-12" style={{ paddingLeft: '2in' }}>
        <img 
          src="/image.webp" 
          alt="Shashank Illustration" 
          className="max-w-[400px] w-full h-auto object-contain rounded-lg"
        />
      </div>

      {/* ================= SECTION 9: CTA FOOTER ================= */}
      <section id="contact" className="pt-24 pb-12 px-6 sm:px-12 md:px-20 lg:px-24 bg-neutral-950 text-white z-20 relative w-full border-t border-neutral-800">
        <div className="w-[92vw] max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <span className="font-mono text-sm tracking-widest text-[#FF5C00] font-extrabold mb-1">
              // LET'S CONNECT
            </span>
            <h2 className="font-display leading-[0.85] text-white text-[45px] sm:text-[60px] md:text-[80px] lg:text-[90px] xl:text-[100px] uppercase font-black tracking-tighter">
              LET’S BUILD<br />
              <span className="text-[#FF5C00]">SOMETHING MEANINGFUL</span>
            </h2>
            <p className="mt-6 text-neutral-400 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
              If you’re working on a product, platform, or idea that needs thoughtful engineering and clean execution, I’d love to connect and see how I can help.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4 w-full">
            <a
              href="mailto:shashankgs082004@gmail.com"
              className="bg-[#FF5C00] text-black font-mono font-bold text-xs tracking-widest text-center px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto lg:w-full max-w-xs shadow-md"
            >
              LET'S TALK
            </a>
            <button
              onClick={() => openDrawerWithView('projects')}
              className="bg-transparent border border-white/20 text-white font-mono font-bold text-xs tracking-widest text-center px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto lg:w-full max-w-xs"
            >
              VIEW PROJECTS
            </button>
          </div>
        </div>

        <div className="w-[92vw] max-w-[1500px] mx-auto border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 font-mono text-[10px]">
          <span>© 2026 SHASHANK G S. ALL INTENT PRESERVED.</span>
          <div className="flex gap-4">
            <a href="https://github.com/shashnk08" className="hover:text-white transition-colors">GITHUB</a>
            <a href="https://www.linkedin.com/in/shashank-g-s-a2b425225/" className="hover:text-white transition-colors">LINKEDIN</a>
          </div>
        </div>
      </section>

      {/* Z-50: Sliding drawer */}
      <InfoDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} initialView={drawerView} />
    </div>
  );
}
