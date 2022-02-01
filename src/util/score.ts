import { Position } from "../type"
import { LOCALSTORAGE_MAX_SCORE_KEY, STARTING_TICKRATE } from "../config"

function getDistance(a: Position, b: Position): number {
  const x = a[0] - b[0]
  const y = a[1] - b[1]

  return Number(Math.sqrt(x ** 2 + y ** 2).toFixed(0))
}

export function scoreAddition(headPosition: Position, fruitPosition: Position, size: number, tickrate: number) {
  return Number(
    ((getDistance(headPosition, fruitPosition) * size * (STARTING_TICKRATE - tickrate + 1)) / 10 + size).toFixed(0)
  )
}

export function getScoreFromLocalStorage(): number {
  const score = localStorage.getItem(LOCALSTORAGE_MAX_SCORE_KEY)
  if (score) return Number(score)
  return 0
}
