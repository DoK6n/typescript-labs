import { useCallback, useEffect, useRef, useState } from 'react'

/* FIXME
  동일한 cacheKey로 useFetch를 사용한 컴포넌트가 여러개 렌더링 될떄,
  캐시가 설정되기도 전에 거의 동시에 렌더링 될 경우 캐시가 적용되지 않는 이슈가 있음
*/

// eslint-disable-next-line prefer-const
let fetchCache = new Map()

export function useFetch<ResponseDto>(
  fetcher: () => Promise<ResponseDto>,
  options?: { initialData?: never; cacheKey?: string },
): { data: ResponseDto | undefined; isLoading: boolean; error: Error | null; hit: boolean }

export function useFetch<ResponseDto>(
  fetcher: () => Promise<ResponseDto>,
  options?: { initialData: ResponseDto; cacheKey?: string },
): { data: ResponseDto; isLoading: boolean; error: Error | null; hit: boolean }

export function useFetch<ResponseDto>(
  fetcher: () => Promise<ResponseDto>,
  options?: { initialData?: ResponseDto; cacheKey?: string },
) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ResponseDto | undefined>(options?.initialData)
  const [error, setError] = useState<Error | null>(null)
  const [hit, setHit] = useState(false)

  const isMountedRef = useRef(false)

  const fetchData = useCallback(async () => {
    if (options?.cacheKey && fetchCache.has(options.cacheKey)) {
      setData(fetchCache.get(options.cacheKey))
      setHit(true)
      return
    }

    setIsLoading(true)
    try {
      const newData = await fetcher()
      setData(newData)
      setHit(false)
      if (options?.cacheKey) {
        fetchCache.set(options.cacheKey, newData)
      }
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }, [fetcher, options?.cacheKey])

  useEffect(() => {
    if (isMountedRef.current) {
      fetchData()
    }

    isMountedRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    data,
    isLoading,
    error,
    hit,
  }
}
