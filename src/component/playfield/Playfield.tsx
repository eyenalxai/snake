import { isEqual, range } from "lodash"
import { forwardRef, PropsWithChildren } from "react"
import { DIMENSIONS } from "../../config"
import { Cell } from "./Cell"
import { Direction, Position } from "../../type"

interface PlayfieldProps {
  snakeBody: Position[]
  fruitPosition: Position
  headPosition: Position
  currentDirection: Direction
}

export const Playfield = forwardRef<HTMLDivElement, PropsWithChildren<PlayfieldProps>>(({
  snakeBody,
  fruitPosition,
  headPosition,
  currentDirection

}: PlayfieldProps, ref) => (
  <div ref={ref} className={`inline-grid grid-cols-${DIMENSIONS}`}>
    {
      range(DIMENSIONS).map((idy) => range(DIMENSIONS).map((idx) => {
        const [x, y] = [idx, DIMENSIONS - idy - 1]

        return (
          <Cell
            key={`x-${x} y-${y}`}
            isFruit={isEqual([x, y], fruitPosition)}
            isSnakeBody={snakeBody.some((kek) => isEqual(kek, [x, y]))}
            isHead={isEqual([x, y], headPosition)}
            currentDirection={currentDirection}
          />
        )
      }))
    }
  </div>
))
