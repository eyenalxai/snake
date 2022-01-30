import { isEqual, range } from "lodash"
import { DIMENSIONS } from "../../config"
import { Cell } from "./Cell"
import { Position } from "../../type"

interface PlayfieldProps {
  snakeBody: Position[]
  fruitPosition: Position
}

export function Playfield({ snakeBody, fruitPosition }: PlayfieldProps) {
  return (
    <div className={`inline-grid grid-cols-${DIMENSIONS} border border-gray-400 rounded`}>
      {
        range(DIMENSIONS).map((idy) => range(DIMENSIONS).map((idx) => {
          const [x, y] = [idx, DIMENSIONS - idy - 1]
          const isSnakeBody = snakeBody.some((kek) => isEqual(kek, [x, y]))
          return (
            <Cell key={`x-${x} y-${y}`} isFruit={isEqual([x, y], fruitPosition)} isSnakeBody={isSnakeBody} />
          )
        }))
      }
    </div>
  )
}
