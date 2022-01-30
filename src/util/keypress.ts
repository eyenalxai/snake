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

export interface wasdListenerProps {
  e: KeyboardEvent
  directionRef: MutableRefObject<Direction>
  // eslint-disable-next-line no-unused-vars
  setDirectionRef: (dir: Direction) => void
  headWasTurnedThisMoveRef: MutableRefObject<boolean>
  // eslint-disable-next-line no-unused-vars
  setHeadWasTurnedThisMoveRef: (kek: boolean) => void
}

export function wasdListener({
  e,
  directionRef,
  setDirectionRef,
  headWasTurnedThisMoveRef,
  setHeadWasTurnedThisMoveRef
}: wasdListenerProps) {
  const { code } = e

  if (!headWasTurnedThisMoveRef.current && isValidKeypress(code, directionRef.current)) {
    switch (code) {
      case "KeyW":
        setDirectionRef("up")
        setHeadWasTurnedThisMoveRef(true)
        break
      case "KeyA":
        setDirectionRef("left")
        setHeadWasTurnedThisMoveRef(true)
        break
      case "KeyS":
        setDirectionRef("down")
        setHeadWasTurnedThisMoveRef(true)
        break
      case "KeyD":
        setDirectionRef("right")
        setHeadWasTurnedThisMoveRef(true)
        break
      default:
        break
    }
  }
}
