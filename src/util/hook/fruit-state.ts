import { fruitPositionState, useRecoilStateRef } from "../../recoil/atoms"
import { Position } from "../../type"

export const useFruitState = () => {
  const [fruitPosition, setFruitPosition] = useRecoilStateRef<Position>(fruitPositionState)

  return {
    fruitPosition,
    setFruitPosition
  }
}
