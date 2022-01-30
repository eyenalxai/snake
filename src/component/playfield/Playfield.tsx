import { range } from "lodash"
import { DIMENSIONS } from "../../config"
import { Cell } from "./Cell"
import { Position } from "../../type"

interface PlayfieldProps {
  headPosition: Position
  fruitPosition: Position
}

export function Playfield({ headPosition, fruitPosition }: PlayfieldProps) {
  return (
    <div className={`inline-grid grid-cols-${DIMENSIONS} border border-gray-400 rounded`}>
      {
        range(DIMENSIONS).map((idy) => range(DIMENSIONS).map((idx) => {
          const [x, y] = [idx, DIMENSIONS - idy - 1]
          return (
            <Cell key={`x-${x} y-${y}`} x={x} y={y} headPosition={headPosition} fruitPosition={fruitPosition} />
          )
        }))
      }
    </div>
  )
}
