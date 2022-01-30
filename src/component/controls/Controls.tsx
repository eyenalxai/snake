import { DIRECTIONS } from "../../config"
import { Direction } from "../../type"
import { DirectionButton } from "./DirectionButton"

export interface ControlsProps {
  currentDirection: Direction
  // eslint-disable-next-line no-unused-vars
  onClick: (dir: Direction) => void
}

export function Controls({ currentDirection, onClick }: ControlsProps) {
  return (
    <div className="flex justify-center">
      <div className="mt-10 inline-grid grid-cols-3 justify-items-center">
        {
          DIRECTIONS.map((dir) => (
            <DirectionButton
              key={dir}
              direction={dir}
              onClick={onClick}
              currentDirection={currentDirection}
            />
          ))
        }
      </div>
    </div>
  )
}
