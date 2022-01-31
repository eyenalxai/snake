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

export interface wasdListenerProps {
  e: KeyboardEvent
  direction: Direction
  // eslint-disable-next-line no-unused-vars
  setDirection: (dir: Direction) => void
  blockedDirection: Direction
}

export function wasdListener({ e, direction, setDirection, blockedDirection }: wasdListenerProps) {
  const { code } = e

  if (isValidKeypress(code, direction)) {
    switch (code) {
      case "KeyW":
        switchDirection(blockedDirection, setDirection)
        break
      case "KeyA":
        switchDirection(blockedDirection, setDirection)
        break
      case "KeyS":
        switchDirection(blockedDirection, setDirection)
        break
      case "KeyD":
        switchDirection(blockedDirection, setDirection)
        break
      default:
        break
    }
  }
}
