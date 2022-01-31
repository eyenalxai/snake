import { MIN_TICKRATE, TICKRATE_MULTIPLIER } from "../config"

export function decreaseTickrate(speed: number): number {
  const futureTickRate = Number((speed * TICKRATE_MULTIPLIER).toFixed(0))
  return futureTickRate >= MIN_TICKRATE ? futureTickRate : MIN_TICKRATE
}
