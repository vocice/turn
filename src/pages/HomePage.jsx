import TurnPage from "../components/turn-page"

export default function HomePage() {
  return (
    <TurnPage
      names={['Hayfa Izara', 'Hafiya Inara']}
      startDateIso="2025-01-01T00:00:00+08:00"
      bgClass="bg-[#fff6e9] dark:bg-[#1c1733]"
      pillEmoji="📅"
    />
  )
}
