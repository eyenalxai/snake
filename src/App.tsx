import { Container } from "./component/Container"
import { Playfield } from "./component/playfield/Playfield"
import { Controls } from "./component/controls/Controls"
import { Menu } from "./component/menu/Menu"
import { useSnakeGame } from "./util/hook/snake-game"

export function App() {
  const { restart, isPaused, setIsPaused, playfieldRef, direction } = useSnakeGame()

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
