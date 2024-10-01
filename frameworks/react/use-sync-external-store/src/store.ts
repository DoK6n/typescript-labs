import { useSyncExternalStore } from 'react'

type Listener<T> = (state: T) => void
type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void

const createStore = <T extends object>(initialState: T) => {
  let state = initialState
  const listeners = new Set<Listener<T>>()

  const notify = () => {
    listeners.forEach(listener => listener(state))
  }

  const setState: SetState<T> = partial => {
    const nextState = typeof partial === 'function' ? partial(state) : partial
    state = { ...state, ...nextState }

    notify()
  }

  return {
    setState,
    getState: () => state,
    subscribe: (listener: Listener<T>) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

export const store = createStore({ count: 0 })

/**
 * @example
 * const count = useStore(store, state => state.count)
 */
export const useStore = <T extends object, S>(
  store: ReturnType<typeof createStore<T>>,
  selector: (state: T) => S = state => state as unknown as S,
) =>
  useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()),
  )
