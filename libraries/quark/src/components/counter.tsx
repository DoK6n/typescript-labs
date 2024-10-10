import { quark } from '../lib/react'

interface QuarkState {
  count: number
  increment: () => void
  decrement: () => void
}

const useCount = quark<QuarkState>(set => ({
  count: 0,
  increment: () => {
    set(prev => ({ count: prev.count + 1 }))
  },
  decrement: () => {
    set(prev => ({ count: prev.count - 1 }))
  },
}))

export function Counter() {
  const { count, increment, decrement, reset } = useCount()

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
