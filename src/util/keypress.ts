import { Direction } from "../type"
import { isDirectionConflict } from "./other"

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

export interface wasdListenerProps {
  e: KeyboardEvent
  direction: Direction
  // eslint-disable-next-line no-unused-vars
  setDirection: (dir: Direction) => void
}

export function wasdListener({ e, direction, setDirection }: wasdListenerProps) {
  const { code } = e

  if (isValidKeypress(code, direction)) {
    switch (code) {
      case "KeyW":
        setDirection("up")
        break
      case "KeyA":
        setDirection("left")
        break
      case "KeyS":
        setDirection("down")
        break
      case "KeyD":
        setDirection("right")
        break
      default:
        break
    }
  }
}
