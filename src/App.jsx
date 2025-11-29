import { ThemeToggle } from "./components/theme-toggle"
import { LanguageToggle } from "./components/language-toggle"
import { useLanguage } from "./components/language-provider"
import { useTheme } from "./components/theme-provider"
import { quotes } from "./lib/quotes"

function App() {
  const { t, language } = useLanguage()
  const { theme } = useTheme()

  // Helper function to get current date in Malaysia timezone
  function getMalaysiaDate() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }));
  }

  function getTodaysTurn() {
    const today = getMalaysiaDate();
    const startDate = new Date('2025-01-01T00:00:00+08:00'); // January 1, 2025 Malaysia time

    // Calculate days elapsed since start date
    const timeDiff = today - startDate;
    const daysSinceStart = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Alternate daily: 1/1/2025 = Hayfa, 2/1/2025 = Hafiya, 3/1/2025 = Hayfa, etc.
    const turns = ['Hayfa Izara', 'Hafiya Inara'];
    return turns[daysSinceStart % 2];
  }

  function getFormattedDate(language) {
    const today = getMalaysiaDate();
    const locale = language === 'ms' ? 'ms-MY' : 'en-US';
    const weekday = today.toLocaleDateString(locale, { weekday: 'long', timeZone: 'Asia/Kuala_Lumpur' });
    const year = today.toLocaleDateString(locale, { year: 'numeric', timeZone: 'Asia/Kuala_Lumpur' });
    const month = today.toLocaleDateString(locale, { month: 'long', timeZone: 'Asia/Kuala_Lumpur' });
    const day = today.getDate();
    return { weekday, year, month, day };
  }

  function getDailyQuote(language) {
    const today = getMalaysiaDate();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Use day of year to select quote, cycles through all 100 quotes
    const quoteIndex = dayOfYear % quotes.length;
    const quote = quotes[quoteIndex];

    return language === 'ms' ? quote.ms : quote.en;
  }

  const todaysPerson = getTodaysTurn();
  const { weekday, year, month, day } = getFormattedDate(language);
  const dailyQuote = getDailyQuote(language);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100 via-pink-200 to-cyan-100 dark:from-indigo-950 dark:via-fuchsia-800 dark:to-teal-700" />

      {/* Content - centered */}
      <div className="relative h-full flex items-center justify-center p-6">
        <div className="text-center max-w-2xl w-full">
          {/* Date section */}
          <div className="mb-8">
            <p className="text-cyan-700 dark:text-cyan-200 text-xl font-semibold">{day} {month}, {year}</p>
            <p className="text-cyan-700 dark:text-cyan-200 text-base font-light tracking-wide">
              {weekday}
            </p>
          </div>

          {/* Main section */}
          <div>
            {/* Turn label */}
            <p className="text-teal-600 dark:text-teal-300 text-sm font-light tracking-[0.2em] uppercase mb-4">
              {t('todaysTurn')}
            </p>

            {/* Person's name - main focus */}
            <h1 className="text-cyan-900 dark:text-cyan-100 text-5xl md:text-6xl lg:text-8xl font-light tracking-tight leading-none uppercase">
              {todaysPerson}
            </h1>

            {/* Daily quote */}
            <p className="text-cyan-700 dark:text-cyan-300 text-base md:text-lg font-light italic mt-8 max-w-2xl mx-auto">
              "{dailyQuote}"
            </p>
          </div>
        </div>
      </div>

      {/* Toggle buttons - positioned at bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3 p-4 z-50">
        <div className="flex gap-3 p-3 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-full">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default App;
