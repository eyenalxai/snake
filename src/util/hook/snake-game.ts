import { useEffect, useRef, useState } from "react"
import { isEqual, last } from "lodash"
import { checkCollision, updateBody } from "../body"
import { scoreAddition } from "../score"
import {
  CONSOLE_MESSAGE,
  CONSOLE_MESSAGE_STYLES,
  LOCALSTORAGE_MAX_SCORE_KEY,
  STARTING_BODY_POSITION,
  STARTING_DIRECTION,
  STARTING_SNAKE_SIZE,
  STARTING_TICKRATE
} from "../../config"
import { generateFruitPosition } from "../position"
import { decreaseTickrate } from "../other"
import { getOppositeDirection } from "../direction"
import { useGameControl } from "./game-control"
import { useCollisionState } from "./collision-state"
import { useFruitState } from "./fruit-state"
import { useScoreState } from "./score-state"
import { useSnakeState } from "./snake-state"
import { escapeListener, wasdListener } from "../keypress"

export const useSnakeGame = () => {
  const playfieldRef = useRef<HTMLDivElement>(null)

  const [sourceUrlShown, setSourceUrlShown] = useState(false)

  const { isCollision, setIsCollision } = useCollisionState()
  const { fruitPosition, setFruitPosition } = useFruitState()
  const { isPaused, setIsPaused, tickrate, setTickrate } = useGameControl()
  const { score, setScore, maxScore, setMaxScore } = useScoreState()
  const {
    direction,
    setDirection,
    blockedDirection,
    setBlockedDirection,
    snakeBody,
    setSnakeBody,
    headPos,
    setHeadPos,
    prevHeadPos,
    setPrevHeadPos,
    snakeSize,
    setSnakeSize
  } = useSnakeState()

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
    // I'm usingRefs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickrate, isCollision.current, isPaused.current])

  return { restart, isPaused, setIsPaused, playfieldRef, direction }
}
