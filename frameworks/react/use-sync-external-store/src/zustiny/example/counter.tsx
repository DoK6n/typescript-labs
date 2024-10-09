import { useCounterStore } from './store/count.store'

export default function Counter() {
  const { count, incrementCount, decrementCount, squaredCount } = useCounterStore()

  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementCount}>Increment</button>
      <button onClick={decrementCount}>Decrement</button>
      <p>제곱 : {squaredCount()}</p>
    </div>
  )
}
