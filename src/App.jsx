import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { TOOLS } from './utils/tools.js'

export default function App() {
  const [activeId, setActiveId] = useState(TOOLS[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const active = TOOLS.find((t) => t.id === activeId) ?? TOOLS[0]
  const ActiveComponent = active.component

  const selectTool = (id) => {
    setActiveId(id)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg text-text">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface md:flex">
        <SidebarContent activeId={activeId} onSelect={selectTool} />
      </aside>

      {/* Sidebar (mobile, overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-50 flex h-full w-72 flex-col border-r border-border bg-surface animate-fade-in">
            <SidebarContent activeId={activeId} onSelect={selectTool} />
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
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg border border-border bg-surface-2 p-2 text-text-dim"
          >
            <Menu size={18} />
          </button>
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

function SidebarContent({ activeId, onSelect }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-border px-5 py-5">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-accent" />
          <div>
            <h1 className="text-base font-semibold tracking-tight">CSS Toolkit</h1>
            <p className="text-xs text-text-dim">Frontend utility generators</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {TOOLS.map((tool) => {
          const Icon = tool.icon
          const active = tool.id === activeId
          return (
            <button
              key={tool.id}
              onClick={() => onSelect(tool.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-dim hover:bg-surface-2 hover:text-text'
              }`}
            >
              <Icon size={17} className="shrink-0" />
              {tool.label}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-border px-5 py-4 text-xs text-text-dim">
        Built for fast, copy-paste CSS.
      </div>
    </>
  )
}