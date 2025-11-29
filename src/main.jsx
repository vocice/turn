import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/theme-provider'
import { LanguageProvider } from './components/language-provider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <LanguageProvider defaultLanguage="en">
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
