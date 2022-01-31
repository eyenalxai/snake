import { useRecoilValue } from "recoil"
import { maxScoreState, scoreState } from "../../recoil/atoms"

export function Score() {
  const score = useRecoilValue<number>(scoreState)
  const maxScore = useRecoilValue<number>(maxScoreState)

  return (
    <div className="flex">
      <p className="mr-2 text-gray-500">SCR</p>
      <p className="text-gray-800 dark:text-gray-300">{ score }</p>
      <p className="ml-4 text-gray-500">MAX SCR</p>
      <p className="ml-2 text-gray-800 dark:text-gray-300">{ maxScore }</p>
    </div>
  )
}
