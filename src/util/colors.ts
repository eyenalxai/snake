import { Direction } from "../type";

// eslint-disable-next-line consistent-return
export function getBorderSide(direction: Direction): string {
  // eslint-disable-next-line default-case
  switch (direction) {
    case "up":
      return "t"
    case "down":
      return "b"
    case "left":
      return "l"
    case "right":
      return "r"
  }
}

export function getCellColors(isFruit: boolean, isSnakeBody: boolean, isHead: boolean, direction: string): string {
  if (isHead) {
    return `bg-gray-500 dark:bg-gray-400
    border-${direction}-gray-900  
    dark:border-${direction}-amber-500 
    border-${direction}-4 dark:border-${direction}-4`
  }
  if (isSnakeBody) return "bg-gray-400 dark:bg-gray-500"
  if (isFruit) return "bg-green-400 dark:bg-green-300"
  return "bg-gray-200 dark:bg-gray-700"
}
