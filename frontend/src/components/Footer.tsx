
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 px-6 lg:px-20 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <p className="text-[10px] text-white/40 tracking-widest uppercase font-bold">
          © 2024 BallVision AI Systems / Core Intelligence Division
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/50 hover:text-primary transition-colors" href="#">
            System Status
          </a>
          <a className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/50 hover:text-primary transition-colors" href="#">
            Security Protocols
          </a>
          <a className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/50 hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
