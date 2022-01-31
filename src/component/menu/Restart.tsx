import { useRecoilValue } from "recoil"
import { collisionState } from "../../recoil/atoms"

interface RestartProps {
  restart: () => void
}

export function Restart({ restart }: RestartProps) {
  const isCollision = useRecoilValue<boolean>(collisionState)

  if (!isCollision) return null

  return (
    <button
      className="text-gray-700 dark:text-gray-300 bg-gray-300 dark:bg-gray-700 w-28 h-8 rounded"
      type="button"
      onClick={restart}
    >
      RESTART
    </button>
  )
}
