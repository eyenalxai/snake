// eslint-disable-next-line no-unused-vars
import { Direction } from "../type"

export function switchDirection(
  blockedDirection: Direction,
  // eslint-disable-next-line no-unused-vars
  setDirection: (dir: Direction) => void,
  direction: Direction
) {
  if (blockedDirection !== direction) {
    setDirection(direction)
  }
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

// eslint-disable-next-line consistent-return
export function mapDirectionToWASD(direction: Direction) {
  // eslint-disable-next-line default-case
  switch (direction) {
    case "up":
      return "W"
    case "left":
      return "A"
    case "down":
      return "S"
    case "right":
      return "D"
  }
}

// eslint-disable-next-line consistent-return
export function getOppositeDirection(direction: Direction): Direction {
  // eslint-disable-next-line default-case
  switch (direction) {
    case "up":
      return "down"
    case "left":
      return "right"
    case "right":
      return "left"
    case "down":
      return "up"
  }
}
