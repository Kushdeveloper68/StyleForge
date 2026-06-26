import { useMemo, useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Sparkles, Blend, Move3d, Shapes, Contrast,
  MousePointer2, Sun, Moon, ShieldCheck, Layers3, Wand2, Copy, Check,
  GitBranch, Terminal, RotateCw,
} from 'lucide-react'
import { CATEGORIES } from '../utils/tools.js'
import { useTheme } from '../context/ThemeContext.jsx'

/* ----------------------------------------------------------------------- */
/*  Data                                                                    */
/* ----------------------------------------------------------------------- */

const FEATURE_GROUPS = [
  {
    icon: Blend,
    fig: 'fig. 01',
    title: 'Surface effects',
    desc: 'Gradients, shadows, glass, blur, grain, and masks — the layer work that separates a flat div from a real surface.',
  },
  {
    icon: Move3d,
    fig: 'fig. 02',
    title: 'Layout & motion',
    desc: 'Flexbox, grid, perspective, and transforms tuned by feel, not by guessing at sixteen unitless numbers.',
  },
  {
    icon: Shapes,
    fig: 'fig. 03',
    title: 'Shape & pattern',
    desc: 'Blobs, waves, triangles, and repeats for the moments a rectangle stops being enough.',
  },
  {
    icon: Contrast,
    fig: 'fig. 04',
    title: 'Color & contrast',
    desc: 'Palette building and WCAG contrast checks, so dark mode is a decision and not an afterthought.',
  },
]

const SPEC_SHEET = [
  ['INPUT', 'Mouse, keyboard, or typed value'],
  ['OUTPUT', 'Plain CSS — no build step, no runtime'],
  ['LICENSE', 'Copy it, ship it, forget where it came from'],
  ['DEPENDENCIES', 'None'],
]

const WORKBENCH_STEPS = [
  { icon: Wand2, title: 'Open a tool', desc: 'One surface, one job — a gradient, a card, a blur, a grid.' },
  { icon: RotateCw, title: 'Drag until it\u2019s right', desc: 'Controls are built for feel: drag, not type-and-pray.' },
  { icon: Copy, title: 'Copy the output', desc: 'Plain CSS, ready for a stylesheet or a component.' },
]

const COMPARISON_ROWS = [
  { label: 'Layout', generic: 'Crowded directory of 80 tiles', forge: 'Twelve groups you can hold in your head' },
  { label: 'Preview', generic: 'Static thumbnail, hope for the best', forge: 'Live render, updates as you drag' },
  { label: 'Output', generic: 'Minified, hard to skim', forge: 'Formatted CSS, ready to read' },
  { label: 'Feel', generic: 'Disposable utility, closed in a tab', forge: 'Stays open while you build' },
]

const CONTRIBUTION_STEPS = [
  { tag: 'src/tools/', title: 'Build the generator', desc: 'Use the shared ToolLayout, PreviewBox, and CodeBlock primitives.' },
  { tag: 'src/utils/tools.js', title: 'Register it', desc: 'Add it to a category and it appears in the app and on this page.' },
  { tag: 'npm run build', title: 'Check the seams', desc: 'Confirm the shared layout still holds before opening a pull request.' },
]

const FAQ = [
  { q: 'Who is this for?', a: 'Anyone shipping interfaces who wants a CSS decision made in seconds, not six tabs.' },
  { q: 'Is it a design system?', a: 'No — it\u2019s a workbench. Effects, layout, and color tools that stay out of your way.' },
  { q: 'Does it cost anything?', a: 'No account, no paywall. Open a tool, copy the output, get back to work.' },
]

/* ----------------------------------------------------------------------- */
/*  Hero widget — the one real signature piece: a tiny, live gradient      */
/*  builder that drives both the preview swatch and the CSS output panel  */
/* ----------------------------------------------------------------------- */

const STOP_PRESETS = [
  ['#5eead4', '#0ea5e9'],
  ['#f59e0b', '#ef4444'],
  ['#a78bfa', '#ec4899'],
  ['#34d399', '#22d3ee'],
]

function HeroBuilder() {
  const [angle, setAngle] = useState(135)
  const [stopIndex, setStopIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [from, to] = STOP_PRESETS[stopIndex]

  const css = useMemo(
    () => `background: linear-gradient(${angle}deg, ${from} 0%, ${to} 100%);`,
    [angle, from, to]
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="relative rounded-lg border border-border bg-surface">
      <CornerMarks />
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">live / gradient-04</p>
        </div>
        <ShieldCheck size={14} className="text-text-dim" />
      </div>

      <div
        className="relative h-44 w-full sm:h-52"
        style={{ background: `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(transparent_31px,rgba(255,255,255,0.06)_32px),linear-gradient(90deg,transparent_31px,rgba(255,255,255,0.06)_32px)] bg-[size:32px_32px] opacity-40" />
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <label className="block">
            <span className="mb-1.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">
              angle
              <span className="text-text">{angle}\u00b0</span>
            </span>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
            />
          </label>

          <div>
            <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">stops</span>
            <div className="flex gap-2">
              {STOP_PRESETS.map(([a, b], index) => (
                <button
                  key={a + b}
                  onClick={() => setStopIndex(index)}
                  aria-label={`Use gradient stop ${index + 1}`}
                  className={`h-6 w-6 rounded-full transition-transform duration-200 ${
                    index === stopIndex ? 'scale-110 ring-2 ring-text ring-offset-2 ring-offset-surface' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 self-end rounded-md border border-border bg-bg px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim transition-colors duration-200 hover:border-accent/50 hover:text-text sm:self-stretch"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'copied' : 'copy css'}
        </button>
      </div>

      <div className="border-t border-border bg-bg px-4 py-3">
        <code className="block overflow-x-auto whitespace-pre font-mono text-[12px] leading-6 text-text-dim">
          <span className="text-accent">.surface</span> {'{'}
          {'\n'}  {css}
          {'\n'}{'}'}
        </code>
      </div>
    </div>
  )
}

/* Small reusable blueprint-style corner marks — used sparingly, only on   */
/* the handful of panels meant to feel like the "instrument" of the page. */
function CornerMarks() {
  return (
    <>
      <span className="pointer-events-none absolute -left-px -top-px h-3 w-3 border-l border-t border-accent/60" />
      <span className="pointer-events-none absolute -right-px -top-px h-3 w-3 border-r border-t border-accent/60" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b border-l border-accent/60" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent/60" />
    </>
  )
}

/* ----------------------------------------------------------------------- */
/*  Page                                                                    */
/* ----------------------------------------------------------------------- */

export default function LandingPage({ onEnter }) {
  const totalTools = CATEGORIES.reduce((sum, category) => sum + category.tools.length, 0)
  const categoryCount = CATEGORIES.length
  const { theme, toggleTheme } = useTheme()
  const featuredCategories = CATEGORIES.slice(0, 3)

  return (
    <div className="relative min-h-screen bg-bg text-text">
      <style>{`
        @keyframes sf-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sf-scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .sf-rise { animation: sf-rise .6s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .sf-rise { animation: none; }
        }
      `}</style>

      {/* faint engineering-grid backdrop, restrained — not a glow blob */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(transparent 39px, currentColor 40px), linear-gradient(90deg, transparent 39px, currentColor 40px)',
          backgroundSize: '40px 40px',
        }}
      />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface">
            <Sparkles size={16} className="text-accent" />
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">StyleForge</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">css workbench</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            className="inline-flex items-center justify-center rounded-md border border-border p-2 text-text-dim transition-colors duration-200 hover:border-accent/40 hover:text-text"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={onEnter}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-xs font-medium text-text-dim transition-colors duration-200 hover:border-accent/40 hover:text-text"
          >
            Open toolkit
            <ArrowRight size={13} />
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6">
        {/* ---------------------------------------------------------- HERO */}
        <section className="grid gap-10 border-b border-border py-14 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:py-20">
          <div className="sf-rise">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              {String(totalTools).padStart(2, '0')} tools / {categoryCount} groups
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
              CSS values, set by hand,
              <span className="block text-text-dim">not guessed in a text input.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-text-dim sm:text-base">
              StyleForge is a set of focused generators for gradients, shadows, layout, and color —
              each one a live preview next to the CSS it produces. Drag the angle below and watch
              the code panel follow.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={onEnter}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-transform duration-200 hover:scale-[1.02]"
              >
                Open the toolkit
                <ArrowRight size={15} />
              </button>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">
                <Terminal size={13} />
                no signup &middot; no paywall
              </div>
            </div>
          </div>

          <div className="sf-rise" style={{ animationDelay: '90ms' }}>
            <HeroBuilder />
          </div>
        </section>

        {/* ----------------------------------------------------- FEATURES */}
        <section className="border-b border-border py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What\u2019s actually inside</h2>
            <p className="hidden max-w-xs text-right text-xs leading-6 text-text-dim sm:block">
              Four groups cover the surfaces you touch on most pages.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {FEATURE_GROUPS.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="group relative bg-surface p-5 transition-colors duration-200 hover:bg-surface-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">{item.fig}</p>
                  <Icon size={18} className="mt-4 text-accent transition-transform duration-200 group-hover:translate-x-0.5" />
                  <h3 className="mt-4 text-sm font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-text-dim">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* -------------------------------------------- WORKBENCH + SPEC */}
        <section className="grid gap-px overflow-hidden rounded-lg border border-border bg-border py-0 lg:grid-cols-[1.2fr_1fr]">
          <div className="bg-surface p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">how it works</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Three steps, no detour.</h2>
            <div className="mt-6 space-y-5">
              {WORKBENCH_STEPS.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-bg text-accent">
                        <Icon size={14} />
                      </div>
                      {index < WORKBENCH_STEPS.length - 1 && <div className="mt-1 h-full w-px bg-border" />}
                    </div>
                    <div className="pb-1">
                      <p className="text-sm font-semibold text-text">{step.title}</p>
                      <p className="mt-1 text-xs leading-6 text-text-dim">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-surface p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">spec sheet</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">No catch, on the record.</h2>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {SPEC_SHEET.map(([term, def]) => (
                <div key={term} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">{term}</dt>
                  <dd className="text-right text-sm text-text">{def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* --------------------------------------------------- CATEGORIES */}
        <section className="border-b border-t border-border py-16">
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">browse by group</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Organized the way you\u2019d actually look for it.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featuredCategories.map((category, index) => (
              <div key={category.name} className="relative rounded-lg border border-border bg-surface p-5">
                {index === 0 && <CornerMarks />}
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-text">{category.name}</h3>
                  <span className="font-mono text-[10px] text-text-dim">{String(category.tools.length).padStart(2, '0')}</span>
                </div>
                <div className="mt-3 space-y-1.5">
                  {category.tools.slice(0, 4).map((tool) => (
                    <button
                      key={tool.id}
                      onClick={onEnter}
                      className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors duration-150 hover:bg-surface-2"
                    >
                      <tool.icon size={14} className="text-text-dim transition-colors duration-150 group-hover:text-accent" />
                      <span className="flex-1 text-sm text-text-dim transition-colors duration-150 group-hover:text-text">{tool.label}</span>
                      <ArrowUpRight size={13} className="text-text-dim opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------- COMPARISON */}
        <section className="py-16">
          <div className="mb-8 max-w-lg">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">comparison</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Most generator sites feel like a directory.</h2>
            <p className="mt-3 text-sm leading-7 text-text-dim">This one is closer to a workbench you leave open in a tab while you build.</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="grid grid-cols-[auto_1fr_1fr] border-b border-border bg-surface-2 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">
              <div className="px-4 py-3" />
              <div className="px-4 py-3">Generic generator</div>
              <div className="px-4 py-3 text-accent">StyleForge</div>
            </div>
            {COMPARISON_ROWS.map((row) => (
              <div key={row.label} className="grid grid-cols-[auto_1fr_1fr] border-b border-border last:border-b-0 even:bg-surface/40">
                <div className="px-4 py-4 text-xs font-medium text-text-dim">{row.label}</div>
                <div className="px-4 py-4 text-sm text-text-dim">{row.generic}</div>
                <div className="px-4 py-4 text-sm text-text">{row.forge}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------- CONTRIBUTION */}
        <section className="border-t border-border py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">extending it</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Adding a tool takes three files.</h2>
            </div>
            <a
              href="https://github.com"
              className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim transition-colors duration-200 hover:text-accent sm:flex"
            >
              <GitBranch size={13} />
              view source
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {CONTRIBUTION_STEPS.map((step) => (
              <div key={step.tag} className="rounded-lg border border-border bg-surface p-5">
                <code className="rounded bg-bg px-2 py-1 font-mono text-[11px] text-accent">{step.tag}</code>
                <p className="mt-4 text-sm font-semibold text-text">{step.title}</p>
                <p className="mt-1.5 text-xs leading-6 text-text-dim">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- FAQ */}
        <section className="border-t border-border py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-dim">faq</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Quick answers.</h2>
          <div className="mt-6 divide-y divide-border border-y border-border">
            {FAQ.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-text">
                  {item.q}
                  <MousePointer2 size={13} className="shrink-0 text-text-dim transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-text-dim">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------ CLOSE */}
        <section className="border-t border-border py-16">
          <div className="relative overflow-hidden rounded-lg border border-border bg-surface p-8 sm:p-10">
            <CornerMarks />
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-lg">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">ready when you are</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Open the toolkit and start with something real.</h2>
              </div>
              <button
                onClick={onEnter}
                className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-accent px-6 py-3 text-sm font-semibold text-bg transition-transform duration-200 hover:scale-[1.02]"
              >
                Enter StyleForge
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-text-dim sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Layers3 size={14} />
            <span>StyleForge &mdash; {totalTools} tools, plain CSS output, no account required.</span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]">built for copy-paste work</p>
        </div>
      </footer>
    </div>
  )
}