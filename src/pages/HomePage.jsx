import { useLanguage } from "../components/language-provider"
import { quotes } from "../lib/quotes"
import { getMalaysiaDate } from "../lib/utils"

export default function HomePage() {
  const { t, language } = useLanguage()

  function getTodaysTurn() {
    const today = getMalaysiaDate()
    const startDate = new Date('2025-01-01T00:00:00+08:00')
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24))
    return ['Hayfa Izara', 'Hafiya Inara'][daysSinceStart % 2]
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

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100 via-pink-200 to-cyan-100 dark:from-indigo-950 dark:via-fuchsia-800 dark:to-teal-700" />

      <div className="relative h-full flex items-center justify-center p-6">
        <div className="text-center max-w-2xl w-full">
          <div className="mb-8">
            <p className="text-cyan-700 dark:text-cyan-200 text-xl font-semibold">{day} {month}, {year}</p>
            <p className="text-cyan-700 dark:text-cyan-200 text-base font-light tracking-wide">{weekday}</p>
          </div>

          <div>
            <p className="text-teal-600 dark:text-teal-300 text-sm font-light tracking-[0.2em] uppercase mb-4">
              {t('todaysTurn')}
            </p>

            <h1 className="text-cyan-900 dark:text-cyan-100 text-5xl md:text-6xl lg:text-8xl font-light tracking-tight leading-none uppercase">
              {todaysPerson}
            </h1>

            <p className="text-cyan-700 dark:text-cyan-300 text-base md:text-lg font-light italic mt-8 max-w-2xl mx-auto">
              "{dailyQuote}"
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
