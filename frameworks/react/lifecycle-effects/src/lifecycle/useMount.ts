/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'

/** 컴포넌트가 마운트될 때 실행되는 효과 */
export const useMount = (effect: React.EffectCallback) => {
  const isMountedRef = useRef(false)

  useEffect(() => {
    if (!import.meta.env.DEV) {
      effect()
    } else if (isMountedRef.current) {
      effect()
    }
    isMountedRef.current = true
  }, [])
}
