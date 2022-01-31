import { MutableRefObject } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Direction } from "../../type"
import { isDirectionConflict, mapDirectionToWASD } from "../../util/direction"
import { blockedDirectionState, directionState } from "../../recoil/atoms"

interface DirectionButtonProps {
  buttonDirection: Direction
  directionRef: MutableRefObject<Direction>
}

export function DirectionButton({ buttonDirection, directionRef }: DirectionButtonProps) {
  const setDirection = useSetRecoilState<Direction>(directionState)
  const blockedDirection = useRecoilValue(blockedDirectionState)
  const disabled = isDirectionConflict(buttonDirection, directionRef.current) || buttonDirection === blockedDirection

  return (
    <button
      disabled={disabled}
      onClick={() => {
        if (buttonDirection !== blockedDirection) {
          // eslint-disable-next-line no-param-reassign
          directionRef.current = buttonDirection
          setDirection(buttonDirection)
        }
      }}
      type="button"
      className={`  
        w-24 h-16 m-2 transition duration-200 rounded-lg
        bg-gray-200 dark:bg-gray-600 
        ${disabled ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-100 "}
        ${buttonDirection === "up" ? "col-span-3" : "col-span-1"}
      `}
    >
      {mapDirectionToWASD(buttonDirection)}
    </button>
  )
}
