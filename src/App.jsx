import { useState } from "react"
import { Home, Car } from "lucide-react"
import { ThemeToggle } from "./components/theme-toggle"
import { LanguageToggle } from "./components/language-toggle"
import HomePage from "./pages/HomePage"
import CarPage from "./pages/CarPage"

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {page === 'home' ? <HomePage /> : <CarPage />}

      {/* Top navigation */}
      <div className="absolute top-6 left-0 right-0 flex justify-center z-50">
        <div className="flex gap-1 p-2 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-full">
          <button
            onClick={() => setPage('home')}
            aria-label="Home"
            className={`p-2 rounded-full transition-all ${page === 'home' ? 'bg-white/30 dark:bg-white/20' : 'hover:bg-white/20 dark:hover:bg-white/10'}`}
          >
            <Home className="h-5 w-5" />
          </button>
          <button
            onClick={() => setPage('car')}
            aria-label="Car turn"
            className={`p-2 rounded-full transition-all ${page === 'car' ? 'bg-white/30 dark:bg-white/20' : 'hover:bg-white/20 dark:hover:bg-white/10'}`}
          >
            <Car className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Bottom toggles */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center z-50">
        <div className="flex gap-3 p-3 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-full">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default App
