import TurnPage from "../components/turn-page"

export default function CarPage() {
  return (
    <TurnPage
      names={['Hayfa Izara', 'Hafiya Inara', 'Hail Idlan']}
      startDateIso="2026-04-30T00:00:00+08:00"
      bgClass="bg-[#eef7ff] dark:bg-[#121a36]"
      pillEmoji="📅"
    />
  )
}
