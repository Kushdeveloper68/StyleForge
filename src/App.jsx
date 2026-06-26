import { useState, useEffect, useCallback } from 'react'
import { Menu, Sparkles, ArrowLeft, Search, Sun, Moon, Bookmark } from 'lucide-react'
import { CATEGORIES, TOOLS } from './utils/tools.js'
import LandingPage from './pages/LandingPage.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import SavedStylesPanel from './components/SavedStylesPanel.jsx'
import { useTheme } from './context/ThemeContext.jsx'
import { useSavedStyles } from './context/SavedStylesContext.jsx'

function getInitialTool() {
  if (typeof window === 'undefined') return TOOLS[0].id
  const params = new URLSearchParams(window.location.search)
  const fromUrl = params.get('tool')
  if (fromUrl && TOOLS.some((t) => t.id === fromUrl)) return fromUrl
  return TOOLS[0].id
}

export default function App() {
  const [view, setView] = useState(() =>
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('tool')
      ? 'app'
      : 'landing'
  )
  const [activeId, setActiveId] = useState(getInitialTool)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [savedOpen, setSavedOpen] = useState(false)
  const { saved } = useSavedStyles()

  // Keep the URL in sync with the active tool while in app view
  useEffect(() => {
    if (view !== 'app') return
    const url = new URL(window.location.href)
    url.searchParams.set('tool', activeId)
    window.history.replaceState({}, '', url)
  }, [activeId, view])

  // Cmd+K / Ctrl+K opens the command palette
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const selectTool = useCallback((id) => {
    setActiveId(id)
    setSidebarOpen(false)
  }, [])

  if (view === 'landing') {
    return <LandingPage onEnter={() => setView('app')} />
  }

  const active = TOOLS.find((t) => t.id === activeId) ?? TOOLS[0]
  const ActiveComponent = active.component

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg text-text">
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onSelect={selectTool} />
      <SavedStylesPanel open={savedOpen} onClose={() => setSavedOpen(false)} />

      {/* Sidebar (desktop) */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface md:flex">
        <SidebarContent
          activeId={activeId}
          onSelect={selectTool}
          onBack={() => setView('landing')}
          onSearch={() => setPaletteOpen(true)}
          onSaved={() => setSavedOpen(true)}
          savedCount={saved.length}
        />
      </aside>

      {/* Sidebar (mobile, overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-50 flex h-full w-72 flex-col border-r border-border bg-surface animate-fade-in">
            <SidebarContent
              activeId={activeId}
              onSelect={selectTool}
              onBack={() => setView('landing')}
              onSearch={() => setPaletteOpen(true)}
              onSaved={() => setSavedOpen(true)}
              savedCount={saved.length}
            />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar (mobile) */}
        <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-accent" />
            <span className="font-semibold tracking-tight">CSS Toolkit</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setSavedOpen(true)}
              className="relative rounded-lg border border-border bg-surface-2 p-2 text-text-dim"
            >
              <Bookmark size={16} />
              {saved.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                  {saved.length > 9 ? '9+' : saved.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setPaletteOpen(true)}
              className="rounded-lg border border-border bg-surface-2 p-2 text-text-dim"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-border bg-surface-2 p-2 text-text-dim"
            >
              <Menu size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
            <div key={active.id} className="animate-fade-in">
              <ActiveComponent />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      className="rounded-lg border border-border bg-surface-2 p-2 text-text-dim transition hover:text-text"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

function SidebarContent({ activeId, onSelect, onBack, onSearch, onSaved, savedCount = 0 }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-border px-5 py-5">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-accent" />
          <div>
            <h1 className="text-base font-semibold tracking-tight">StyleForge</h1>
            <p className="text-xs text-text-dim">Frontend utility generators</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <button
            onClick={onBack}
            title="Back to home"
            className="rounded-lg border border-border bg-surface-2 p-1.5 text-text-dim transition hover:text-text"
          >
            <ArrowLeft size={15} />
          </button>
        </div>
      </div>

      <div className="flex gap-2 px-3 pt-3">
        <button
          onClick={onSearch}
          className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-dim transition hover:text-text"
        >
          <Search size={14} />
          Search tools...
          <kbd className="ml-auto rounded border border-border bg-surface px-1.5 py-0.5 text-[10px]">
            ⌘K
          </kbd>
        </button>
        <button
          onClick={onSaved}
          title="Saved styles"
          className="relative flex items-center justify-center rounded-lg border border-border bg-surface-2 p-2 text-text-dim transition hover:text-accent"
        >
          <Bookmark size={15} />
          {savedCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
              {savedCount > 9 ? '9+' : savedCount}
            </span>
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {CATEGORIES.map((cat) => (
          <div key={cat.name}>
            <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-dim/70">
              {cat.name}
            </p>
            <div className="space-y-1">
              {cat.tools.map((tool) => {
                const Icon = tool.icon
                const active = tool.id === activeId
                return (
                  <button
                    key={tool.id}
                    onClick={() => onSelect(tool.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      active
                        ? 'bg-accent/15 text-accent'
                        : 'text-text-dim hover:bg-surface-2 hover:text-text'
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    {tool.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-5 py-4 text-xs text-text-dim">
        Built for fast, copy-paste CSS.
      </div>
    </>
  )
}