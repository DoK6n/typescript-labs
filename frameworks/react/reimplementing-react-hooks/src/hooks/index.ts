import { useRef, useReducer, type SetStateAction } from 'react'
import { dequal } from 'dequal'
import { shallowEqual } from '../lib/utils'

export function useState<S>(initialState: S | (() => S)): [S, (action: SetStateAction<S>) => void] {
  const [state, dispatch] = useReducer(
    (state: S, action: SetStateAction<S>): S =>
      typeof action === 'function' ? (action as (prevState: S) => S)(state) : action,
    typeof initialState === 'function' ? (initialState as () => S)() : initialState,
  )

  return [state, dispatch]
}

export function useMemo<T>(factory: () => T, deps: React.DependencyList): T {
  const ref = useRef<{ value: T; deps: React.DependencyList | undefined }>({
    value: undefined as T,
    deps: undefined,
  })

  if (!ref.current.deps || !shallowEqual(deps, ref.current.deps)) {
    ref.current.value = factory()
    ref.current.deps = deps
  }

  return ref.current.value
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => callback, deps)
}

export function useDeepMemo<T>(factory: () => T, deps: React.DependencyList): T {
  const ref = useRef<{ value: T; deps: React.DependencyList | undefined }>({
    value: undefined as T,
    deps: undefined,
  })

  if (!ref.current.deps || !dequal(deps, ref.current.deps)) {
    ref.current.value = factory()
    ref.current.deps = deps
  }

  return ref.current.value
}
