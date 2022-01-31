import { DIRECTIONS } from "../../config"
import { DirectionButton } from "./DirectionButton"

export function Controls() {
  return (
    <div className="flex justify-center">
      <div className="mt-10 inline-grid grid-cols-3 justify-items-center">
        { DIRECTIONS.map((direction) => (
          <DirectionButton key={direction} buttonDirection={direction} />
        )) }
      </div>
    </div>
  )
}
