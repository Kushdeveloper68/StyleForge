import { createContext, useContext, useState, useCallback } from 'react'

const SavedStylesContext = createContext(null)

const STORAGE_KEY = 'css-toolkit-saved-styles'

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persist(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // storage quota exceeded or unavailable
  }
}

export function SavedStylesProvider({ children }) {
  const [saved, setSaved] = useState(load)

  const saveStyle = useCallback((toolId, toolLabel, css, previewStyle = null) => {
    setSaved((prev) => {
      const entry = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        toolId,
        toolLabel,
        css,
        previewStyle,
        savedAt: Date.now(),
      }
      const next = [entry, ...prev].slice(0, 50) // cap at 50
      persist(next)
      return next
    })
  }, [])

  const removeStyle = useCallback((id) => {
    setSaved((prev) => {
      const next = prev.filter((s) => s.id !== id)
      persist(next)
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    setSaved([])
    persist([])
  }, [])

  return (
    <SavedStylesContext.Provider value={{ saved, saveStyle, removeStyle, clearAll }}>
      {children}
    </SavedStylesContext.Provider>
  )
}

export function useSavedStyles() {
  const ctx = useContext(SavedStylesContext)
  if (!ctx) throw new Error('useSavedStyles must be used within SavedStylesProvider')
  return ctx
}