import { useEffect, useRef, useState } from "react"
import { isEqual } from "lodash"
import { Direction, Position } from "./type"
import {
  checkBodyCollision,
  decreaseSpeed,
  generateFruitPosition,
  isValidKeypress,
  updateBody,
  updatePosition
} from "./util"
import { Playfield } from "./component/playfield/Playfield"
import { Controls } from "./component/controls/Controls"

export function App() {
  const [collision, setCollision] = useState(false)

  const [headPosition, setHeadPosition] = useState<Position>([6, 6])
  const [snakeBody, setSnakeBody] = useState<Position[]>([headPosition])
  const [fruitPosition, setFruitPosition] = useState(generateFruitPosition(snakeBody))

  const [direction, setDirection] = useState<Direction>("up")

  const directionRef = useRef(direction)
  const setDirectionRef = (data: Direction) => {
    directionRef.current = data
    setDirection(data)
  }

  const [speed, setSpeed] = useState(200)
  const [snakeSize, setSnakeSize] = useState(1)

  const [, setScore] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadPosition((currentLoc) => updatePosition(direction, currentLoc))
      if (checkBodyCollision(snakeBody, headPosition)) setCollision(true)

      if (isEqual(headPosition, fruitPosition)) {
        setScore((sc) => sc + 10)
        setSnakeSize((sz) => sz + 1)
        setFruitPosition(generateFruitPosition(snakeBody))
        setSpeed((sp) => decreaseSpeed(sp))
      }
      if (!collision) setSnakeBody(updateBody(snakeBody, headPosition, snakeSize))
    }, speed)

    window.addEventListener("keypress", (e) => {
      const { key } = e
      if (isValidKeypress(key, directionRef.current)) {
        switch (key) {
          case "w":
            setDirectionRef("up")
            break
          case "a":
            setDirectionRef("left")
            break
          case "s":
            setDirectionRef("down")
            break
          case "d":
            setDirectionRef("right")
            break
          default:
            break
        }
      }
    })

    return () => clearInterval(interval)
  }, [direction, collision, fruitPosition, headPosition, snakeBody, snakeSize, speed])

  return (
    <div className="container mx-auto mt-24 max-w-max">
      <Playfield fruitPosition={fruitPosition} snakeBody={snakeBody} />
      <Controls currentDirection={direction} onClick={setDirection} />
    </div>
  )
}
