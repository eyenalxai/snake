import { isEqual, random } from "lodash"
import { Direction, Position } from "../type"
import { DIMENSIONS } from "../config"

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
