import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdHome } from 'react-icons/md';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-0.5 flex items-center justify-center mb-6 shadow-2xl shadow-violet-500/20">
        <div className="w-full h-full bg-[#0b0f19] rounded-[14px] flex items-center justify-center font-black text-2xl text-white">
          404
        </div>
      </div>
      <h1 className="text-3xl font-extrabold text-white">Page Not Found</h1>
      <p className="text-slate-400 text-sm mt-2 max-w-sm">
        The gradient spectrum you're looking for doesn't exist or has moved.
      </p>
      <NavLink
        to="/"
        className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all shadow-lg shadow-violet-600/20"
      >
        <MdHome className="text-base" />
        <span>Return to Studio</span>
      </NavLink>
    </div>
  );
}

