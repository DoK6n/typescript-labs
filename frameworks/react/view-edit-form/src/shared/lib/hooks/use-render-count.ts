import { useRef, useEffect } from 'react'

export const useRenderCount = () => {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
  })

  return renderCount.current
}
