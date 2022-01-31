import { Direction } from "../../type"
import { isDirectionConflict } from "../../util/other"
import { directionState, useRecoilStateRef } from "../../recoil/atoms"

interface DirectionButtonProps {
  buttonDirection: Direction
}

export function DirectionButton({ buttonDirection }: DirectionButtonProps) {
  const [direction, setDirection] = useRecoilStateRef<Direction>(directionState)
  const disabled = isDirectionConflict(buttonDirection, direction.current)

  return (
    <button
      disabled={disabled}
      onClick={() => setDirection(buttonDirection)}
      type="button"
      className={`  
        w-24 h-16 m-2 transition duration-200 rounded-lg
        bg-gray-200 dark:bg-gray-600 
        ${disabled ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-100 "}
        ${buttonDirection === "up" ? "col-span-3" : "col-span-1"}
      `}
    >
      { buttonDirection.toUpperCase() }
    </button>
  )
}
