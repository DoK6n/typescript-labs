import { create } from '../../zustiny'

interface CounterStore {
  count: number
  incrementCount: () => void
  decrementCount: () => void
  squaredCount: () => number
}

export const useCounterStore = create<CounterStore>((set, get) => ({
  count: 0,
  incrementCount: () => set(prev => ({ count: prev.count + 1 })),
  decrementCount: () => set(prev => ({ count: prev.count - 1 })),
  squaredCount: () => get().count * get().count,
}))
