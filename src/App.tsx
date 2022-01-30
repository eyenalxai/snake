import { useEffect, useRef, useState } from "react"
import { Direction, Position } from "./type"
import {
  comparePosition,
  decreaseSpeed,
  generateFruitPosition,
  isValidKeypress,
  updateBody,
  updatePosition
} from "./util"
import { Playfield } from "./component/playfield/Playfield"
import { Controls } from "./component/controls/Controls"

export function App() {
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

      if (comparePosition(headPosition, fruitPosition)) {
        setScore((sc) => sc + 10)
        setSnakeSize((sz) => sz + 1)
        setFruitPosition(generateFruitPosition(snakeBody))
        setSpeed((sp) => decreaseSpeed(sp))
      }

      setSnakeBody(updateBody(snakeBody, headPosition, snakeSize))
    }, speed)

    // @ts-ignore
    // eslint-disable-next-line consistent-return
    window.addEventListener("keypress", (e) => {
      const { key } = e
      if (isValidKeypress(key, directionRef.current)) {
        switch (key) {
          case "w":
            setDirectionRef("up")
            return () => clearInterval(interval)
          case "a":
            setDirectionRef("left")
            return () => clearInterval(interval)
          case "s":
            setDirectionRef("down")
            return () => clearInterval(interval)
          case "d":
            setDirectionRef("right")
            return () => clearInterval(interval)
          default:
        }
      }
    })

    return () => clearInterval(interval)
  }, [direction, fruitPosition, headPosition, snakeBody, snakeSize, speed])

  return (
    <div className="container mx-auto mt-24 max-w-max">
      <Playfield fruitPosition={fruitPosition} snakeBody={snakeBody} />
      <Controls currentDirection={direction} onClick={setDirection} />
    </div>
  )
}
