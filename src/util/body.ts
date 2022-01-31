import _, { isEqual } from "lodash"
import { Direction, Position } from "../type"
import { updatePosition } from "./position"

export function updateBody(snakeBody: Position[], direction: Direction, size: number): Position[] {
  snakeBody.push(updatePosition(direction, _.last(snakeBody)!))
  return snakeBody.slice(-size)
}

export function checkCollision(snakeBody: Position[]) {
  return snakeBody.some((pos1) => {
    let count = 0
    snakeBody.forEach((pos2) => {
      if (isEqual(pos1, pos2)) {
        count += 1
      }
    })
    return count >= 2
  })
}
