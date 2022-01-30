import { getBorderSide, paint } from "../../util"
import { Direction } from "../../type"

interface CellProps {
  isFruit: boolean
  isSnakeBody: boolean
  isHead: boolean
  currentDirection: Direction
}

export function Cell({ isFruit, isSnakeBody, isHead, currentDirection }: CellProps) {
  return (
    <div
      className={`
        h-7 w-7 
        border border-gray-100 dark:border-gray-800
        ${isFruit && "transition duration-1000"}
        ${paint(isFruit, isSnakeBody, isHead, getBorderSide(currentDirection))}`}
    />
  )
}
