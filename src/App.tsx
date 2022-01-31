import { useEffect, useRef, useState } from "react"
import { isEqual, last } from "lodash"
import { useRecoilState } from "recoil"
import { Container } from "./component/Container"
import { Playfield } from "./component/playfield/Playfield"
import {
  blockedDirectionState,
  collisionState,
  directionState,
  fruitPositionState,
  headPosState,
  maxScoreState,
  prevHeadPosState,
  scoreState,
  snakeBodyState,
  snakeSizeState,
  tickrateState,
  useRecoilStateRef
} from "./recoil/atoms"
import { checkCollision, updateBody } from "./util/body"
import { wasdListener } from "./util/keypress"
import { Direction, Position } from "./type"
import { Controls } from "./component/controls/Controls"
import { Menu } from "./component/menu/Menu"
import {
  GITHUB_URL,
  LOCALSTORAGE_MAX_SCORE_KEY,
  STARTING_BODY_POSITION,
  STARTING_SNAKE_SIZE,
  STARTING_TICKRATE
} from "./config"
import { scoreAddition } from "./util/score"
import { generateFruitPosition } from "./util/position"
import { decreaseTickrate } from "./util/other"

// eslint-disable-next-line consistent-return
export function getOppositeDirection(direction: Direction): Direction {
  // eslint-disable-next-line default-case
  switch (direction) {
    case "up":
      return "down"
    case "left":
      return "right"
    case "right":
      return "left"
    case "down":
      return "up"
  }
}

export function App() {
  const [sourceUrlShown, setSourceUrlShown] = useState(false)
  const [direction, setDirection] = useRecoilStateRef<Direction>(directionState)
  const [blockedDirection, setBlockedDirection] = useRecoilStateRef<Direction>(blockedDirectionState)
  const [snakeBody, setSnakeBody] = useRecoilStateRef<Position[]>(snakeBodyState)
  const [headPos, setHeadPos] = useRecoilStateRef<Position>(headPosState)
  const [fruitPosition, setFruitPosition] = useRecoilStateRef<Position>(fruitPositionState)
  const [snakeSize, setSnakeSize] = useRecoilStateRef<number>(snakeSizeState)

  const [prevHeadPos, setPrevHeadPos] = useRecoilState(prevHeadPosState)

  const [tickrate, setTickrate] = useRecoilState<number>(tickrateState)
  const [score, setScore] = useRecoilState<number>(scoreState)
  const [maxScore, setMaxScore] = useRecoilState<number>(maxScoreState)
  const [isCollision, setIsCollision] = useRecoilState<boolean>(collisionState)

  const playfieldRef = useRef<HTMLDivElement>(null)

  function restart() {
    if (playfieldRef.current) playfieldRef.current.focus()

    setSnakeSize(STARTING_SNAKE_SIZE)
    setSnakeBody(STARTING_BODY_POSITION)
    setDirection("up")

    setTickrate(STARTING_TICKRATE)
    setIsCollision(false)
    setScore(0)
  }

  useEffect(() => {
    if (!sourceUrlShown) {
      // eslint-disable-next-line no-console
      console.log("Source code:", GITHUB_URL)
      setSourceUrlShown(true)
    }

    const interval = setInterval(() => {
      const updatedBody = updateBody(snakeBody.current, direction.current, snakeSize.current)
      if (checkCollision(updatedBody)) {
        setIsCollision(true)
        if (score > maxScore) {
          setMaxScore(score)
          localStorage.setItem(LOCALSTORAGE_MAX_SCORE_KEY, String(score))
        }
      }

      if (!isCollision) {
        setSnakeBody(updatedBody)
        setHeadPos(last(snakeBody.current)!)
        if (isEqual(headPos.current, fruitPosition.current)) {
          setScore(score + scoreAddition(prevHeadPos, fruitPosition.current, snakeSize.current, tickrate))
          setSnakeSize(snakeSize.current + 1)
          setPrevHeadPos(headPos.current)
          setFruitPosition(generateFruitPosition(snakeBody.current))
          setTickrate(decreaseTickrate(tickrate))
        }
        setBlockedDirection(getOppositeDirection(direction.current))
      }
    }, tickrate)

    window.addEventListener("keypress", (e) =>
      wasdListener({
        e,
        direction: direction.current,
        setDirection,
        blockedDirection: blockedDirection.current
      })
    )

    return () => {
      clearInterval(interval)
    }
    // I'm usingRefs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickrate, isCollision])

  return (
    <Container>
      <Menu restart={() => restart()} />
      <Playfield ref={playfieldRef} />
      <Controls directionRef={direction} />
    </Container>
  )
}
