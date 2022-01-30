import { useEffect, useRef, useState } from "react"
import { Direction } from "./type"
import { comparePosition, decreaseSpeed, generateFruitPosition, isValidKeypress, updatePosition } from "./util"
import { Playfield } from "./component/playfield/Playfield"
import { Controls } from "./component/controls/Controls"

export function App() {
  const [headPosition, setHeadPosition] = useState<[number, number]>([6, 6])
  const [fruitPosition, setFruitPosition] = useState(generateFruitPosition(headPosition))

  const [direction, setDirection] = useState<Direction>("up")

  const directionRef = useRef(direction)
  const setDirectionRef = (data: Direction) => {
    directionRef.current = data
    setDirection(data)
  }

  const [speed, setSpeed] = useState(500)
  const [, setSize] = useState(1)

  const [, setScore] = useState(0)

  useEffect(() => {
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

    const interval = setInterval(() => {
      setHeadPosition((currentLoc) => updatePosition(direction, currentLoc))

      if (comparePosition(headPosition, fruitPosition)) {
        setScore((sc) => sc + 10)
        setSize((sz) => sz + 1)
        setFruitPosition(generateFruitPosition)
        setSpeed((sp) => decreaseSpeed(sp))
      }
    }, speed)

    return () => clearInterval(interval)
  }, [direction, fruitPosition, headPosition, speed])

  return (
    <div className="container mx-auto mt-24 max-w-max">
      <Playfield fruitPosition={fruitPosition} headPosition={headPosition} />
      <Controls currentDirection={direction} onClick={setDirection} />
    </div>
  )
}
