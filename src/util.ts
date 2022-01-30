import { isEqual, random } from "lodash"
import { DIMENSIONS } from "./config"
import { Direction, Position } from "./type"

export function decreaseSpeed(speed: number) {
  return speed <= 100 ? speed : speed - 10
}

export function comparePosition(first: Position, second: Position) {
  return isEqual(first, second)
}

export function paint(celLoc: Position, headLoc: Position, fruitLoc: Position) {
  if (comparePosition(celLoc, headLoc)) return "bg-gray-400"
  if (comparePosition(celLoc, fruitLoc)) return "bg-gray-600"
  return "bg-gray-300"
}

export function updatePosition(direction: Direction, currentPosition: Position): [number, number] {
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

export function generateFruitPosition(headLoc: Position) {
  let fruitLoc: Position = getRandomPosition()
  while (isEqual(fruitLoc, headLoc)) {
    fruitLoc = getRandomPosition()
  }
  return fruitLoc
}

export function isDirectionConflict(direction: Direction, currentDirection: Direction) {
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

export function isValidKeypress(key: string, currentDirection: Direction) {
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
