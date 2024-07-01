/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useRef } from 'react'

/** 컴포넌트가 언마운트될 때 useUnmount 호출전에 실행되는 효과 */
export function useUnmountBeforePaint(effect: React.EffectCallback) {
  const isPaintedRef = useRef(false)

  useLayoutEffect(() => {
    return () => {
      if (!import.meta.env.DEV) {
        effect()
      } else if (isPaintedRef.current) {
        effect()
      }
      isPaintedRef.current = true
    }
  }, [])
}
