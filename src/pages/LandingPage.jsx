import { ArrowRight, Sparkles, Blend, Square, Move3d, Shapes, Contrast, MousePointer2, Sun, Moon } from 'lucide-react'
import { CATEGORIES } from '../utils/tools.js'
import { useTheme } from '../context/ThemeContext.jsx'

const FEATURE_HIGHLIGHTS = [
  { icon: Blend, title: 'Gradient & Effects', desc: 'Gradients, shadows, glass, neumorphism, masks, noise.' },
  { icon: Move3d, title: 'Layout & 3D', desc: 'Flexbox, grid, transforms, perspective, clip-path.' },
  { icon: Shapes, title: 'Shapes & Patterns', desc: 'Blobs, waves, triangles, repeating backgrounds.' },
  { icon: Contrast, title: 'Color & Accessibility', desc: 'Palettes, gradient analysis, WCAG contrast checks.' },
  { icon: Square, title: 'Typography & Sizing', desc: 'Clamp, unit conversion, scales, breakpoints.' },
  { icon: MousePointer2, title: 'UI Elements', desc: 'Buttons, scrollbars, custom cursors.' },
]

export default function LandingPage({ onEnter }) {
  const totalTools = CATEGORIES.reduce((sum, c) => sum + c.tools.length, 0)
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <Sparkles size={22} className="text-accent" />
          <span className="text-lg font-semibold tracking-tight">StyleForge</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="rounded-lg border border-border bg-surface-2 p-2 text-text-dim transition hover:text-text"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={onEnter}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-text-dim transition hover:border-accent/50 hover:text-text"
          >
            Open App
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center sm:pt-24">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-text-dim">
          <Sparkles size={13} className="text-accent" />
          {totalTools}+ frontend CSS generators in one place
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Every CSS tool you need,
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            without the tab-hopping.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-text-dim sm:text-lg">
          Gradients, shadows, glassmorphism, animations, clamp values, contrast checks,
          and more — all with live previews and one-click copy-paste CSS.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={onEnter}
            className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            Start Building
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Preview strip */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="col-span-2 h-32 rounded-2xl bg-gradient-to-br from-accent via-purple-500 to-accent-2 sm:h-40" />
          <div className="h-32 rounded-2xl border border-border bg-surface sm:h-40" style={{ boxShadow: '12px 12px 30px -10px rgba(99,102,241,0.4)' }} />
          <div className="h-32 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md sm:h-40" />
          <div className="hidden h-40 rounded-2xl bg-[conic-gradient(from_90deg,_#6366f1,_#22d3ee,_#ec4899,_#6366f1)] sm:block" />
          <div className="hidden h-40 rounded-full bg-gradient-to-br from-accent-2 to-accent sm:block" style={{ borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%' }} />
          <div className="col-span-2 hidden h-40 rounded-2xl border border-border bg-surface-2 sm:block" />
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          One toolkit, every category covered
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURE_HIGHLIGHTS.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="rounded-xl border border-border bg-surface p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-semibold text-text">{f.title}</h3>
                <p className="mt-1 text-sm text-text-dim">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* All tools list */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          All {totalTools} tools
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.name}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-dim">
                {cat.name}
              </h3>
              <ul className="space-y-1.5">
                {cat.tools.map((tool) => (
                  <li key={tool.id} className="flex items-center gap-2 text-sm text-text">
                    <tool.icon size={14} className="text-accent" />
                    {tool.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <div className="rounded-2xl border border-border bg-surface p-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to speed up your CSS workflow?
          </h2>
          <p className="mt-3 text-text-dim">
            No sign-up. No ads. Just tools.
          </p>
          <button
            onClick={onEnter}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90"
          >
            Open Toolkit
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center text-xs text-text-dim">
        Built for fast, copy-paste CSS.
      </footer>
    </div>
  )
}