import React from 'react';

interface HeaderProps {
  onCommissionClick: () => void;
  onArchiveClick: () => void;
  onProcessClick: () => void;
  onLabsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onCommissionClick,
  onArchiveClick,
  onProcessClick,
  onLabsClick
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-30 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center backdrop-blur-md bg-white/40 border-b border-black/5">
      {/* Logo Group */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <span className="font-display text-2xl md:text-3xl tracking-widest text-black">
          SHASHANK
        </span>
        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#CCFF00] text-black rounded-full flex items-center justify-center font-bold transition-transform duration-500 ease-out group-hover:rotate-180">
          <span className="text-lg md:text-xl">✦</span>
        </div>
      </div>

      {/* Navigation Links (Hidden on Mobile) */}
      <nav className="hidden md:flex items-center gap-3">
        <button
          onClick={onArchiveClick}
          className="font-mono text-[10px] md:text-xs font-semibold text-black bg-white/90 hover:bg-black hover:text-white px-5 py-2 border border-black/10 rounded-full transition-all duration-300 tracking-wider cursor-pointer shadow-xs"
        >
          ARCHIVE
        </button>
        <button
          onClick={onProcessClick}
          className="font-mono text-[10px] md:text-xs font-semibold text-black bg-white/90 hover:bg-black hover:text-white px-5 py-2 border border-black/10 rounded-full transition-all duration-300 tracking-wider cursor-pointer shadow-xs"
        >
          ABOUT ME
        </button>
        <button
          onClick={onLabsClick}
          className="font-mono text-[10px] md:text-xs font-semibold text-black bg-white/90 hover:bg-black hover:text-white px-5 py-2 border border-black/10 rounded-full transition-all duration-300 tracking-wider cursor-pointer shadow-xs"
        >
          LABS
        </button>
      </nav>

      {/* Action Button */}
      <button
        onClick={onCommissionClick}
        aria-label="Open commission drawer"
        className="font-mono text-xs font-bold bg-[#CCFF00] text-black px-6 py-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
      >
        CONNECT WITH ME
      </button>
    </header>
  );
};
