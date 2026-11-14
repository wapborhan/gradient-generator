import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  MdGradient, 
  MdOutlineSmartButton, 
  MdColorLens, 
  MdPalette,
  MdAutoAwesome
} from 'react-icons/md';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineColorSwatch } from 'react-icons/hi';
import confetti from 'canvas-confetti';
import { useToast } from './Toast';

const Navbar = ({ onRandomize }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRandomClick = () => {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.1, x: 0.8 },
      colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981'],
    });
    if (onRandomize) {
      onRandomize();
      showToast('Generated fresh random gradient! ✨');
    }
  };

  const navLinks = [
    {
      to: '/',
      label: 'Studio',
      icon: <MdGradient className="text-lg" />,
      exact: true,
    },
    {
      to: '/button',
      label: 'Buttons',
      icon: <MdOutlineSmartButton className="text-lg" />,
    },
    {
      to: '/background',
      label: 'Backgrounds',
      icon: <MdColorLens className="text-lg" />,
    },
    {
      to: '/palette',
      label: 'Harmonizer',
      icon: <MdPalette className="text-lg" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090d16]/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-indigo-500 p-0.5 shadow-lg shadow-violet-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center group-hover:bg-transparent transition-colors">
              <HiOutlineColorSwatch className="text-xl text-violet-400 group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-violet-300 bg-clip-text text-transparent">
                SR Gradient
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-violet-500/20 text-violet-400 border border-violet-500/30 rounded-md">
                v2.0
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium -mt-1 hidden sm:block">
              Modern CSS & Tailwind Studio
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          {navLinks.map((link) => {
            const isActive =
              link.to === '/'
                ? location.pathname === '/' || location.pathname === '/gradient-generator-react'
                : location.pathname === link.to;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRandomClick}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-fuchsia-600/20 hover:shadow-fuchsia-600/30 transition-all active:scale-95"
            title="Generate Random Gradient"
          >
            <MdAutoAwesome className="text-base animate-spin-slow" />
            <span className="hidden sm:inline">Randomize</span>
          </button>

          <a
            href="https://github.com/wapborhan/gradient-generator-react"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
            title="GitHub Repository"
          >
            <FaGithub className="text-lg" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800"
          >
            {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090d16] border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive =
              link.to === '/'
                ? location.pathname === '/' || location.pathname === '/gradient-generator-react'
                : location.pathname === link.to;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
