import { useRef, useState } from "react"
import { useLanguage } from "./language-provider"
import { quotes } from "../lib/quotes"
import { getMalaysiaDate } from "../lib/utils"

const KID_THEMES = {
  'Hayfa Izara': {
    emoji: '🦄',
    nameA: 'text-rose-500 dark:text-rose-300',
    nameB: 'text-amber-500 dark:text-amber-300',
    badge: 'bg-rose-400 dark:bg-rose-500',
    cardBorder: 'border-rose-200 dark:border-rose-400/40',
    cardShadow: 'shadow-[0_12px_0_0_rgba(251,113,133,0.4)] dark:shadow-[0_12px_0_0_rgba(251,113,133,0.22)]',
    blobA: 'bg-rose-300/60 dark:bg-rose-500/25',
    blobB: 'bg-amber-200/80 dark:bg-amber-400/20',
    blobC: 'bg-sky-200/70 dark:bg-violet-500/20',
    confetti: ['#fb7185', '#fbbf24', '#38bdf8', '#a78bfa', '#4ade80'],
  },
  'Hafiya Inara': {
    emoji: '🐬',
    nameA: 'text-teal-500 dark:text-teal-300',
    nameB: 'text-violet-500 dark:text-violet-300',
    badge: 'bg-teal-400 dark:bg-teal-500',
    cardBorder: 'border-teal-200 dark:border-teal-400/40',
    cardShadow: 'shadow-[0_12px_0_0_rgba(45,212,191,0.4)] dark:shadow-[0_12px_0_0_rgba(45,212,191,0.22)]',
    blobA: 'bg-teal-300/60 dark:bg-teal-500/25',
    blobB: 'bg-violet-200/80 dark:bg-violet-500/20',
    blobC: 'bg-yellow-200/70 dark:bg-sky-500/20',
    confetti: ['#2dd4bf', '#a78bfa', '#facc15', '#fb7185', '#38bdf8'],
  },
  'Hail Idlan': {
    emoji: '🦖',
    nameA: 'text-sky-500 dark:text-sky-300',
    nameB: 'text-orange-500 dark:text-orange-300',
    badge: 'bg-sky-400 dark:bg-sky-500',
    cardBorder: 'border-sky-200 dark:border-sky-400/40',
    cardShadow: 'shadow-[0_12px_0_0_rgba(56,189,248,0.4)] dark:shadow-[0_12px_0_0_rgba(56,189,248,0.22)]',
    blobA: 'bg-sky-300/60 dark:bg-sky-500/25',
    blobB: 'bg-orange-200/80 dark:bg-orange-400/20',
    blobC: 'bg-emerald-200/70 dark:bg-emerald-500/20',
    confetti: ['#38bdf8', '#fb923c', '#34d399', '#facc15', '#a78bfa'],
  },
}

const TWINKLES = [
  { top: '16%', left: '12%', size: 'text-2xl', delay: '0s' },
  { top: '24%', left: '84%', size: 'text-xl', delay: '0.7s' },
  { top: '64%', left: '8%', size: 'text-lg', delay: '1.3s' },
  { top: '78%', left: '88%', size: 'text-2xl', delay: '0.4s' },
  { top: '12%', left: '58%', size: 'text-lg', delay: '1.8s' },
  { top: '86%', left: '34%', size: 'text-xl', delay: '1s' },
]

export default function TurnPage({ names, startDateIso, bgClass, pillEmoji }) {
  const { t, language } = useLanguage()
  const [confetti, setConfetti] = useState([])
  const [cheering, setCheering] = useState(false)
  const idRef = useRef(0)

  function getTodaysTurn() {
    const today = getMalaysiaDate()
    const startDate = new Date(startDateIso)
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24))
    return names[((daysSinceStart % names.length) + names.length) % names.length]
  }

  function getFormattedDate() {
    const today = getMalaysiaDate()
    const locale = language === 'ms' ? 'ms-MY' : 'en-US'
    const weekday = today.toLocaleDateString(locale, { weekday: 'long', timeZone: 'Asia/Kuala_Lumpur' })
    const year = today.toLocaleDateString(locale, { year: 'numeric', timeZone: 'Asia/Kuala_Lumpur' })
    const month = today.toLocaleDateString(locale, { month: 'long', timeZone: 'Asia/Kuala_Lumpur' })
    const day = today.getDate()
    return { weekday, year, month, day }
  }

  function getDailyQuote() {
    const today = getMalaysiaDate()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
    const quote = quotes[dayOfYear % quotes.length]
    return language === 'ms' ? quote.ms : quote.en
  }

  const todaysPerson = getTodaysTurn()
  const { weekday, year, month, day } = getFormattedDate()
  const dailyQuote = getDailyQuote()
  const theme = KID_THEMES[todaysPerson]
  const [firstName, lastName] = todaysPerson.split(' ')

  function celebrate() {
    const pieces = Array.from({ length: 24 }, () => {
      const angle = Math.random() * Math.PI * 2
      const distance = 90 + Math.random() * 160
      return {
        id: idRef.current++,
        color: theme.confetti[Math.floor(Math.random() * theme.confetti.length)],
        dx: `${Math.round(Math.cos(angle) * distance)}px`,
        dy: `${Math.round(Math.sin(angle) * distance - 70)}px`,
        rot: `${Math.round((Math.random() - 0.5) * 720)}deg`,
        size: Math.round(8 + Math.random() * 10),
        round: Math.random() > 0.5,
      }
    })
    const ids = new Set(pieces.map((p) => p.id))
    setConfetti((current) => [...current, ...pieces])
    setCheering(true)
    setTimeout(() => setConfetti((current) => current.filter((p) => !ids.has(p.id))), 950)
  }

  return (
    <>
      <div className={`absolute inset-0 transition-colors duration-500 ${bgClass}`} />

      {/* Floating color blobs + twinkles */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-16 -left-16 h-72 w-72 rounded-full blur-3xl animate-drift ${theme.blobA}`} />
        <div className={`absolute top-1/3 -right-24 h-80 w-80 rounded-full blur-3xl animate-drift [animation-delay:-5s] ${theme.blobB}`} />
        <div className={`absolute -bottom-20 left-1/4 h-72 w-72 rounded-full blur-3xl animate-drift [animation-delay:-10s] ${theme.blobC}`} />
        {TWINKLES.map((star, i) => (
          <span
            key={i}
            className={`absolute select-none text-amber-400/80 dark:text-amber-200/70 animate-twinkle ${star.size}`}
            style={{ top: star.top, left: star.left, '--delay': star.delay }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="relative h-full flex flex-col items-center justify-center gap-6 p-6">
        {/* Date pill */}
        <div
          className="animate-pop flex items-center gap-2 rounded-full border-2 border-white/80 dark:border-white/10 bg-white/70 dark:bg-white/10 backdrop-blur-md px-5 py-2"
          style={{ '--delay': '0.05s' }}
        >
          <span className="text-lg" aria-hidden="true">{pillEmoji}</span>
          <span className="font-semibold text-stone-700 dark:text-stone-200 text-sm md:text-base">
            {weekday}, {day} {month} {year}
          </span>
        </div>

        {/* Sticker card */}
        <div className="animate-pop" style={{ '--delay': '0.2s' }}>
          <button
            type="button"
            onClick={celebrate}
            onAnimationEnd={(e) => e.animationName === 'wiggle' && setCheering(false)}
            className={`relative block rounded-[2.5rem] border-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md px-12 py-8 md:px-20 md:py-10 -rotate-2 cursor-pointer select-none transition-transform duration-300 hover:scale-105 hover:-rotate-1 active:scale-95 ${theme.cardBorder} ${theme.cardShadow} ${cheering ? 'animate-wiggle' : ''}`}
          >
            <span className={`absolute -top-4 left-1/2 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-md ${theme.badge}`}>
              {t('todaysTurn')}
            </span>

            {/* Confetti burst layer */}
            <span aria-hidden="true" className="absolute inset-0">
              {confetti.map((piece) => (
                <span
                  key={piece.id}
                  className="confetti-piece left-1/2 top-1/2"
                  style={{
                    width: piece.size,
                    height: piece.size,
                    backgroundColor: piece.color,
                    borderRadius: piece.round ? '9999px' : '3px',
                    '--dx': piece.dx,
                    '--dy': piece.dy,
                    '--rot': piece.rot,
                  }}
                />
              ))}
            </span>

            <span className="block text-6xl md:text-7xl animate-bob" aria-hidden="true">{theme.emoji}</span>
            <span className={`mt-4 block font-display text-5xl md:text-7xl font-semibold leading-none ${theme.nameA}`}>
              {firstName}
            </span>
            <span className={`mt-1 block font-display text-5xl md:text-7xl font-semibold leading-none ${theme.nameB}`}>
              {lastName}
            </span>
          </button>

          <p className="mt-7 text-center text-sm font-bold text-amber-600/80 dark:text-amber-200/70 animate-pop" style={{ '--delay': '0.55s' }}>
            ✨ {t('tapToCheer')}
          </p>
        </div>

        {/* Quote bubble */}
        <div
          className="animate-pop max-w-md rounded-3xl border-2 border-white/80 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md px-6 py-4 text-center"
          style={{ '--delay': '0.4s' }}
        >
          <p className="text-sm md:text-base font-medium text-stone-600 dark:text-stone-300">
            "{dailyQuote}"
          </p>
        </div>
      </div>
    </>
  )
}
