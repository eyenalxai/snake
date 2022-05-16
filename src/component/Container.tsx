import { ReactNode } from "react"

export function Container({ children }: { children: ReactNode }) {
  return <div className="container mx-auto mt-14 max-w-max">{children}</div>
}
