/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useRef } from 'react'
import { hasDeps } from './utils'
import { useMountBeforePaint } from './useMountBeforePaint'
import { useUnmountBeforePaint } from './useUnmountBeforePaint'

/** 브라우저가 화면을 그리기 전에 업데이트될 때 실행되는 효과 */
export function useUpdateBeforePaint(effect: React.EffectCallback, deps: React.DependencyList) {
  const isPaintedRef = useRef(false)

  useLayoutEffect(() => {
    if (!hasDeps(deps)) return

    if (!import.meta.env.DEV) {
      effect()
    } else if (isPaintedRef.current) {
      effect()
    }
  }, deps)

  useMountBeforePaint(() => {
    isPaintedRef.current = true
  })

  useUnmountBeforePaint(() => {
    isPaintedRef.current = false
  })
}
