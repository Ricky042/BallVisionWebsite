
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 lg:px-20 py-8 relative z-20">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-background-dark font-bold">analytics</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tighter uppercase italic">
          BallVision<span className="text-primary text-xs ml-1 not-italic tracking-widest font-black">AI</span>
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] hidden sm:block">
          Secure Session Active
        </span>
        <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
        <button className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
          Support
        </button>
      </div>
    </header>
  );
};

export default Header;
