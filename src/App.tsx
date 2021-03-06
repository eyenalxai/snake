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
  pausedState,
  prevHeadPosState,
  scoreState,
  snakeBodyState,
  snakeSizeState,
  tickrateState,
  useRecoilStateRef
} from "./recoil/atoms"
import { checkCollision, updateBody } from "./util/body"
import { escapeListener, wasdListener } from "./util/keypress"
import { Direction, Position } from "./type"
import { Controls } from "./component/controls/Controls"
import { Menu } from "./component/menu/Menu"
import {
  CONSOLE_MESSAGE,
  CONSOLE_MESSAGE_STYLES,
  LOCALSTORAGE_MAX_SCORE_KEY,
  STARTING_BODY_POSITION,
  STARTING_DIRECTION,
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
  const [isPaused, setIsPaused] = useRecoilStateRef(pausedState)
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
  const [isCollision, setIsCollision] = useRecoilStateRef<boolean>(collisionState)

  const playfieldRef = useRef<HTMLDivElement>(null)

  const restart = () => {
    if (playfieldRef.current) playfieldRef.current.focus()
    setIsCollision(false)
    setDirection(STARTING_DIRECTION)
    setBlockedDirection(getOppositeDirection(STARTING_DIRECTION))

    setSnakeBody(STARTING_BODY_POSITION)
    setHeadPos(last(STARTING_BODY_POSITION)!)
    setSnakeSize(STARTING_SNAKE_SIZE)
    setPrevHeadPos(last(STARTING_BODY_POSITION)!)

    setTickrate(STARTING_TICKRATE)
    setScore(0)
  }

  const wasdListenerFunction = (e: KeyboardEvent) =>
    wasdListener({
      e,
      direction: direction.current,
      setDirection,
      blockedDirection: blockedDirection.current,
      isCollision: isCollision.current,
      isPaused: isPaused.current
    })

  const escapeListenerFunction = (e: KeyboardEvent) =>
    escapeListener({
      e,
      setIsPaused,
      isCollision: isCollision.current,
      isPaused: isPaused.current
    })

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused.current) return
      const updatedBody = updateBody(snakeBody.current, direction.current, snakeSize.current)
      if (!isCollision.current && checkCollision(updatedBody)) {
        setIsCollision(true)
        setHeadPos(last(updatedBody)!)
      }

      if (!isCollision.current) {
        setSnakeBody(updatedBody)
        setHeadPos(last(updatedBody)!)
        if (isEqual(headPos.current, fruitPosition.current)) {
          const updatedScore = score + scoreAddition(prevHeadPos, fruitPosition.current, snakeSize.current, tickrate)
          setScore(updatedScore)
          if (updatedScore > maxScore) {
            setMaxScore(updatedScore)
            localStorage.setItem(LOCALSTORAGE_MAX_SCORE_KEY, String(updatedScore))
          }

          setSnakeSize(snakeSize.current + 1)
          setPrevHeadPos(headPos.current)
          setFruitPosition(generateFruitPosition(snakeBody.current))
          setTickrate(decreaseTickrate(tickrate))
        }
        setBlockedDirection(getOppositeDirection(direction.current))
      }
    }, tickrate)

    window.addEventListener("keypress", wasdListenerFunction, false)
    window.addEventListener("keyup", escapeListenerFunction, false)

    if (!sourceUrlShown) {
      // eslint-disable-next-line no-console
      console.log(CONSOLE_MESSAGE, CONSOLE_MESSAGE_STYLES)
      setSourceUrlShown(true)
    }

    return () => {
      window.removeEventListener("keypress", wasdListenerFunction, false)
      window.removeEventListener("keyup", escapeListenerFunction, false)
      clearInterval(interval)
    }
    // I'm usingRefs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickrate, isCollision.current, isPaused.current])

  return (
    <Container>
      <Menu
        restart={() => restart()}
        toggleIsPaused={() => {
          if (playfieldRef.current) playfieldRef.current.focus()
          setIsPaused(!isPaused.current)
        }}
      />
      <Playfield ref={playfieldRef} />
      <Controls directionRef={direction} />
    </Container>
  )
}
