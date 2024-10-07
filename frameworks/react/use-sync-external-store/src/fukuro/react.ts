import { CreateState, createStore, StoreApi } from './vanilla'
import { useDebugValue, useSyncExternalStore } from 'react'

type ExtractState<S> = S extends { getState: () => infer T } ? T : never

type ReadonlyStoreApi<T> = Pick<StoreApi<T>, 'getState' | 'getInitialState' | 'subscribe'>

export function useStore<S extends ReadonlyStoreApi<unknown>>(store: S): ExtractState<S>
export function useStore<S extends ReadonlyStoreApi<unknown>, U>(
  store: S,
  selector: (state: ExtractState<S>) => U,
): U
export function useStore<TState, TSlice>(
  store: ReadonlyStoreApi<TState>,
  selector: (state: TState) => TSlice = (state: TState) => state as unknown as TSlice,
) {
  const slice = useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()),
  )

  useDebugValue(slice)
  return slice
}

/**
 * @example
 * ```tsx
 * interface CounterStore {
 *   count: number
 *   increment: () => void
 *   squaredCount: () => number
 * }
 *
 * export const useCounterStore = create<CounterStore>((set, get) => ({
 *   count: 0,
 *   increment: () => set(prev => ({ count: prev.count + 1 })),
 *   squaredCount: () => get().count * get().count,
 * }))
 *
 * function Counter() {
 *   const { count, increment, squaredCount } = useCounterStore()
 *   return (
 *     <div>
 *       <p>{count}</p>
 *       <button onClick={increment}>Increment</button>
 *     </div>
 *   )
 * }
 * ```
 */
export const create = <T>(createState: CreateState<T>) => {
  const store = createStore(createState)
  const useBoundStore = () => useStore(store)

  Object.assign(useBoundStore, store)

  return useBoundStore as typeof useBoundStore & ReturnType<typeof createStore<T>>
}

// how to use

interface CounterStore {
  count: number
  increment: () => void
  squaredCount: () => number
}

export const useCounterStore = create<CounterStore>((set, get) => ({
  count: 0,
  increment: () => set(prev => ({ count: prev.count + 1 })),
  squaredCount: () => get().count * get().count,
}))
