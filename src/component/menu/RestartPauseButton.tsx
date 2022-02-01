import { useRecoilValue } from "recoil"
import { collisionState, pausedState } from "../../recoil/atoms"

interface RestartProps {
  restart: () => void
  toggleIsPaused: () => void
}

export function RestartPauseButton({ restart, toggleIsPaused }: RestartProps) {
  const isCollision = useRecoilValue<boolean>(collisionState)
  const isPaused = useRecoilValue(pausedState)

  return (
    <button
      className="w-24 h-8 rounded transition duration-300 outline-none
      text-gray-500 dark:hover:text-gray-300
      bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 "
      type="button"
      onClick={isCollision ? restart : toggleIsPaused}
    >
      {
        // eslint-disable-next-line no-nested-ternary
        isCollision ? "WIPE" : isPaused ? "MOVE" : "HALT"
      }
    </button>
  )
}
