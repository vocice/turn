import { Languages } from "lucide-react"
import { Button } from "./ui/button"
import { useLanguage } from "./language-provider"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ms" : "en")
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      className="rounded-full"
    >
      <Languages className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">
        {language === "en" ? "Switch to Bahasa Malaysia" : "Tukar ke Bahasa Inggeris"}
      </span>
    </Button>
  )
}
