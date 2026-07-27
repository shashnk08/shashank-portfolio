import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onHomeClick: () => void;
  onCommissionClick: () => void;
  onArchiveClick: () => void;
  onProcessClick: () => void;
  onLabsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onHomeClick,
  onCommissionClick,
  onArchiveClick,
  onProcessClick,
  onLabsClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Use capture phase to catch scrolls on any container, like the main app wrapper
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true } as any);
    };
  }, [isMenuOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMobileNav = (action: () => void) => {
    setIsMenuOpen(false);
    action();
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center backdrop-blur-md bg-white/40">
      {/* Logo Group */}
      <div className="flex items-center gap-3 group cursor-pointer" onClick={onHomeClick}>
        <span className="font-display text-2xl md:text-3xl tracking-widest text-black">
          SHASHANK G S
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-3">
        <button
          onClick={onHomeClick}
          className="font-mono text-[10px] md:text-xs font-semibold text-black bg-white/90 hover:bg-black hover:text-white px-5 py-2 border border-black/10 rounded-full transition-all duration-300 tracking-wider cursor-pointer shadow-xs"
        >
          HOME
        </button>
        <button
          onClick={onProcessClick}
          className="font-mono text-[10px] md:text-xs font-semibold text-black bg-white/90 hover:bg-black hover:text-white px-5 py-2 border border-black/10 rounded-full transition-all duration-300 tracking-wider cursor-pointer shadow-xs"
        >
          ABOUT ME
        </button>
        <button
          onClick={onArchiveClick}
          className="font-mono text-[10px] md:text-xs font-semibold text-black bg-white/90 hover:bg-black hover:text-white px-5 py-2 border border-black/10 rounded-full transition-all duration-300 tracking-wider cursor-pointer shadow-xs"
        >
          JOURNEY
        </button>
        <button
          onClick={onLabsClick}
          className="font-mono text-[10px] md:text-xs font-semibold text-black bg-white/90 hover:bg-black hover:text-white px-5 py-2 border border-black/10 rounded-full transition-all duration-300 tracking-wider cursor-pointer shadow-xs"
        >
          PROJECTS
        </button>
      </nav>

      {/* Action Button & Hamburger Container */}
      <div className="flex items-center gap-4">
        {/* Desktop Connect Button */}
        <button
          onClick={onCommissionClick}
          aria-label="Open commission drawer"
          className="hidden md:block font-mono text-xs font-bold bg-[#FF5C00] text-white px-6 py-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
        >
          CONNECT WITH ME
        </button>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 bg-white/90 border border-black/10 rounded-full z-50 cursor-pointer shadow-xs relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`bg-black block transition-all duration-300 ease-out h-[2px] w-4 rounded-sm absolute ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
          <span className={`bg-black block transition-all duration-300 ease-out h-[2px] w-4 rounded-sm absolute ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-black block transition-all duration-300 ease-out h-[2px] w-4 rounded-sm absolute ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[100%] left-0 w-full bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-xl flex flex-col md:hidden py-6 px-6 gap-3 z-40"
          >
            <button
              onClick={() => handleMobileNav(onHomeClick)}
              className="font-mono text-sm font-semibold text-white bg-black hover:bg-neutral-800 py-3 rounded-full transition-all text-center tracking-widest shadow-xs"
            >
              HOME
            </button>
            <button
              onClick={() => handleMobileNav(onProcessClick)}
              className="font-mono text-sm font-semibold text-white bg-black hover:bg-neutral-800 py-3 rounded-full transition-all text-center tracking-widest shadow-xs"
            >
              ABOUT ME
            </button>
            <button
              onClick={() => handleMobileNav(onArchiveClick)}
              className="font-mono text-sm font-semibold text-white bg-black hover:bg-neutral-800 py-3 rounded-full transition-all text-center tracking-widest shadow-xs"
            >
              JOURNEY
            </button>
            <button
              onClick={() => handleMobileNav(onLabsClick)}
              className="font-mono text-sm font-semibold text-white bg-black hover:bg-neutral-800 py-3 rounded-full transition-all text-center tracking-widest shadow-xs"
            >
              PROJECTS
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
