/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { hasDeps } from './utils'
import { useMount } from './useMount'
import { useUnmount } from './useUnmount'

/** 컴포넌트가 업데이트될 때 실행되는 효과 */
export function useUpdate(effect: React.EffectCallback, deps: React.DependencyList) {
  const isMountedRef = useRef(false)

  useEffect(() => {
    if (!hasDeps(deps)) return

    if (!import.meta.env.DEV) {
      effect()
    } else if (isMountedRef.current) {
      effect()
    }
  }, deps)

  useMount(() => {
    isMountedRef.current = true
  })

  useUnmount(() => {
    isMountedRef.current = false
  })
}
