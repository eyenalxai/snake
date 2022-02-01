import { Direction } from "../type"
import { isDirectionConflict, switchDirection } from "./direction"

function isValidKeypress(key: string, currentDirection: Direction): boolean {
  if (!["KeyW", "KeyA", "KeyS", "KeyD"].includes(key)) return false

  switch (key) {
    case "KeyW":
      return !isDirectionConflict("up", currentDirection)
    case "KeyA":
      return !isDirectionConflict("left", currentDirection)
    case "KeyS":
      return !isDirectionConflict("down", currentDirection)
    case "KeyD":
      return !isDirectionConflict("right", currentDirection)
    default:
      return false
  }
}

export interface EscapeListenerProps {
  e: KeyboardEvent
  // eslint-disable-next-line no-unused-vars
  setIsPaused: (state: boolean) => void
  isCollision: boolean
  isPaused: boolean
}

export function escapeListener({ e, setIsPaused, isCollision, isPaused }: EscapeListenerProps) {
  if (e.code === "Escape" && !isCollision) {
    setIsPaused(!isPaused)
  }
}

export interface WasdListenerProps {
  e: KeyboardEvent
  direction: Direction
  // eslint-disable-next-line no-unused-vars
  setDirection: (dir: Direction) => void
  blockedDirection: Direction
  isCollision: boolean
  isPaused: boolean
}

export function wasdListener({
  e,
  direction,
  setDirection,
  blockedDirection,
  isCollision,
  isPaused
}: WasdListenerProps) {
  const { code } = e

  if (isValidKeypress(code, direction) && !isCollision && !isPaused) {
    switch (code) {
      case "KeyW":
        switchDirection(blockedDirection, setDirection, "up")
        break
      case "KeyA":
        switchDirection(blockedDirection, setDirection, "left")
        break
      case "KeyS":
        switchDirection(blockedDirection, setDirection, "down")
        break
      case "KeyD":
        switchDirection(blockedDirection, setDirection, "right")
        break
      default:
        break
    }
  }
}
