import { useEffect, useRef, useState } from "react"
import { isEqual } from "lodash"
import { Direction, Position } from "./type"
import {
  checkBodyCollision,
  decreaseSpeed,
  generateFruitPosition, getScoreFromLocalStorage,
  updateBody,
  updatePosition,
  wasdListener
} from "./util"
import { Playfield } from "./component/playfield/Playfield"
import { Controls } from "./component/controls/Controls"
import { Container } from "./component/Container"
import { LOCALSTORE_MAX_SCORE, STARTING_HEAD_POSITION, STARTING_SNAKE_SIZE, STARTING_SPEED } from "./config"
import { Menu } from "./component/menu/Menu"

export function App() {
  const [isCollision, setIsCollision] = useState(false)

  const [headPosition, setHeadPosition] = useState<Position>(STARTING_HEAD_POSITION)
  const [snakeBody, setSnakeBody] = useState<Position[]>([STARTING_HEAD_POSITION])
  const [fruitPosition, setFruitPosition] = useState(generateFruitPosition([STARTING_HEAD_POSITION]))

  const [direction, setDirection] = useState<Direction>("up")

  const directionRef = useRef(direction)
  const setDirectionRef = (data: Direction) => {
    directionRef.current = data
    setDirection(data)
  }

  const [speed, setSpeed] = useState(STARTING_SPEED)
  const [snakeSize, setSnakeSize] = useState(STARTING_SNAKE_SIZE)

  const [score, setScore] = useState<number>(0)
  const [maxScore, setMaxScore] = useState<number>(getScoreFromLocalStorage())

  const playfieldRef = useRef<HTMLDivElement>(null)

  function restart() {
    if (playfieldRef.current) playfieldRef.current.focus()
    setHeadPosition(STARTING_HEAD_POSITION)
    setSnakeBody([STARTING_HEAD_POSITION])
    setDirection("up")

    setSpeed(STARTING_SPEED)
    setSnakeSize(STARTING_SNAKE_SIZE)

    setScore(0)
    setMaxScore(getScoreFromLocalStorage())

    setIsCollision(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (checkBodyCollision(snakeBody, updatePosition(direction, headPosition))) {
        setIsCollision(true)
        if (score > maxScore) localStorage.setItem(LOCALSTORE_MAX_SCORE, String(score))
      }

      if (!isCollision) {
        setHeadPosition(updatePosition(direction, headPosition))
        setSnakeBody(updateBody(snakeBody, headPosition, snakeSize))

        if (isEqual(headPosition, fruitPosition)) {
          setSnakeSize((sz) => sz + 1)
          setScore((sc) => sc + snakeSize + 1)
          setFruitPosition(generateFruitPosition(snakeBody))
          setSpeed((sp) => decreaseSpeed(sp))
        }
      }
    }, speed)

    window.addEventListener("keypress", (e) => wasdListener(e, directionRef, setDirectionRef))

    return () => clearInterval(interval)
  }, [direction, isCollision, fruitPosition, headPosition, snakeBody, snakeSize, speed, score, maxScore])

  return (
    <Container>
      <Menu score={score} maxScore={maxScore} isCollision={isCollision} restart={() => restart()} />

      <Playfield
        ref={playfieldRef}
        fruitPosition={fruitPosition}
        snakeBody={snakeBody}
        headPosition={headPosition}
        currentDirection={direction}
      />
      <Controls currentDirection={direction} onClick={setDirection} />
    </Container>
  )
}
