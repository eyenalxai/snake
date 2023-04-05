import { useRecoilState } from "recoil"
import { maxScoreState, scoreState } from "../../recoil/atoms"

export const useScoreState = () => {
  const [score, setScore] = useRecoilState<number>(scoreState)
  const [maxScore, setMaxScore] = useRecoilState<number>(maxScoreState)

  return {
    score,
    setScore,
    maxScore,
    setMaxScore
  }
}
