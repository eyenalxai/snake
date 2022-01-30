import { MutableRefObject } from "react"
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

export function wasdListener(
  e: KeyboardEvent,
  directionRef: MutableRefObject<Direction>,
  // eslint-disable-next-line no-unused-vars
  setDirectionRef: (dir: Direction) => void
) {
  const { code } = e
  if (isValidKeypress(code, directionRef.current)) {
    switch (code) {
      case "KeyW":
        setDirectionRef("up")
        break
      case "KeyA":
        setDirectionRef("left")
        break
      case "KeyS":
        setDirectionRef("down")
        break
      case "KeyD":
        setDirectionRef("right")
        break
      default:
        break
    }
  }
}
