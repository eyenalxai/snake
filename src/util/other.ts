import { MIN_TICKRATE, TICKRATE_MULTIPLIER } from "../config"
import { Direction } from "../type"

export function decreaseTickrate(speed: number): number {
  const futureTickRate = Number((speed * TICKRATE_MULTIPLIER).toFixed(0))
  return futureTickRate >= MIN_TICKRATE ? futureTickRate : MIN_TICKRATE
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
