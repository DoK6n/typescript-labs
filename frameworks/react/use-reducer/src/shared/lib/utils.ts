import { CSSProperties } from 'react'

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    const randomNum = (Math.random() * 16) | 0,
      hexDigit = char === 'x' ? randomNum : (randomNum & 0x3) | 0x8
    return hexDigit.toString(16)
  })
}

export const f: Record<'flexColumn' | 'flexRow', CSSProperties> = {
  flexColumn: { display: 'flex', flexDirection: 'column', gap: 10 },
  flexRow: { display: 'flex', flexDirection: 'row', gap: 10 },
}

export const maybe = <T>(value: T | null | undefined) => value ?? ''
