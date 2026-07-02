# StyleForge

An all-in-one CSS helper website built with React + Vite + Tailwind CSS v4.
Includes 18 tab-based generators: Gradient, Box Shadow, Border Radius, Border,
Glassmorphism, Neumorphism, Flexbox Playground, Grid Generator, Clip Path,
Filter, Animation, Cubic Bezier, Text Shadow, Gradient Palette, Triangle,
Backdrop Filter, Pattern, Scrollbar Styler, and CSS Variables.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Stack
- React 19 + Vite
- Tailwind CSS v4 (CSS-based config via `@theme` in `src/index.css`)
- lucide-react icons

## Structure
- `src/components/` — shared UI primitives (Slider, ColorInput, ToggleGroup, CodeBlock, etc.)
- `src/tools/` — each CSS generator as its own component
- `src/utils/tools.js` — central registry mapping sidebar tabs to tool components
- `src/App.jsx` — sidebar layout + routing between tools
