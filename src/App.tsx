import { useEffect, useRef, useState } from "react"
import { isEqual } from "lodash"
import { Direction, Position } from "./type"
import { decreaseTickrate } from "./util/other"
import { Playfield } from "./component/playfield/Playfield"
import { Controls } from "./component/controls/Controls"
import { Container } from "./component/Container"
import {
  GITHUB_URL,
  LOCALSTORAGE_MAX_SCORE_KEY,
  STARTING_HEAD_POSITION,
  STARTING_SNAKE_SIZE,
  STARTING_TICKRATE
} from "./config"
import { Menu } from "./component/menu/Menu"
import { wasdListener } from "./util/keypress"
import { generateFruitPosition, updatePosition } from "./util/position"
import { checkBodyCollision, updateBody } from "./util/body"
import { getScoreFromLocalStorage, scoreAddition } from "./util/score"

export function App() {
  const [sourceUrlShown, setSourceUrlShown] = useState(false)

  const [isCollision, setIsCollision] = useState(false)

  const [headWasTurnedThisMove, setHeadWasTurnedThisMove] = useState(false)
  const [headPosition, setHeadPosition] = useState<Position>(STARTING_HEAD_POSITION)
  const [snakeBody, setSnakeBody] = useState<Position[]>([STARTING_HEAD_POSITION])
  const [fruitPosition, setFruitPosition] = useState(generateFruitPosition([STARTING_HEAD_POSITION]))
  const [headPositionWhenFruitSpawned, setHeadPositionWhenFruitSpawned] = useState<Position>(STARTING_HEAD_POSITION)

  const [direction, setDirection] = useState<Direction>("up")

  const directionRef = useRef(direction)
  const setDirectionRef = (dir: Direction) => {
    directionRef.current = dir
    setDirection(dir)
  }

  const headWasTurnedThisMoveRef = useRef(headWasTurnedThisMove)
  const setHeadWasTurnedThisMoveRef = (wasTurned: boolean) => {
    headWasTurnedThisMoveRef.current = wasTurned
    setHeadWasTurnedThisMove(wasTurned)
  }

  const [tickRate, setTickRate] = useState(STARTING_TICKRATE)
  const [snakeSize, setSnakeSize] = useState(STARTING_SNAKE_SIZE)

  const [score, setScore] = useState<number>(0)
  const [maxScore, setMaxScore] = useState<number>(getScoreFromLocalStorage())

  const playfieldRef = useRef<HTMLDivElement>(null)

  function restart() {
    if (playfieldRef.current) playfieldRef.current.focus()
    setHeadPosition(STARTING_HEAD_POSITION)
    setSnakeBody([STARTING_HEAD_POSITION])
    setDirectionRef("up")

    setTickRate(STARTING_TICKRATE)
    setSnakeSize(STARTING_SNAKE_SIZE)

    setScore(0)
    setMaxScore(getScoreFromLocalStorage())

    setIsCollision(false)
  }

  useEffect(() => {
    if (!sourceUrlShown) {
      // eslint-disable-next-line no-console
      console.log("Source code:", GITHUB_URL)
      setSourceUrlShown(true)
    }

    const interval = setInterval(() => {
      if (checkBodyCollision(snakeBody, updatePosition(direction, headPosition))) {
        setIsCollision(true)
        if (score > maxScore) localStorage.setItem(LOCALSTORAGE_MAX_SCORE_KEY, String(score))
      }

      if (!isCollision) {
        setHeadPosition(updatePosition(direction, headPosition))
        setSnakeBody(updateBody(snakeBody, headPosition, snakeSize))

        if (isEqual(headPosition, fruitPosition)) {
          setSnakeSize((sz) => sz + 1)
          setScore((sc) => sc + scoreAddition(headPositionWhenFruitSpawned, fruitPosition, snakeSize, tickRate))
          setHeadPositionWhenFruitSpawned(headPosition)
          setFruitPosition(generateFruitPosition(snakeBody))
          setTickRate((sp) => decreaseTickrate(sp))
        }
        setHeadWasTurnedThisMoveRef(false)
      }
    }, tickRate)

    window.addEventListener("keypress", (e) => wasdListener({
      e,
      directionRef,
      setDirectionRef,
      headWasTurnedThisMoveRef,
      setHeadWasTurnedThisMoveRef
    }))

    return () => clearInterval(interval)
  }, [
    direction,
    fruitPosition,
    headPosition,
    headPositionWhenFruitSpawned,
    headWasTurnedThisMove,
    isCollision,
    maxScore,
    score,
    snakeBody,
    snakeSize,
    sourceUrlShown,
    tickRate
  ])

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
