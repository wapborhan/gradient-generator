import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chroma from 'chroma-js';
import confetti from 'canvas-confetti';
import { 
  MdOutlineContentCopy, 
  MdCheck, 
  MdAutoAwesome, 
  MdTune,
  MdColorLens 
} from 'react-icons/md';
import { useToast } from '../../components/Toast';
import { checkContrast, buildTailwindClass } from '../../utils/gradientUtils';

export default function PalettePage({ onSelectGradientForStudio }) {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [seedColor, setSeedColor] = useState('#6366f1');
  const [copiedKey, setCopiedKey] = useState(null);

  // Generate color harmonies based on seedColor
  const generateHarmonies = () => {
    try {
      const base = chroma(seedColor);

      // 1. Complementary (180deg hue shift)
      const compColor = base.set('hsl.h', '+180').hex();
      const complementary = [seedColor, compColor];

      // 2. Analogous (±30deg)
      const ana1 = base.set('hsl.h', '-35').hex();
      const ana2 = base.set('hsl.h', '+35').hex();
      const analogous = [ana1, seedColor, ana2];

      // 3. Triadic (120deg shifts)
      const tri1 = base.set('hsl.h', '+120').hex();
      const tri2 = base.set('hsl.h', '+240').hex();
      const triadic = [seedColor, tri1, tri2];

      // 4. Monochromatic / Luminance scale
      const monoScale = chroma.scale([base.brighten(1.5), base.darken(2)]).colors(3);

      // 5. Warm / Cool Tension
      const tension1 = base.saturate(1.5).hex();
      const tension2 = base.set('hsl.h', '+90').brighten(0.8).hex();
      const tension = [seedColor, tension1, tension2];

      // 6. Cyber Glow (LCH scale with high saturation)
      const cyberScale = chroma.scale([seedColor, chroma(seedColor).set('hsl.h', '+150')]).mode('lch').colors(3);

      return [
        {
          id: 'analogous',
          name: 'Analogous Harmony',
          description: 'Smooth, natural transitions with adjacent color wheel hues',
          colors: analogous,
          code: `linear-gradient(135deg, ${analogous.join(', ')})`,
        },
        {
          id: 'complementary',
          name: 'High-Contrast Complementary',
          description: 'Bold visual vibration from opposite color spectrum points',
          colors: complementary,
          code: `linear-gradient(135deg, ${complementary.join(', ')})`,
        },
        {
          id: 'triadic',
          name: 'Balanced Triadic',
          description: 'Vibrant and richly balanced three-way color harmony',
          colors: triadic,
          code: `linear-gradient(135deg, ${triadic.join(', ')})`,
        },
        {
          id: 'monochromatic',
          name: 'Monochromatic Depth',
          description: 'Single-hue luminance progression for subtle elegance',
          colors: monoScale,
          code: `linear-gradient(135deg, ${monoScale.join(', ')})`,
        },
        {
          id: 'cyber',
          name: 'LCH Chroma Glow',
          description: 'Mathematically uniform perceptual lightness with zero grey-out',
          colors: cyberScale,
          code: `linear-gradient(135deg, ${cyberScale.join(', ')})`,
        },
        {
          id: 'tension',
          name: 'Chromatic Tension',
          description: 'Dynamic saturation and warm/cool contrast balance',
          colors: tension,
          code: `linear-gradient(135deg, ${tension.join(', ')})`,
        },
      ];
    } catch (e) {
      return [];
    }
  };

  const harmonies = generateHarmonies();

  const handleRandomSeed = () => {
    const randomHex = chroma.random().hex();
    setSeedColor(randomHex);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.3 },
    });
    showToast('Generated fresh seed color!');
  };

  const handleCopy = (item) => {
    navigator.clipboard.writeText(`background-image: ${item.code};`);
    setCopiedKey(item.id);
    showToast(`Copied CSS for ${item.name}!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleOpenStudio = (item) => {
    if (onSelectGradientForStudio) {
      onSelectGradientForStudio(item.code);
    }
    navigate('/');
    showToast(`Transferred ${item.name} to Studio!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <span>Color Harmonizer</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
              Color Science
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pick a seed color to automatically calculate mathematically harmonized gradients using Chroma color science.
          </p>
        </div>

        {/* Seed Color Selector */}
        <div className="flex items-center gap-3 bg-[#0d1322] border border-slate-800 p-2.5 rounded-2xl shadow-xl">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="color"
              value={seedColor}
              onChange={(e) => setSeedColor(e.target.value)}
              className="w-10 h-10 rounded-xl shadow-inner border border-white/20"
            />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400">Seed Color</span>
              <span className="font-mono text-xs font-bold text-white">{seedColor.toUpperCase()}</span>
            </div>
          </label>

          <button
            onClick={handleRandomSeed}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95"
          >
            <MdAutoAwesome className="text-sm" />
            <span>Random Seed</span>
          </button>
        </div>
      </div>

      {/* Harmonies Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {harmonies.map((item) => {
          const isCopied = copiedKey === item.id;

          return (
            <div
              key={item.id}
              className="group rounded-2xl border border-slate-800/90 bg-[#0d1322] hover:border-violet-500/40 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Preview Gradient Swatch */}
              <div
                className="h-44 w-full relative flex items-end p-4 transition-transform duration-300"
                style={{ background: item.code }}
              >
                {/* Palette color chips */}
                <div className="flex gap-1.5 p-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
                  {item.colors.map((c, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-lg shadow-inner border border-white/20"
                      style={{ background: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-white text-base tracking-wide">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-950 p-2 font-mono text-[10px] text-slate-400 truncate border border-slate-900">
                  {item.code}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleCopy(item)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                      isCopied
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {isCopied ? (
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
                    onClick={() => handleOpenStudio(item)}
                    className="py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 hover:text-white transition-all"
                  >
                    <MdTune className="text-sm" />
                    <span>Open in Studio</span>
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

