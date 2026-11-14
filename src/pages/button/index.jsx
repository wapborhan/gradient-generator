import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  MdOutlineContentCopy, 
  MdCheck, 
  MdSearch,
  MdAutoAwesome,
  MdTouchApp
} from 'react-icons/md';
import { useToast } from '../../components/Toast';
import HOVER_BUTTON from '../../data/buttonData';

export default function ButtonPage() {
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = useState(null);
  const [copiedType, setCopiedType] = useState(''); // 'css' or 'tailwind'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Vibrant', 'Ocean', 'Sunset', 'Dark', 'Neon', 'Pastel'];

  const filteredButtons = HOVER_BUTTON.filter((btn) => {
    const matchesCategory =
      selectedCategory === 'All' || btn.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      btn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      btn.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (btn, type) => {
    const textToCopy =
      type === 'css'
        ? `background-image: ${btn.code};`
        : btn.tailwind;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(btn.id);
    setCopiedType(type);
    showToast(`Copied ${type.toUpperCase()} for "${btn.name}"!`);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedType('');
    }, 2000);
  };

  const handleButtonClick = (e, btn) => {
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { x, y },
    });
    showToast(`Clicked "${btn.text}"! Ready to use.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <span>Gradient Buttons Showroom</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
              {HOVER_BUTTON.length} Presets
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Copy-paste high-converting gradient buttons with shimmer hover effects, glow shadows, and responsive Tailwind classes.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Search buttons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs placeholder-slate-500 outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      {/* Categories Filter Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredButtons.map((btn) => {
          const isCopiedCss = copiedId === btn.id && copiedType === 'css';
          const isCopiedTailwind = copiedId === btn.id && copiedType === 'tailwind';

          return (
            <div
              key={btn.id}
              className="group rounded-2xl border border-slate-800/90 bg-[#0d1322] hover:border-violet-500/40 p-5 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-violet-950/20 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white tracking-wide">
                  {btn.name}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {btn.category}
                </span>
              </div>

              {/* Live Interactive Button Preview Container */}
              <div className="py-6 flex items-center justify-center">
                <button
                  onClick={(e) => handleButtonClick(e, btn)}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-white text-sm shadow-lg tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-95 btn-gradient-shift relative overflow-hidden group/btn"
                  style={{ background: btn.code }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    <MdTouchApp className="text-base opacity-75 group-hover/btn:opacity-100 transition-opacity" />
                    <span>{btn.text}</span>
                  </span>
                </button>
              </div>

              {/* Code Snippet Box */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2.5">
                <div className="rounded-lg bg-slate-950 p-2 font-mono text-[10px] text-slate-400 truncate">
                  {btn.code}
                </div>

                {/* Copy Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCopy(btn, 'css')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 border transition-all ${
                      isCopiedCss
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {isCopiedCss ? (
                      <>
                        <MdCheck className="text-sm" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <MdOutlineContentCopy className="text-xs text-slate-400" />
                        <span>CSS</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleCopy(btn, 'tailwind')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 border transition-all ${
                      isCopiedTailwind
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {isCopiedTailwind ? (
                      <>
                        <MdCheck className="text-sm" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <MdOutlineContentCopy className="text-xs text-slate-400" />
                        <span>Tailwind</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
