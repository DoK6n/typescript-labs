type Listener<T> = (state: T, prevState: T) => void

type UpdateFn<T> = (state: T) => Partial<T>

type SetState<T> = (partial: Partial<T> | UpdateFn<T>) => void

export interface StoreApi<T> {
  setState: SetState<T>
  getState: () => T
  getInitialState: () => T
  subscribe: (listener: (state: T, prevState: T) => void) => () => void
  reset: () => void
}

type Get<T, K, F> = K extends keyof T ? T[K] : F

export type CreateState<T> = (
  setState: Get<StoreApi<T>, 'setState', never>,
  getState: Get<StoreApi<T>, 'getState', never>,
  store: StoreApi<T>,
) => T

function isUpdateFn<T>(value: unknown): value is UpdateFn<T> {
  return typeof value === 'function'
}

export const createStore = <T>(createState: CreateState<T>): StoreApi<T> => {
  type TState = ReturnType<typeof createState>

  let state: TState
  // 'listeners'는 상태 변경을 구독하는 함수들의 집합입니다.
  const listeners = new Set<Listener<T>>()

  // 'notify' 함수는 상태가 변경될 때 모든 리스너에게 알립니다.
  const notify = (state: T, prevState: T) => {
    listeners.forEach(listener => listener(state, prevState))
  }

  // 'setState'는 상태를 업데이트하고 리스너들에게 알리는 역할을 합니다.
  const setState: SetState<T> = partial => {
    const nextState = isUpdateFn<T>(partial) ? partial(state) : partial

    if (!Object.is(nextState, state)) {
      const prevState = state
      state = Object.assign({}, state, nextState)

      notify(state, prevState)
    }
  }

  const getState = () => state

  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const api: StoreApi<T> = {
    setState,
    getState,
    getInitialState: () => state,
    subscribe,
    reset: () => {},
  }

  api.reset = () => {
    setState(createState(setState, getState, api))
  }

  api.getInitialState = () => (state = createState(setState, getState, api))

  return api
}
