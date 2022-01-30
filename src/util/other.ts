import { LOCALSTORE_MAX_SCORE, MIN_SPEED, SPEED_STEP } from "../config"
import { Direction } from "../type"

export function decreaseSpeed(speed: number): number {
  return speed <= MIN_SPEED ? speed : speed - SPEED_STEP
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

export function getScoreFromLocalStorage(): number {
  const score = localStorage.getItem(LOCALSTORE_MAX_SCORE)
  if (score) return Number(score)
  return 0
}
