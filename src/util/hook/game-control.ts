import { useRecoilState } from "recoil"
import { pausedState, tickrateState, useRecoilStateRef } from "../../recoil/atoms"

export const useGameControl = () => {
  const [isPaused, setIsPaused] = useRecoilStateRef(pausedState)
  const [tickrate, setTickrate] = useRecoilState<number>(tickrateState)

  return {
    isPaused,
    setIsPaused,
    tickrate,
    setTickrate
  }
}
