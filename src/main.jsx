import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SavedStylesProvider } from './context/SavedStylesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SavedStylesProvider>
        <App />
      </SavedStylesProvider>
    </ThemeProvider>
  </StrictMode>,
)