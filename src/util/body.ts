import { isEqual } from "lodash"
import { Position } from "../type"

export function updateBody(snakeBody: Position[], headPosition: Position, size: number): Position[] {
  snakeBody.push(headPosition)
  return snakeBody.slice(-size)
}

export function checkBodyCollision(snakeBody: Position[], headPosition: Position): boolean {
  if (snakeBody.length >= 1) return snakeBody.filter((pos) => isEqual(pos, headPosition)).length > 0
  return false
}
