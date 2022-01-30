import { Score } from "./Score"
import { Restart } from "./Restart"

interface MenuProps {
  score: number
  isCollision: boolean
  restart: () => void
}

export function Menu({ score, isCollision, restart }: MenuProps) {
  return (
    <div className="flex justify-between h-10">
      <Score score={score} />
      <Restart isCollision={isCollision} restart={restart} />
    </div>
  )
}
