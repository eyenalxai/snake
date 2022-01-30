import { Direction } from "../../type"
import { isDirectionConflict } from "../../util"
import { ControlsProps } from "./Controls"

interface DirectionButtonProps {
  direction: Direction
}

export function DirectionButton({ direction, currentDirection, onClick }: ControlsProps & DirectionButtonProps) {
  const disabled = isDirectionConflict(direction, currentDirection)

  return (
    <button
      disabled={disabled}
      onClick={() => onClick(direction)}
      type="button"
      className={`  
        w-24 h-16 m-2 transition duration-200 rounded-lg
        bg-gray-200 dark:bg-gray-600 
        ${disabled ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-100 "}
        ${direction === "up" ? "col-span-3" : "col-span-1"}
      `}
    >
      {direction.toUpperCase()}
    </button>
  )
}
