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
      className={`w-24 h-14 transition bg-gray-300
        ${disabled ? "text-gray-500" : "text-gray-800"}
        ${direction === "up" ? "col-span-3" : "col-span-1"}
        rounded p-1 m-1
      `}
    >
      {direction.toUpperCase()}
    </button>
  )
}
