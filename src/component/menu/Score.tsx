export function Score({ score, maxScore }: { score: number, maxScore: number }) {
  return (
    <div className="flex">
      <p className="mr-2 text-gray-500">SCR</p>
      <p className="text-gray-800 dark:text-gray-300">{score}</p>
      <p className="ml-4 text-gray-500">MAX SCR</p>
      <p className="ml-2 text-gray-800 dark:text-gray-300">{maxScore}</p>
    </div>
  )
}
