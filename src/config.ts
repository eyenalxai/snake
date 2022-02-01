import { Direction, Position } from "./type"

export const DIMENSIONS = 13
export const DIRECTIONS: Direction[] = ["up", "left", "down", "right"]

export const STARTING_BODY_POSITION: Position[] = [[6, 6]]
export const STARTING_SNAKE_SIZE = 2
export const STARTING_TICKRATE = 500
export const MIN_TICKRATE = 100
export const TICKRATE_MULTIPLIER = 0.97

export const LOCALSTORAGE_MAX_SCORE_KEY = "max-score"

export const STARTING_DIRECTION: Direction = "up"

const GITHUB_URL = "https://github.com/tionsverryful/snake"
export const CONSOLE_MESSAGE = `%c Source: ${GITHUB_URL}`
export const CONSOLE_MESSAGE_STYLES = [
  "font-size: 12px",
  "font-family: monospace",
  "display: inline-block",
  "padding: 0.3em 5em",
  "border: 1px solid;"
].join(";")
