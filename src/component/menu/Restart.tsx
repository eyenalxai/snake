import { useRecoilValue } from "recoil"
import { collisionState, pausedState } from "../../recoil/atoms"

interface RestartProps {
  restart: () => void
  toggleIsPaused: () => void
}

export function Restart({ restart, toggleIsPaused }: RestartProps) {
  const isCollision = useRecoilValue<boolean>(collisionState)
  const isPaused = useRecoilValue(pausedState)

  return (
    <button
      className="w-24 h-8 rounded transition duration-300 outline-none
        text-indigo-500 dark:text-indigo-200 
        bg-gray-100 hover:bg-indigo-100 dark:bg-gray-800 hover:dark:bg-indigo-900"
      type="button"
      onClick={isCollision ? restart : toggleIsPaused}
    >
      {
        // eslint-disable-next-line no-nested-ternary
        isCollision ? "RESTART" : isPaused ? "UNPAUSE" : "PAUSE"
      }
    </button>
  )
}
