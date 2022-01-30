import { Score } from "./Score"
import { Restart } from "./Restart"

interface MenuProps {
  score: number
  maxScore: number
  isCollision: boolean
  restart: () => void
}

export function Menu({ score, maxScore, isCollision, restart }: MenuProps) {
  return (
    <div className="flex justify-between items-center h-10 mb-2">
      <Score score={score} maxScore={maxScore} />
      <Restart isCollision={isCollision} restart={restart} />
    </div>
  )
}
