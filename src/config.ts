import { Direction, Position } from "./type"

export const DIMENSIONS = 13
export const DIRECTIONS: Direction[] = ["up", "left", "down", "right"]

export const STARTING_HEAD_POSITION: Position = [6, 6]
export const STARTING_SNAKE_SIZE = 1
export const STARTING_SPEED = 400
export const MIN_SPEED = 40
export const SPEED_STEP = MIN_SPEED / 8
