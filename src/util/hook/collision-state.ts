import { collisionState, useRecoilStateRef } from "../../recoil/atoms"

export const useCollisionState = () => {
  const [isCollision, setIsCollision] = useRecoilStateRef<boolean>(collisionState)

  return {
    isCollision,
    setIsCollision
  }
}
