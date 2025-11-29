import { createContext, useContext, useState } from "react"
import { translations } from "../lib/translations"

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => null,
  t: (key) => key,
})

export function LanguageProvider({ children, defaultLanguage = "en" }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("ui-language") || defaultLanguage
  )

  const handleSetLanguage = (lang) => {
    localStorage.setItem("ui-language", lang)
    setLanguage(lang)
  }

  const t = (key) => {
    return translations[language]?.[key] || key
  }

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}
