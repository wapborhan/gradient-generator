import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdOutlineContentCopy, 
  MdCheck, 
  MdFullscreen, 
  MdFullscreenExit,
  MdTune,
  MdSearch 
} from 'react-icons/md';
import { useToast } from '../../components/Toast';
import BACKGROUND_DATA from '../../data/backgroundData';
import { buildTailwindClass } from '../../utils/gradientUtils';

export default function BackgroundPage({ onSelectGradientForStudio }) {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [copiedType, setCopiedType] = useState('');
  const [fullscreenGrad, setFullscreenGrad] = useState(null);

  const categories = ['All', 'Sunset', 'Ocean', 'Neon', 'Pastel', 'Vibrant', 'Dark'];

  const filteredData = BACKGROUND_DATA.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCopy = (item, type) => {
    const textToCopy =
      type === 'css'
        ? `background-image: ${item.code};`
        : buildTailwindClass(item.code);

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setCopiedType(type);
    showToast(`Copied ${type.toUpperCase()} for "${item.name}"!`);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedType('');
    }, 2000);
  };

  const handleOpenInStudio = (item) => {
    if (onSelectGradientForStudio) {
      onSelectGradientForStudio(item.code);
    }
    navigate('/');
    showToast(`Loaded "${item.name}" into Studio! 🎨`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <span>Curated Backgrounds Gallery</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {BACKGROUND_DATA.length} Presets
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse and inspect high-resolution gradient backgrounds. Click "Edit in Studio" to customize any preset.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Search backgrounds..."
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

      {/* Grid of Gradients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((item) => {
          const isCopiedCss = copiedId === item.id && copiedType === 'css';
          const isCopiedTailwind = copiedId === item.id && copiedType === 'tailwind';

          return (
            <div
              key={item.id}
              className="group rounded-2xl border border-slate-800/90 bg-[#0d1322] hover:border-violet-500/40 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Visual Gradient Swatch */}
              <div
                className="relative h-48 w-full cursor-pointer overflow-hidden"
                style={{ background: item.code }}
                onClick={() => setFullscreenGrad(item)}
              >
                {/* Hover overlay with quick preview button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFullscreenGrad(item);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-xs font-semibold border border-white/20 shadow-lg transition-all"
                  >
                    <MdFullscreen className="text-base" />
                    <span>Fullscreen</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenInStudio(item);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg transition-all"
                  >
                    <MdTune className="text-sm" />
                    <span>Edit in Studio</span>
                  </button>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md border border-white/10">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">{item.name}</h3>
                  <button
                    onClick={() => handleOpenInStudio(item)}
                    className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <MdTune className="text-sm" />
                    <span>Customize</span>
                  </button>
                </div>

                {/* Code display */}
                <div className="rounded-lg bg-slate-950 p-2 font-mono text-[10px] text-slate-400 truncate border border-slate-900">
                  {item.code}
                </div>

                {/* Copy Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleCopy(item, 'css')}
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
                        <span>Copy CSS</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleCopy(item, 'tailwind')}
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

      {/* Fullscreen Preview Modal */}
      {fullscreenGrad && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 transition-all duration-300"
          style={{ background: fullscreenGrad.code }}
        >
          <div className="w-full max-w-5xl flex items-center justify-between">
            <div className="px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md text-white text-xs font-mono border border-white/10 shadow-2xl">
              <span>Fullscreen Preview: {fullscreenGrad.name}</span>
            </div>
            <button
              onClick={() => setFullscreenGrad(null)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-2xl transition-all"
            >
              <MdFullscreenExit className="text-base" />
              <span>Exit Fullscreen</span>
            </button>
          </div>

          <div className="text-center p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 max-w-xl text-white shadow-2xl space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">{fullscreenGrad.name}</h2>
            <p className="text-xs font-mono text-slate-300 break-all">{fullscreenGrad.code}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                handleOpenInStudio(fullscreenGrad);
                setFullscreenGrad(null);
              }}
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-2xl transition-colors"
            >
              Open in Studio
            </button>
            <button
              onClick={() => handleCopy(fullscreenGrad, 'css')}
              className="px-6 py-2.5 rounded-xl bg-white text-slate-950 text-xs font-bold shadow-2xl hover:bg-slate-100 transition-colors"
            >
              Copy CSS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
