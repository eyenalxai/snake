import { useEffect, useState } from "react"
import { isEqual, random, range } from "lodash"

type Location = [number, number]
type Direction = "left" | "right" | "up" | "down"

const DIMENSIONS = 13
const DIRECTIONS: Direction[] = ["up", "left", "down", "right"]

function compareLocation(first: Location, second: Location) {
  return isEqual(first, second)
}

function updateLocation(direction: Direction, currentLocation: Location): [number, number] {
  const [x, y] = currentLocation
  switch (direction) {
    case "right":
      return [x + 1 < DIMENSIONS ? x + 1 : 0, y]
    case "left":
      return [x - 1 < 0 ? DIMENSIONS - 1 : x - 1, y]
    case "up":
      return [x, y + 1 < DIMENSIONS ? y + 1 : 0]
    case "down":
      return [x, y - 1 < 0 ? DIMENSIONS - 1 : y - 1]
    default:
      return currentLocation
  }
}

function paint(celLoc: Location, headLoc: Location, fruitLoc: Location) {
  if (compareLocation(celLoc, headLoc)) return "bg-gray-400"
  if (compareLocation(celLoc, fruitLoc)) return "bg-gray-600"
  return "bg-gray-300"
}

interface DirectionButtonProps {
  direction: Direction
  // eslint-disable-next-line no-unused-vars
  onClick: (dir: Direction) => void
}

function DirectionButton({ direction, onClick }: DirectionButtonProps) {
  return (
    <button
      onClick={() => onClick(direction)}
      type="button"
      className={`w-16   bg-gray-300
        ${direction === "up" ? "col-span-3" : "col-span-1"}
      `}
    >
      {direction.toUpperCase()}
    </button>
  )
}

function getRandomLocation(): Location {
  return [random(0, DIMENSIONS - 1, false), random(0, DIMENSIONS - 1, false)]
}

function generateFruitLocation(headLoc: Location) {
  let fruitLoc: Location = getRandomLocation()
  while (isEqual(fruitLoc, headLoc)) {
    fruitLoc = getRandomLocation()
  }
  return fruitLoc
}

export function App() {
  const [headLoc, setHeadLoc] = useState<[number, number]>([6, 6])
  const [fruitLoc, setFruitLoc] = useState(generateFruitLocation(headLoc))

  const [direction, setDirection] = useState<Direction>("up")
  const [speed, setSpeed] = useState(500)

  const [score, setScore] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadLoc((currentLoc) => updateLocation(direction, currentLoc))
      if (compareLocation(headLoc, fruitLoc)) {
        setScore((sc) => sc + 1)
        setFruitLoc(generateFruitLocation)
        setSpeed((sp) => sp - 10)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [direction, fruitLoc, headLoc, speed])

  return (
    <div className="container mx-auto mt-24 max-w-max">
      <h5>
        SCORE:
        {score}
      </h5>
      <div className={`inline-grid grid-cols-${DIMENSIONS} border border-gray-400`}>
        {
          range(DIMENSIONS).map((idy) => range(DIMENSIONS).map((idx) => {
            const [x, y] = [idx, DIMENSIONS - idy - 1]
            return (
              <div
                key={`x-${x} y-${y}`}
                className={`h-7 w-7 border border-gray-400 ${paint([x, y], headLoc, fruitLoc)}`}
              />
            )
          }))
        }
      </div>
      <div className="flex justify-center">
        <div className="mt-10 inline-grid grid-cols-3 justify-items-center">
          {
            DIRECTIONS.map((dir) => <DirectionButton direction={dir} onClick={setDirection} />)
          }
        </div>
      </div>
    </div>
  )
}
