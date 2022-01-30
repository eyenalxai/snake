export function Score({ score }: { score: number }) {
  return (
    <div className="flex">
      <p className="mr-2 text-gray-500">SCR</p>
      <p className="text-gray-800 dark:text-gray-300">{score}</p>
    </div>
  )
}
