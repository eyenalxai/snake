import { useState } from "react"
import { useRecoilState } from "recoil"
import {
  blockedDirectionState,
  collisionState,
  directionState,
  fruitPositionState,
  headPosState,
  maxScoreState,
  pausedState,
  prevHeadPosState,
  scoreState,
  snakeBodyState,
  snakeSizeState,
  tickrateState,
  useRecoilStateRef
} from "../recoil/atoms"
import { Direction, Position } from "../type"

export const useGameState = () => {
  const [isPaused, setIsPaused] = useRecoilStateRef(pausedState)
  const [sourceUrlShown, setSourceUrlShown] = useState(false)
  const [direction, setDirection] = useRecoilStateRef<Direction>(directionState)
  const [blockedDirection, setBlockedDirection] = useRecoilStateRef<Direction>(blockedDirectionState)
  const [snakeBody, setSnakeBody] = useRecoilStateRef<Position[]>(snakeBodyState)
  const [headPos, setHeadPos] = useRecoilStateRef<Position>(headPosState)
  const [fruitPosition, setFruitPosition] = useRecoilStateRef<Position>(fruitPositionState)
  const [snakeSize, setSnakeSize] = useRecoilStateRef<number>(snakeSizeState)

  const [prevHeadPos, setPrevHeadPos] = useRecoilState(prevHeadPosState)

  const [tickrate, setTickrate] = useRecoilState<number>(tickrateState)
  const [score, setScore] = useRecoilState<number>(scoreState)
  const [maxScore, setMaxScore] = useRecoilState<number>(maxScoreState)
  const [isCollision, setIsCollision] = useRecoilStateRef<boolean>(collisionState)

  return {
    isPaused,
    setIsPaused,
    sourceUrlShown,
    setSourceUrlShown,
    direction,
    setDirection,
    blockedDirection,
    setBlockedDirection,
    snakeBody,
    setSnakeBody,
    headPos,
    setHeadPos,
    fruitPosition,
    setFruitPosition,
    snakeSize,
    setSnakeSize,
    prevHeadPos,
    setPrevHeadPos,
    tickrate,
    setTickrate,
    score,
    setScore,
    maxScore,
    setMaxScore,
    isCollision,
    setIsCollision
  }
}
