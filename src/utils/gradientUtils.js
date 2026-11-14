import chroma from 'chroma-js';

// Predefined trending palette sets for smart randomizer
export const PRESET_THEMES = [
  { name: 'Cosmic Violet', colors: ['#6366f1', '#a855f7', '#ec4899'] },
  { name: 'Hyper Sunset', colors: ['#ff416c', '#ff4b2b', '#ffb199'] },
  { name: 'Cyberpunk Neon', colors: ['#00f2fe', '#4facfe', '#6b11ff'] },
  { name: 'Emerald Mirage', colors: ['#0ba360', '#3cba92', '#30dd8a'] },
  { name: 'Deep Space', colors: ['#0f2027', '#203a43', '#2c5364'] },
  { name: 'Peach Velvet', colors: ['#f857a6', '#ff5858', '#fbc531'] },
  { name: 'Oceanic Breeze', colors: ['#2e3192', '#1bffff'] },
  { name: 'Solar Flare', colors: ['#f12711', '#f5af19'] },
  { name: 'Berry Smoothie', colors: ['#8e2de2', '#4a00e0'] },
  { name: 'Northern Lights', colors: ['#43e97b', '#38f9d7'] },
  { name: 'Dark Amethyst', colors: ['#3023ae', '#c86dd7'] },
  { name: 'Midnight Glow', colors: ['#130cb7', '#52e5e7'] },
  { name: 'Flamingo Pink', colors: ['#ee0979', '#ff6a00'] },
  { name: 'Electric Citrus', colors: ['#11998e', '#38ef7d'] },
  { name: 'Royal Twilight', colors: ['#200122', '#6f0000', '#c0392b'] },
  { name: 'Pastel Dream', colors: ['#a1c4fd', '#c2e9fb'] }
];

export function buildGradientCss(type, angle, orientation, radialShape, radialPosition, stops) {
  // Sort stops by position
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const stopsString = sortedStops
    .map((s) => `${s.color} ${s.position}%`)
    .join(', ');

  if (type === 'linear-gradient') {
    return `linear-gradient(${angle}deg, ${stopsString})`;
  } else if (type === 'radial-gradient') {
    return `radial-gradient(${radialShape} at ${radialPosition}, ${stopsString})`;
  } else if (type === 'conic-gradient') {
    return `conic-gradient(from ${angle}deg at ${radialPosition}, ${stopsString})`;
  }
  return `linear-gradient(${angle}deg, ${stopsString})`;
}

export function buildTailwindClass(gradientCss) {
  // Return arbitrary Tailwind CSS syntax
  return `bg-[${gradientCss.replace(/\s+/g, '_')}]`;
}

export function buildSvgCode(type, angle, stops) {
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  // Approximate x1, y1, x2, y2 from angle
  const rad = ((angle - 90) * Math.PI) / 180;
  const x1 = Math.round(50 + 50 * Math.cos(rad + Math.PI));
  const y1 = Math.round(50 + 50 * Math.sin(rad + Math.PI));
  const x2 = Math.round(50 + 50 * Math.cos(rad));
  const y2 = Math.round(50 + 50 * Math.sin(rad));

  const stopsSvg = sortedStops
    .map(
      (s) =>
        `    <stop offset="${s.position}%" stop-color="${s.color}" />`
    )
    .join('\n');

  return `<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
${stopsSvg}
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
</svg>`;
}

export function generateRandomHarmoniousGradient() {
  // 50% chance pick a curated theme, 50% generate from chroma scale
  if (Math.random() > 0.4) {
    const theme = PRESET_THEMES[Math.floor(Math.random() * PRESET_THEMES.length)];
    const count = theme.colors.length;
    return theme.colors.map((color, index) => ({
      id: `stop-${Date.now()}-${index}`,
      color,
      position: Math.round((index / (count - 1)) * 100),
    }));
  } else {
    // Generate harmonious palette with chroma
    const baseColor = chroma.random();
    const mode = Math.random() > 0.5 ? 'lch' : 'lab';
    const count = 3;
    const secondColor = baseColor.set('hsl.h', '+120');
    const scale = chroma.scale([baseColor, secondColor]).mode(mode).colors(count);

    return scale.map((color, index) => ({
      id: `stop-${Date.now()}-${index}`,
      color,
      position: Math.round((index / (count - 1)) * 100),
    }));
  }
}

export function checkContrast(hexColor) {
  try {
    const luminance = chroma(hexColor).luminance();
    return luminance > 0.5 ? '#000000' : '#ffffff';
  } catch (e) {
    return '#ffffff';
  }
}

