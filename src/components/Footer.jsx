import React from "react";
import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#070a12]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 p-0.5 flex items-center justify-center">
              <HiOutlineColorSwatch className="text-white text-lg" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">
                SR Gradient Studio
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-violet-900/50 text-violet-300 border border-violet-700/50">
                v2.0.0
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                The modern gradient design toolkit for developers & designers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Crafted with</span>
            <FaHeart className="text-rose-500 text-xs animate-pulse" />
            <span>by</span>
            <a
              href="https://www.wapborhan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 font-semibold underline decoration-violet-500/40 hover:decoration-violet-400 transition-colors"
            >
              Borhan Uddin
            </a>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              © {currentYear} All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
              ⚡ Vite + React 18 + Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
