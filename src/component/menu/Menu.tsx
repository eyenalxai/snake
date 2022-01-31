import { Score } from "./Score"
import { Restart } from "./Restart"

interface MenuProps {
  restart: () => void
}

export function Menu({ restart }: MenuProps) {
  return (
    <div className="flex justify-between items-center h-10 mb-2">
      <Score />
      <Restart restart={restart} />
    </div>
  )
}
