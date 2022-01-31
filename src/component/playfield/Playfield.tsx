import { isEqual, range } from "lodash"
import { forwardRef } from "react"
import { useRecoilValue } from "recoil"
import { DIMENSIONS } from "../../config"
import { Cell } from "./Cell"
import { fruitPositionState, headPosState, snakeBodyState } from "../../recoil/atoms"

type Props = {}

export const Playfield = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const fruitPosition = useRecoilValue(fruitPositionState)
  const snakeBody = useRecoilValue(snakeBodyState)
  const headPos = useRecoilValue(headPosState)

  return (
    <div ref={ref} className={`inline-grid grid-cols-${DIMENSIONS}`}>
      { range(DIMENSIONS).map((idy) => range(DIMENSIONS).map((idx) => {
        const [x, y] = [idx, DIMENSIONS - idy - 1]

        return (
          <Cell
            key={`x-${x} y-${y}`}
            isFruit={isEqual([x, y], fruitPosition)}
            isSnakeBody={snakeBody.some((kek) => isEqual(kek, [x, y]))}
            isHead={isEqual([x, y], headPos)}
          />
        )
      })) }
    </div>
  )
})
