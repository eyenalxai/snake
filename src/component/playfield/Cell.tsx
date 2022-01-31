import { useRecoilValue } from "recoil"
import { getBorderSide, getCellColors } from "../../util/colors"
import { directionState } from "../../recoil/atoms"

interface CellProps {
  isFruit: boolean
  isSnakeBody: boolean
  isHead: boolean
}

export function Cell({ isFruit, isSnakeBody, isHead }: CellProps) {
  const direction = useRecoilValue(directionState)

  return (
    <div
      className={`
        h-7 w-7 
        border border-gray-100 dark:border-gray-800
        ${isFruit && "transition duration-1000"}
        ${getCellColors(isFruit, isSnakeBody, isHead, getBorderSide(direction))}`}
    />
  )
}
