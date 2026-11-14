# SR Gradient Studio V2 🎨

[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> **SR Gradient Studio V2** is a modern, high-performance gradient design toolkit and generator built with Vite, React 18, Tailwind CSS, and Chroma-js. 

---

## ✨ Features in V2

### 🎛️ Advanced Gradient Studio
- **Multi-Stop Color Engine**: Support for 2 to 7 custom color stops with dynamic addition, removal, reordering, and position sliders (0%–100%).
- **Multiple Gradient Types**:
  - **Linear Gradient**: Interactive 360° angle slider, direct degree input, and 8 quick directional presets.
  - **Radial Gradient**: Circle / Ellipse shapes with 9 origin anchor positions.
  - **Conic Gradient**: Precision angle dial and position offsets.
- **Chroma.js Color Science**:
  - Color smoothing interpolation algorithms (`LCH`, `LAB`, `HSL`, `Direct`) to prevent dull, muddy grey transition zones.
  - Real-time luminance & contrast verification.
- **Interactive Multi-Mode Preview**:
  - **Canvas Mode**: Pure gradient display with dimension statistics.
  - **Typography Mode**: Live `background-clip: text` gradient headline preview.
  - **UI Card Mode**: Frosted glassmorphism interface overlay.
  - **Button Mode**: Interactive call-to-action button test.
  - **Fullscreen Immersion**: Full-viewport inspection with 1-click trigger or Escape key.
  - **Pattern Overlays**: Switch between None, Dot Matrix, and Subtle Grid.
- **One-Click Randomizer**: Generates harmonious trending color palettes with confetti feedback.

### 🔘 Gradient Buttons Showroom (`/button`)
- **28+ Interactive Button Presets** with real CSS hover effects (shimmer gradient shift, ambient glow, 3D lift, and glass borders).
- Filter by styles: Vibrant, Ocean, Sunset, Dark, Neon, Pastel.
- 1-click **Copy CSS** and **Copy Tailwind** classes.

### 🖼️ Curated Backgrounds Gallery (`/background`)
- **36+ Full-Page Gradient Themes** categorized by mood (Ocean, Sunset, Neon, Vibrant, Dark, Pastel).
- **Edit in Studio**: Transfer any curated background directly into the Generator Studio with one click.
- Fullscreen modal preview & instant CSS / Tailwind clipboard copy.

### 🌈 Color Harmonizer (`/palette`)
- Pick a seed color to automatically calculate mathematical harmonies:
  - Analogous, High-Contrast Complementary, Triadic, Monochromatic Depth, and Chromatic Tension.
- Send any harmony directly into the Studio.

### ⚡ Code Exporter
- Pure CSS (`background-image: ...;`)
- Tailwind CSS arbitrary class strings (`bg-[...]`)
- Export & Download SVG vector file (`.svg`)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended, fully compatible with Node 24)
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/wapborhan/gradient-generator-react.git

# Navigate to project directory
cd gradient-generator-react

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
# or
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

The optimized static assets will be created in the `dist` folder.

### Preview Build

```bash
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Color Science**: [Chroma-js](https://gka.github.io/chroma.js/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Router**: [React Router DOM v6](https://reactrouter.com/)
- **Celebration Effects**: [Canvas Confetti](https://www.kirilv.com/canvas-confetti/)

---

## 📄 License

This project is licensed under the MIT License.
Designed & Developed by [SR Dream Lab](https://www.srdreamlab.com).
