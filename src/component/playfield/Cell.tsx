import { paint } from "../../util"

interface CellProps {
  isFruit: boolean
  isSnakeBody: boolean
}

export function Cell({ isFruit, isSnakeBody }: CellProps) {
  return (
    <div className={`h-7 w-7  border border-gray-400 ${paint(isFruit, isSnakeBody)}`} />
  )
}
