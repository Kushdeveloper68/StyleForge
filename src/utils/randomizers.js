// Tasteful random generators — values that look intentional, not garbage

const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const rngf = (min, max, dp = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(dp))
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const HUE_PAIRS = [
  [250, 200], [320, 40], [170, 250], [190, 330], [30, 280], [200, 140],
  [280, 40], [160, 300], [20, 200], [60, 270],
]

function hslToHex(h, s, l) {
  s /= 100; l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')
}

export const randomizers = {
  gradient: () => {
    const [h1, h2] = pick(HUE_PAIRS)
    const s = rng(65, 95)
    const angle = pick([45, 90, 120, 135, 150, 225])
    return {
      type: 'linear',
      angle,
      stops: [
        { id: 1, color: hslToHex(h1, s, rng(50, 65)), position: 0 },
        { id: 2, color: hslToHex(h2, s, rng(45, 60)), position: 100 },
      ],
    }
  },

  boxShadow: () => ({
    x: rng(-8, 8),
    y: rng(8, 30),
    blur: rng(15, 60),
    spread: rng(-15, 0),
    alpha: rng(20, 50),
    color: '#000000',
    inset: false,
  }),

  borderRadius: () => {
    const style = pick(['all', 'organic', 'sided'])
    if (style === 'all') {
      const v = pick([4, 8, 12, 16, 20, 24, 32, 48, 100])
      return { tl: v, tr: v, br: v, bl: v }
    }
    if (style === 'sided') {
      const a = pick([8, 12, 16, 24, 32])
      const b = pick([4, 8, 12])
      return { tl: a, tr: b, br: a, bl: b }
    }
    return {
      tl: rng(20, 80),
      tr: rng(20, 80),
      br: rng(20, 80),
      bl: rng(20, 80),
    }
  },

  glassmorphism: () => ({
    blur: rng(8, 20),
    opacity: rng(10, 25),
    tint: pick(['#ffffff', '#a5b4fc', '#67e8f9', '#c4b5fd']),
    borderOpacity: rng(20, 40),
    radius: pick([12, 16, 20, 24]),
  }),

  textShadow: () => {
    const [h] = pick(HUE_PAIRS)
    return {
      color: hslToHex(h, 90, 60),
      preset: pick(['Neon', 'Soft', '3D']),
    }
  },

  filter: () => ({
    blur: 0,
    brightness: rng(90, 120),
    contrast: rng(90, 130),
    grayscale: pick([0, 0, 0, rng(10, 100)]),
    saturate: rng(100, 200),
    sepia: pick([0, 0, rng(10, 60)]),
    hueRotate: rng(0, 360),
    invert: 0,
    opacity: 100,
  }),

  animation: () => ({
    preset: pick(['bounce', 'pulse', 'spin', 'fade', 'slideIn']),
    duration: rngf(0.4, 2.5),
    timing: pick(['ease-in-out', 'ease-out', 'cubic-bezier(0.34, 1.56, 0.64, 1)']),
  }),

  button: () => {
    const [h1, h2] = pick(HUE_PAIRS)
    const s = rng(70, 90)
    return {
      style: pick(['gradient', 'solid', 'neon', 'glass']),
      color1: hslToHex(h1, s, 55),
      color2: hslToHex(h2, s, 50),
      radius: pick([4, 8, 10, 12, 20, 999]),
    }
  },

  pattern: () => ({
    pattern: pick(['stripes', 'dots', 'checkerboard', 'grid', 'diagonal-lines', 'zigzag']),
    fg: hslToHex(rng(0, 360), rng(50, 80), rng(50, 70)),
    bg: hslToHex(rng(0, 360), rng(20, 40), rng(10, 20)),
    size: pick([10, 15, 20, 25, 30, 40]),
  }),

  shape: () => ({
    color: hslToHex(rng(0, 360), rng(60, 90), rng(50, 65)),
    size: rng(140, 260),
  }),

  noise: () => ({
    opacity: rng(8, 25),
    density: rng(40, 100),
    bg: hslToHex(rng(0, 360), rng(10, 30), rng(8, 18)),
  }),
}