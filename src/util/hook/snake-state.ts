import { useRecoilState } from "recoil"
import {
  blockedDirectionState,
  directionState,
  headPosState,
  prevHeadPosState,
  snakeBodyState,
  snakeSizeState,
  useRecoilStateRef
} from "../../recoil/atoms"
import { Direction, Position } from "../../type"

export const useSnakeState = () => {
  const [direction, setDirection] = useRecoilStateRef<Direction>(directionState)
  const [blockedDirection, setBlockedDirection] = useRecoilStateRef<Direction>(blockedDirectionState)
  const [snakeBody, setSnakeBody] = useRecoilStateRef<Position[]>(snakeBodyState)
  const [headPos, setHeadPos] = useRecoilStateRef<Position>(headPosState)
  const [prevHeadPos, setPrevHeadPos] = useRecoilState(prevHeadPosState)
  const [snakeSize, setSnakeSize] = useRecoilStateRef<number>(snakeSizeState)

  return {
    direction,
    setDirection,
    blockedDirection,
    setBlockedDirection,
    snakeBody,
    setSnakeBody,
    headPos,
    setHeadPos,
    prevHeadPos,
    setPrevHeadPos,
    snakeSize,
    setSnakeSize
  }
}
