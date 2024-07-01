/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'

/** 컴포넌트가 언마운트될 때 실행되는 효과 */
export function useUnmount(effect: React.EffectCallback) {
  const isUnmountedRef = useRef(false)

  useEffect(() => {
    return () => {
      if (!import.meta.env.DEV) {
        effect()
      } else if (isUnmountedRef.current) {
        effect()
      }
      isUnmountedRef.current = true
    }
  }, [])
}
