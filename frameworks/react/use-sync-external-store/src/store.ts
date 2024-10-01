import { useSyncExternalStore } from 'react'

type Listener<T> = (state: T) => void
type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void

const createStore = <T extends object>(initialState: T) => {
  // 'state'는 현재 상태를 저장하고,
  let state = initialState
  // 'listeners'는 상태 변경을 구독하는 함수들의 집합입니다.
  const listeners = new Set<Listener<T>>()

  // 'notify' 함수는 상태가 변경될 때 모든 리스너에게 알립니다.
  const notify = () => {
    listeners.forEach(listener => listener(state))
  }

  // 'setState'는 상태를 업데이트하고 리스너들에게 알리는 역할을 합니다.
  const setState: SetState<T> = partial => {
    const nextState = typeof partial === 'function' ? partial(state) : partial
    state = { ...state, ...nextState }

    notify()
  }

  return {
    setState,
    // 'getState' 함수는 현재 상태를 반환합니다.
    getState: () => state,
    // 'subscribe' 함수는 새로운 리스너를 추가하고, 구독 취소 함수를 반환합니다.
    subscribe: (listener: Listener<T>) => {
      listeners.add(listener)
      // 'unsubscribe' 함수는 리스너를 제거합니다.
      return () => listeners.delete(listener)
    },
  }
}

const useStore = <T extends object, S>(
  store: ReturnType<typeof createStore<T>>,
  selector: (state: T) => S = state => state as unknown as S,
) =>
  useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()),
  )

const createImpl = <T extends object>(createState: T) => {
  const store = createStore(createState)

  const useBoundStore = <S>(selector?: (state: T) => S): S =>
    useStore(store, selector as (state: T) => S)

  Object.assign(useBoundStore, store)

  return useBoundStore as typeof useBoundStore & ReturnType<typeof createStore<T>>
}

export const create = <T extends object>(createState: T) => createImpl(createState)

export const useCountStore = create({ count: 0, name: 'john' })
