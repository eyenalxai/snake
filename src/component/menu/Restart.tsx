interface RestartProps {
  isCollision: boolean
  restart: () => void
}

export function Restart({ isCollision, restart }: RestartProps) {
  if (!isCollision) return null

  return (
    <button
      className="text-gray-700 dark:text-gray-300 ml-2 bg-gray-300 dark:bg-gray-700 w-28 h-8  rounded mb-2"
      type="button"
      onClick={restart}
    >
      RESTART
    </button>
  )
}
