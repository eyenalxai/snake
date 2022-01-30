import { Direction, Position } from "./type"

export const DIMENSIONS = 13
export const DIRECTIONS: Direction[] = ["up", "left", "down", "right"]

export const STARTING_HEAD_POSITION: Position = [6, 6]
export const STARTING_SNAKE_SIZE = 1
export const STARTING_TICKRATE = 500
export const MIN_TICKRATE = 80
export const TICKRATE_MULTIPLIER = 0.96

export const LOCALSTORAGE_MAX_SCORE_KEY = "max-score"

export const GITHUB_URL = "https://github.com/tionsverryful/react-snake"
