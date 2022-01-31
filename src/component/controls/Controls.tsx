import { MutableRefObject } from "react"
import { DIRECTIONS } from "../../config"
import { DirectionButton } from "./DirectionButton"
import { Direction } from "../../type"

export function Controls({ directionRef }: { directionRef: MutableRefObject<Direction> }) {
  return (
    <div className="flex justify-center">
      <div className="mt-10 inline-grid grid-cols-3 justify-items-center">
        {DIRECTIONS.map((direction) => (
          <DirectionButton directionRef={directionRef} key={direction} buttonDirection={direction} />
        ))}
      </div>
    </div>
  )
}
