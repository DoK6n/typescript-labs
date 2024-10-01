/* eslint-disable @typescript-eslint/no-explicit-any */

type SetStateInternal<T> = {
  _(partial: T | Partial<T> | { _(state: T): T | Partial<T> }['_'], replace?: false): void
  _(state: T | { _(state: T): T }['_'], replace: true): void
}['_']

export interface StoreApi<T> {
  setState: SetStateInternal<T>
  getState: () => T
  getInitialState: () => T
  subscribe: (listener: (state: T, prevState: T) => void) => () => void
}

const createStoreImpl = (createState: any) => {
  type TState = ReturnType<typeof createState>
  type Listener = (state: TState, prevState: TState) => void
  let state: TState
  const listeners: Set<Listener> = new Set()

  const notify = (state: TState, previousState: TState) => {
    listeners.forEach(listener => listener(state, previousState))
  }

  const setState = (
    partial:
      | TState
      | Partial<TState>
      | ((state: TState) => TState | Partial<TState>)
      | ((state: TState) => TState),
    replace?: boolean,
  ) => {
    const nextState =
      typeof partial === 'function' ? (partial as (state: TState) => TState)(state) : partial
    if (!Object.is(nextState, state)) {
      const previousState = state
      state =
        replace ?? (typeof nextState !== 'object' || nextState === null)
          ? (nextState as TState)
          : Object.assign({}, state, nextState)

      notify(state, previousState)
    }
  }

  const getState: StoreApi<TState>['getState'] = () => state

  const getInitialState: StoreApi<TState>['getInitialState'] = () => initialState

  const subscribe: StoreApi<TState>['subscribe'] = listener => {
    listeners.add(listener)
    // Unsubscribe
    return () => listeners.delete(listener)
  }

  const api = { setState, getState, getInitialState, subscribe }
  const initialState = (state = createState(setState, getState, api))
  return api as any
}

export const createStore = (createState: any) =>
  createState ? createStoreImpl(createState) : createStoreImpl
