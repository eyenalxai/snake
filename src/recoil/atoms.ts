import { atom, RecoilState, SetterOrUpdater, useRecoilState } from "recoil"
import { MutableRefObject, useRef } from "react"
import { last } from "lodash"
import { Direction, Position } from "../type"
import { STARTING_BODY_POSITION, STARTING_SNAKE_SIZE, STARTING_TICKRATE } from "../config"
import { generateFruitPosition } from "../util/position"
import { getScoreFromLocalStorage } from "../util/score"

export function useRecoilStateRef<T>(recoilState: RecoilState<T>): [MutableRefObject<T>, SetterOrUpdater<T>] {
  const [state, setState] = useRecoilState(recoilState)

  const stateRef = useRef(state)
  const setStateRef = (_state: T) => {
    stateRef.current = _state
    setState(_state)
  }

  return [stateRef, setStateRef]
}

export const snakeBodyState: RecoilState<Position[]> = atom({
  key: "snakeBodyState",
  default: STARTING_BODY_POSITION,
  dangerouslyAllowMutability: true
})

export const headPosState: RecoilState<Position> = atom({
  key: "headPosState",
  default: last(STARTING_BODY_POSITION)!,
  dangerouslyAllowMutability: true
})

export const directionState: RecoilState<Direction> = atom({
  key: "directionState",
  default: "up"
})

export const collisionState: RecoilState<boolean> = atom({
  key: "collisionState",
  default: false
})

export const fruitPositionState: RecoilState<Position> = atom({
  key: "fruitPositionState",
  default: generateFruitPosition(STARTING_BODY_POSITION)
})

export const prevHeadPosState: RecoilState<Position> = atom({
  key: "prevHeadPosState",
  default: last(STARTING_BODY_POSITION)!
})

export const tickrateState: RecoilState<number> = atom({
  key: "tickrateState",
  default: STARTING_TICKRATE
})

export const snakeSizeState: RecoilState<number> = atom({
  key: "snakeSizeState",
  default: STARTING_SNAKE_SIZE
})

export const scoreState: RecoilState<number> = atom({
  key: "scoreState",
  default: 0
})

export const maxScoreState: RecoilState<number> = atom({
  key: "maxScoreState",
  default: getScoreFromLocalStorage()
})
