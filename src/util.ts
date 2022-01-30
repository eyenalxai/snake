import { isEqual, random } from "lodash"
import { MutableRefObject } from "react"
import { DIMENSIONS, MIN_SPEED, SPEED_STEP } from "./config"
import { Direction, Position } from "./type"

export function decreaseSpeed(speed: number): number {
  return speed <= MIN_SPEED ? speed : speed - SPEED_STEP
}

export function paint(isFruit: boolean, isSnakeBody: boolean, isHead: boolean, direction: string): string {
  if (isHead) {
    return `bg-gray-500 dark:bg-gray-400
    border-${direction}-gray-900  dark:border-${direction}-amber-500 border-${direction}-4 dark:border-${direction}-4`
  }
  if (isSnakeBody) return "bg-gray-400 dark:bg-gray-500"
  if (isFruit) return "bg-green-300 dark:bg-green-300"
  return "bg-gray-200 dark:bg-gray-700"
}

export function updatePosition(direction: Direction, currentPosition: Position): Position {
  const [x, y] = currentPosition
  switch (direction) {
    case "right":
      return [x + 1 < DIMENSIONS ? x + 1 : 0, y]
    case "left":
      return [x - 1 < 0 ? DIMENSIONS - 1 : x - 1, y]
    case "up":
      return [x, y + 1 < DIMENSIONS ? y + 1 : 0]
    case "down":
      return [x, y - 1 < 0 ? DIMENSIONS - 1 : y - 1]
    default:
      return currentPosition
  }
}

function getRandomPosition(): Position {
  return [random(0, DIMENSIONS - 1, false), random(0, DIMENSIONS - 1, false)]
}

export function generateFruitPosition(snakeBody: Position[]): Position {
  let fruitLoc: Position = getRandomPosition()
  // eslint-disable-next-line no-loop-func
  while (snakeBody.some((position) => isEqual(position, fruitLoc))) {
    fruitLoc = getRandomPosition()
  }
  return fruitLoc
}

export function isDirectionConflict(direction: Direction, currentDirection: Direction): boolean {
  if (direction === currentDirection) {
    return true
  }

  switch (direction) {
    case "left":
      if (currentDirection === "right" || currentDirection === "left") return true
      break
    case "right":
      if (currentDirection === "right" || currentDirection === "left") return true
      break
    case "up":
      if (currentDirection === "up" || currentDirection === "down") return true
      break
    case "down":
      if (currentDirection === "up" || currentDirection === "down") return true
      break
    default:
      return false
  }

  return false
}

export function isValidKeypress(key: string, currentDirection: Direction): boolean {
  if (!["w", "a", "s", "d"].includes(key)) return false

  switch (key) {
    case "w":
      return !isDirectionConflict("up", currentDirection)
    case "a":
      return !isDirectionConflict("left", currentDirection)
    case "s":
      return !isDirectionConflict("down", currentDirection)
    case "d":
      return !isDirectionConflict("right", currentDirection)
    default:
      return false
  }
}

export function updateBody(snakeBody: Position[], headPosition: Position, size: number): Position[] {
  snakeBody.push(headPosition)
  return snakeBody.slice(-size)
}

export function checkBodyCollision(snakeBody: Position[], headPosition: Position): boolean {
  if (snakeBody.length >= 1) return snakeBody.filter((pos) => isEqual(pos, headPosition)).length > 0
  return false
}

// eslint-disable-next-line consistent-return
export function getBorderSide(direction: Direction): string {
  // eslint-disable-next-line default-case
  switch (direction) {
    case "up":
      return "t"
    case "down":
      return "b"
    case "left":
      return "l"
    case "right":
      return "r"
  }
}

export function wasdListener(
  e: KeyboardEvent,
  directionRef: MutableRefObject<Direction>,
  // eslint-disable-next-line no-unused-vars
  setDirectionRef: (dir: Direction) => void
) {
  const { key } = e
  if (isValidKeypress(key, directionRef.current)) {
    switch (key) {
      case "w":
        setDirectionRef("up")
        break
      case "a":
        setDirectionRef("left")
        break
      case "s":
        setDirectionRef("down")
        break
      case "d":
        setDirectionRef("right")
        break
      default:
        break
    }
  }
}
