import React, { useState, useEffect, useRef } from 'react';
import chroma from 'chroma-js';
import confetti from 'canvas-confetti';
import { 
  MdOutlineContentCopy, 
  MdCheck, 
  MdAutoAwesome, 
  MdFullscreen, 
  MdFullscreenExit,
  MdSwapHoriz,
  MdAdd,
  MdDeleteOutline,
  MdDownload,
  MdTune,
  MdColorize
} from 'react-icons/md';
import { 
  FaArrowUp, 
  FaArrowRight, 
  FaArrowDown, 
  FaArrowLeft 
} from 'react-icons/fa';
import { useToast } from '../../components/Toast';
import { 
  buildGradientCss, 
  buildTailwindClass, 
  buildSvgCode, 
  generateRandomHarmoniousGradient,
  PRESET_THEMES,
  checkContrast 
} from '../../utils/gradientUtils';

export default function Home({ externalGradient }) {
  const { showToast } = useToast();

  // Gradient configuration
  const [gradientType, setGradientType] = useState('linear-gradient');
  const [angle, setAngle] = useState(135);
  const [radialShape, setRadialShape] = useState('circle');
  const [radialPosition, setRadialPosition] = useState('center');

  // Color Stops (minimum 2 stops)
  const [stops, setStops] = useState([
    { id: 'stop-1', color: '#ff2600', position: 0 },
    { id: 'stop-2', color: '#7c3aed', position: 50 },
    { id: 'stop-3', color: '#00d2ff', position: 100 },
  ]);

  // Preview options
  const [previewMode, setPreviewMode] = useState('canvas'); // 'canvas' | 'text' | 'card' | 'button'
  const [overlayPattern, setOverlayPattern] = useState('none'); // 'none' | 'dots' | 'grid'
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Chroma smooth interpolation mode
  const [chromaMode, setChromaMode] = useState('none'); // 'none' | 'lch' | 'lab' | 'hsl'

  // Code export tab
  const [exportFormat, setExportFormat] = useState('css'); // 'css' | 'tailwind' | 'svg'
  const [hasCopied, setHasCopied] = useState(false);

  // If navigated from background presets with custom gradient
  useEffect(() => {
    if (externalGradient) {
      applyPresetFromCode(externalGradient);
    }
  }, [externalGradient]);

  // Escape key listener for fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Quick Direction Presets for Linear
  const directionPresets = [
    { label: 'To Top', angle: 0, icon: <FaArrowUp /> },
    { label: 'To Top Right', angle: 45, icon: <FaArrowUp className="rotate-45" /> },
    { label: 'To Right', angle: 90, icon: <FaArrowRight /> },
    { label: 'To Bottom Right', angle: 135, icon: <FaArrowRight className="rotate-45" /> },
    { label: 'To Bottom', angle: 180, icon: <FaArrowDown /> },
    { label: 'To Bottom Left', angle: 225, icon: <FaArrowDown className="rotate-45" /> },
    { label: 'To Left', angle: 270, icon: <FaArrowLeft /> },
    { label: 'To Top Left', angle: 315, icon: <FaArrowLeft className="rotate-45" /> },
  ];

  // Radial positions
  const radialPositions = [
    'center',
    'top',
    'bottom',
    'left',
    'right',
    'top left',
    'top right',
    'bottom left',
    'bottom right',
  ];

  // Calculate active stops (including Chroma interpolation if active)
  const getActiveStops = () => {
    if (chromaMode === 'none' || stops.length < 2) {
      return stops;
    }
    try {
      const colors = stops.map((s) => (chroma.valid(s.color) ? s.color : '#888888'));
      const scale = chroma.scale(colors).mode(chromaMode).colors(5);
      return scale.map((color, idx) => ({
        id: `chroma-${idx}`,
        color,
        position: Math.round((idx / (scale.length - 1)) * 100),
      }));
    } catch (e) {
      return stops;
    }
  };

  const activeStops = getActiveStops();
  const cssGradient = buildGradientCss(
    gradientType,
    angle,
    '',
    radialShape,
    radialPosition,
    activeStops
  );
  const tailwindCode = buildTailwindClass(cssGradient);
  const svgCode = buildSvgCode(gradientType, angle, activeStops);

  // Add stop
  const handleAddStop = () => {
    if (stops.length >= 7) {
      showToast('Maximum 7 color stops supported for optimal performance.', 'info');
      return;
    }
    const lastColor = stops[stops.length - 1].color;
    const newColor = chroma.valid(lastColor)
      ? chroma(lastColor).set('hsl.h', '+45').hex()
      : '#ec4899';

    const newStops = [
      ...stops,
      {
        id: `stop-${Date.now()}`,
        color: newColor,
        position: 100,
      },
    ];

    // Rebalance positions nicely
    const count = newStops.length;
    const rebalanced = newStops.map((stop, idx) => ({
      ...stop,
      position: Math.round((idx / (count - 1)) * 100),
    }));

    setStops(rebalanced);
    showToast('Added new color stop');
  };

  // Remove stop
  const handleRemoveStop = (id) => {
    if (stops.length <= 2) {
      showToast('At least 2 color stops are required.', 'info');
      return;
    }
    const filtered = stops.filter((s) => s.id !== id);
    setStops(filtered);
    showToast('Removed color stop');
  };

  // Update stop color
  const handleColorChange = (id, newColor) => {
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, color: newColor } : s))
    );
  };

  // Update stop position
  const handlePositionChange = (id, newPos) => {
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, position: Number(newPos) } : s))
    );
  };

  // Reverse color stops
  const handleReverseStops = () => {
    const reversed = [...stops].reverse().map((s, idx, arr) => ({
      ...s,
      position: Math.round((idx / (arr.length - 1)) * 100),
    }));
    setStops(reversed);
    showToast('Color order reversed');
  };

  // Randomize gradient
  const handleRandomize = () => {
    const randomStops = generateRandomHarmoniousGradient();
    setStops(randomStops);
    setAngle(Math.floor(Math.random() * 36) * 10);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
    });
    showToast('Random harmonious gradient generated! ✨');
  };

  // Apply quick preset theme
  const handleApplyPreset = (theme) => {
    const count = theme.colors.length;
    const newStops = theme.colors.map((color, idx) => ({
      id: `stop-preset-${idx}-${Date.now()}`,
      color,
      position: Math.round((idx / (count - 1)) * 100),
    }));
    setStops(newStops);
    showToast(`Applied preset: ${theme.name}`);
  };

  // Apply parsed preset from background code
  const applyPresetFromCode = (code) => {
    try {
      if (code.includes('radial-gradient')) {
        setGradientType('radial-gradient');
      } else if (code.includes('conic-gradient')) {
        setGradientType('conic-gradient');
      } else {
        setGradientType('linear-gradient');
        // Extract angle if present
        const angleMatch = code.match(/(\d+)deg/);
        if (angleMatch) {
          setAngle(Number(angleMatch[1]));
        } else if (code.includes('to right top')) {
          setAngle(45);
        } else if (code.includes('to right bottom')) {
          setAngle(135);
        } else if (code.includes('to bottom left')) {
          setAngle(225);
        } else if (code.includes('to left top')) {
          setAngle(315);
        } else if (code.includes('to right')) {
          setAngle(90);
        } else if (code.includes('to bottom')) {
          setAngle(180);
        } else if (code.includes('to left')) {
          setAngle(270);
        } else if (code.includes('to top')) {
          setAngle(0);
        }
      }

      // Extract hex codes
      const hexMatches = code.match(/#[a-fA-F0-9]{3,8}/g);
      if (hexMatches && hexMatches.length >= 2) {
        const count = hexMatches.length;
        setStops(
          hexMatches.map((c, i) => ({
            id: `stop-code-${i}`,
            color: c,
            position: Math.round((i / (count - 1)) * 100),
          }))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Safe copy to clipboard with fallback
  const safeCopyToClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((resolve, reject) => {
        const success = document.execCommand('copy');
        textArea.remove();
        success ? resolve() : reject(new Error('Copy failed'));
      });
    }
  };

  // Copy code handler
  const handleCopyCode = async () => {
    let textToCopy = '';
    if (exportFormat === 'css') {
      textToCopy = `background-image: ${cssGradient};`;
    } else if (exportFormat === 'tailwind') {
      textToCopy = tailwindCode;
    } else if (exportFormat === 'svg') {
      textToCopy = svgCode;
    }

    try {
      await safeCopyToClipboard(textToCopy);
      setHasCopied(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: stops.map((s) => s.color),
      });
      showToast(`Copied ${exportFormat.toUpperCase()} code to clipboard!`);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      showToast('Could not access clipboard', 'info');
    }
  };

  // Download SVG
  const handleDownloadSvg = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sr-gradient-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded gradient SVG file! 📥');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <span>Gradient Studio</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Interactive Editor
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Craft high-fidelity multi-stop CSS gradients with precision color interpolation and direct code exports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomize}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all active:scale-95"
          >
            <MdAutoAwesome className="text-violet-400 text-sm" />
            <span>Randomize Palette</span>
          </button>

          <button
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-slate-600 transition-all"
            title="Fullscreen Immersion"
          >
            <MdFullscreen className="text-base" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Quick Trending Palettes Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
          <span>TRENDING PRESETS</span>
          <span className="text-slate-400">Click to apply</span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {PRESET_THEMES.map((theme, i) => {
            const previewGradient = `linear-gradient(to right, ${theme.colors.join(', ')})`;
            return (
              <button
                key={i}
                onClick={() => handleApplyPreset(theme)}
                className="group flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-violet-500/50 transition-all text-xs font-medium text-slate-300"
              >
                <span
                  className="w-4 h-4 rounded-full shadow-inner border border-white/20"
                  style={{ background: previewGradient }}
                />
                <span className="group-hover:text-white transition-colors">{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid: Left Canvas / Right Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Interactive Preview Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0d1322] shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Canvas Header / Mode Bar */}
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 text-xs font-medium">
                <button
                  onClick={() => setPreviewMode('canvas')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    previewMode === 'canvas'
                      ? 'bg-violet-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Canvas
                </button>
                <button
                  onClick={() => setPreviewMode('text')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    previewMode === 'text'
                      ? 'bg-violet-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setPreviewMode('card')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    previewMode === 'card'
                      ? 'bg-violet-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  UI Card
                </button>
                <button
                  onClick={() => setPreviewMode('button')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    previewMode === 'button'
                      ? 'bg-violet-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Button
                </button>
              </div>

              {/* Overlay pattern switcher */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 hidden sm:inline">Overlay:</span>
                <select
                  value={overlayPattern}
                  onChange={(e) => setOverlayPattern(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2 py-1 outline-none focus:border-violet-500"
                >
                  <option value="none">None</option>
                  <option value="dots">Dot Matrix</option>
                  <option value="grid">Grid</option>
                </select>
              </div>
            </div>

            {/* Live Interactive Preview Box */}
            <div className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center p-6 overflow-hidden transition-all duration-300">
              {/* Underlying Pattern if selected */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  overlayPattern === 'dots'
                    ? 'bg-dot-grid opacity-30 z-10'
                    : overlayPattern === 'grid'
                    ? 'bg-transparency-grid opacity-20 z-10'
                    : 'hidden'
                }`}
              />

              {/* Mode: Pure Canvas */}
              {previewMode === 'canvas' && (
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{ background: cssGradient }}
                >
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-xs font-mono border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{gradientType.replace('-gradient', '')} • {angle}°</span>
                  </div>
                </div>
              )}

              {/* Mode: Gradient Text */}
              {previewMode === 'text' && (
                <div className="z-20 text-center max-w-lg px-4">
                  <h2
                    className="text-4xl sm:text-6xl font-black tracking-tight leading-tight transition-all duration-300"
                    style={{
                      backgroundImage: cssGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Shape The Web With Vibrancy
                  </h2>
                  <p className="mt-4 text-slate-400 text-sm">
                    Stunning gradient typography creates high-impact headers and modern visual aesthetics.
                  </p>
                </div>
              )}

              {/* Mode: UI Card over gradient */}
              {previewMode === 'card' && (
                <div
                  className="absolute inset-0 flex items-center justify-center p-6"
                  style={{ background: cssGradient }}
                >
                  <div className="z-20 max-w-sm w-full p-6 rounded-2xl bg-slate-950/75 border border-white/20 backdrop-blur-xl shadow-2xl space-y-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-white/30 to-white/10 flex items-center justify-center font-bold">
                        ✦
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Pro Component Card</h4>
                        <p className="text-xs text-slate-300">Glassmorphic UI Overlay</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      This gradient creates depth, elegance, and tactile delight when paired with translucent glass interfaces.
                    </p>
                    <div className="pt-2 flex gap-2">
                      <button className="flex-1 py-2 rounded-lg bg-white text-slate-950 text-xs font-bold hover:bg-slate-100 transition-colors">
                        Action CTA
                      </button>
                      <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode: Big Button */}
              {previewMode === 'button' && (
                <div className="z-20 flex flex-col items-center gap-4">
                  <button
                    className="px-8 py-4 rounded-2xl text-white font-extrabold text-lg shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 btn-gradient-shift"
                    style={{ background: cssGradient }}
                  >
                    Launch Experience
                  </button>
                  <span className="text-xs text-slate-400 font-mono">
                    Live interactive button render
                  </span>
                </div>
              )}
            </div>

            {/* Visual Color Stop Track */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/60 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <MdTune className="text-violet-400 text-sm" />
                  GRADIENT TRACK & COLOR STOPS
                </span>
                <button
                  onClick={handleReverseStops}
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  title="Reverse Color Stops"
                >
                  <MdSwapHoriz className="text-base" />
                  <span>Reverse</span>
                </button>
              </div>

              {/* Gradient Preview Bar */}
              <div
                className="w-full h-8 rounded-xl shadow-inner border border-white/10 relative overflow-hidden"
                style={{
                  background: `linear-gradient(to right, ${activeStops
                    .map((s) => `${s.color} ${s.position}%`)
                    .join(', ')})`,
                }}
              />
            </div>
          </div>

          {/* Code Exporter Card */}
          <div className="rounded-2xl border border-slate-800 bg-[#0d1322] shadow-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setExportFormat('css')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    exportFormat === 'css'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CSS
                </button>
                <button
                  onClick={() => setExportFormat('tailwind')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    exportFormat === 'tailwind'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tailwind CSS
                </button>
                <button
                  onClick={() => setExportFormat('svg')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    exportFormat === 'svg'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SVG Code
                </button>
              </div>

              <div className="flex items-center gap-2">
                {exportFormat === 'svg' && (
                  <button
                    onClick={handleDownloadSvg}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
                  >
                    <MdDownload className="text-sm" />
                    <span>Download SVG</span>
                  </button>
                )}

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-600/20 active:scale-95 transition-all"
                >
                  {hasCopied ? (
                    <>
                      <MdCheck className="text-sm text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <MdOutlineContentCopy className="text-sm" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Display Area */}
            <div className="relative rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-xs text-violet-300 break-all select-all">
              {exportFormat === 'css' && `background-image: ${cssGradient};`}
              {exportFormat === 'tailwind' && tailwindCode}
              {exportFormat === 'svg' && (
                <pre className="whitespace-pre-wrap text-[11px] text-slate-300 font-mono">
                  {svgCode}
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Controls Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Gradient Type Tabs */}
          <div className="rounded-2xl border border-slate-800 bg-[#0d1322] p-5 space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Gradient Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'linear-gradient', label: 'Linear' },
                  { id: 'radial-gradient', label: 'Radial' },
                  { id: 'conic-gradient', label: 'Conic' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setGradientType(type.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      gradientType === type.id
                        ? 'bg-violet-600/20 border-violet-500 text-white shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Angle Control (if Linear or Conic) */}
            {(gradientType === 'linear-gradient' || gradientType === 'conic-gradient') && (
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Angle / Orientation
                  </label>
                  <div className="flex items-center gap-1 font-mono text-xs bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                    <input
                      type="number"
                      min="0"
                      max="360"
                      value={angle}
                      onChange={(e) => setAngle(Number(e.target.value) % 360)}
                      className="w-10 bg-transparent text-right text-violet-400 outline-none font-bold"
                    />
                    <span className="text-slate-400">deg</span>
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full"
                />

                {/* Quick 8 Direction Buttons (for linear) */}
                {gradientType === 'linear-gradient' && (
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {directionPresets.map((dir) => (
                      <button
                        key={dir.label}
                        onClick={() => setAngle(dir.angle)}
                        title={dir.label}
                        className={`flex items-center justify-center p-2 rounded-xl text-sm border transition-all ${
                          angle === dir.angle
                            ? 'bg-violet-600 border-violet-500 text-white shadow-md shadow-violet-600/20'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {dir.icon}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Radial Controls (if Radial) */}
            {gradientType === 'radial-gradient' && (
              <div className="space-y-4 pt-2 border-t border-slate-800/80">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Shape
                    </label>
                    <select
                      value={radialShape}
                      onChange={(e) => setRadialShape(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl p-2.5 outline-none focus:border-violet-500"
                    >
                      <option value="circle">Circle</option>
                      <option value="ellipse">Ellipse</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Origin Position
                    </label>
                    <select
                      value={radialPosition}
                      onChange={(e) => setRadialPosition(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl p-2.5 outline-none focus:border-violet-500"
                    >
                      {radialPositions.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Chroma Color Space Smooth Interpolation */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MdColorize className="text-violet-400" />
                  Chroma Smoothing
                </label>
                <span className="text-[10px] text-slate-400 font-medium">
                  Eliminates muddy grey dead-zones
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'none', label: 'Direct' },
                  { id: 'lch', label: 'LCH' },
                  { id: 'lab', label: 'LAB' },
                  { id: 'hsl', label: 'HSL' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setChromaMode(mode.id)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${
                      chromaMode === mode.id
                        ? 'bg-violet-600/30 border-violet-500 text-violet-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Color Stops Manager */}
          <div className="rounded-2xl border border-slate-800 bg-[#0d1322] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Color Stops ({stops.length})
                </h3>
                <span className="text-[11px] text-slate-400">
                  Pick colors and drag positions
                </span>
              </div>

              <button
                onClick={handleAddStop}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/20 transition-all active:scale-95"
              >
                <MdAdd className="text-base" />
                <span>Add Stop</span>
              </button>
            </div>

            {/* List of Stops */}
            <div className="space-y-3">
              {stops.map((stop) => {
                // Ensure safe hex value for native color picker
                const safeHex = chroma.valid(stop.color) ? chroma(stop.color).hex() : '#000000';
                return (
                  <div
                    key={stop.id}
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 transition-all hover:border-slate-700"
                  >
                    <div className="flex items-center justify-between gap-3">
                      {/* Color Picker Swatch */}
                      <div className="flex items-center gap-2.5">
                        <label className="relative flex-shrink-0 cursor-pointer">
                          <input
                            type="color"
                            value={safeHex}
                            onChange={(e) => handleColorChange(stop.id, e.target.value)}
                            className="w-9 h-9 rounded-xl shadow-inner border border-white/20"
                          />
                        </label>

                        {/* Hex text input */}
                        <div className="relative">
                          <input
                            type="text"
                            value={stop.color.toUpperCase()}
                            onChange={(e) => handleColorChange(stop.id, e.target.value)}
                            className="w-24 px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-violet-500"
                          />
                        </div>
                      </div>

                      {/* Position percent label */}
                      <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                        <span className="w-9 text-right font-bold text-violet-400">
                          {stop.position}%
                        </span>

                        {/* Delete button (minimum 2 stops) */}
                        <button
                          onClick={() => handleRemoveStop(stop.id)}
                          disabled={stops.length <= 2}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          title="Delete Stop"
                        >
                          <MdDeleteOutline className="text-base" />
                        </button>
                      </div>
                    </div>

                    {/* Position slider */}
                    <div className="pt-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={stop.position}
                        onChange={(e) => handlePositionChange(stop.id, e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Immersion Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 transition-all duration-300"
          style={{ background: cssGradient }}
        >
          <div className="w-full max-w-5xl flex items-center justify-between">
            <div className="px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md text-white text-xs font-mono border border-white/10 shadow-2xl">
              <span>Fullscreen Preview • Press Esc or Close to exit</span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-2xl transition-all"
            >
              <MdFullscreenExit className="text-base" />
              <span>Exit Fullscreen</span>
            </button>
          </div>

          <div className="text-center p-8 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 max-w-xl text-white shadow-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Pure Color Canvas</h2>
            <p className="mt-2 text-sm text-slate-200">
              {cssGradient}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopyCode}
              className="px-6 py-2.5 rounded-xl bg-white text-slate-950 text-xs font-bold shadow-2xl hover:bg-slate-100 transition-colors"
            >
              Copy CSS Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
