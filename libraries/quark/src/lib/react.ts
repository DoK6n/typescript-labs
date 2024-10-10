import { useDebugValue, useSyncExternalStore } from 'react'
import { CreateState, Quark, StoreApi } from './quark'

export function useStore<T>(store: Quark<T>) {
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState)

  const result = { ...state, reset: store.reset }
  useDebugValue(result)
  return result
}

export function quark<T>(store: CreateState<T>) {
  const quark = Quark.create(store)

  const useQuark = () => useStore(quark)
  Object.assign(useQuark, quark.api)

  type UseStoreReturn<T> = T & { reset: () => void }
  type UseQuark = (() => UseStoreReturn<T>) & StoreApi<T>

  return useQuark as UseQuark
}
