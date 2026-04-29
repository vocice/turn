import { useLanguage } from "../components/language-provider"
import { quotes } from "../lib/quotes"
import { getMalaysiaDate } from "../lib/utils"

export default function CarPage() {
  const { t, language } = useLanguage()

  function getTodaysTurn() {
    const today = getMalaysiaDate()
    const startDate = new Date('2026-04-30T00:00:00+08:00')
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24))
    return ['Hayfa Izara', 'Hafiya Inara', 'Hail Idlan'][daysSinceStart % 3]
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
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-blue-200 to-slate-300 dark:from-slate-950 dark:via-blue-950 dark:to-sky-900" />

      <div className="relative h-full flex items-center justify-center p-6">
        <div className="text-center max-w-2xl w-full">
          <div className="mb-8">
            <p className="text-blue-700 dark:text-blue-200 text-xl font-semibold">{day} {month}, {year}</p>
            <p className="text-blue-700 dark:text-blue-200 text-base font-light tracking-wide">{weekday}</p>
          </div>

          <div>
            <p className="text-sky-600 dark:text-sky-300 text-sm font-light tracking-[0.2em] uppercase mb-4">
              {t('todaysTurn')}
            </p>

            <h1 className="text-slate-900 dark:text-slate-50 text-5xl md:text-6xl lg:text-8xl font-light tracking-tight leading-none uppercase">
              {todaysPerson}
            </h1>

            <p className="text-blue-600 dark:text-blue-300 text-base md:text-lg font-light italic mt-8 max-w-2xl mx-auto">
              "{dailyQuote}"
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
