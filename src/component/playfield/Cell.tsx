import { paint } from "../../util"
import { Position } from "../../type"

interface CellProps {
  x: number
  y: number
  headPosition: Position
  fruitPosition: Position
}

export function Cell({ x, y, headPosition, fruitPosition }: CellProps) {
  return (
    <div
      key={`x-${x} y-${y}`}
      className={`h-7 w-7  border border-gray-400 ${paint([x, y], headPosition, fruitPosition)}`}
    />
  )
}
