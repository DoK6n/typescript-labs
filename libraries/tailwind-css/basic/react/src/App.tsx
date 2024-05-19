import { useState } from 'react'
import Button from './Button'
import { DefaultColors } from 'tailwindcss/types/generated/colors'

type ColorBoxVariantValue = `w-28 h-28 bg-${keyof DefaultColors}-500`
type ColorVariantValue = `w-8 h-8 bg-${keyof DefaultColors}-500`

const colorVariants: Partial<Record<keyof DefaultColors, ColorVariantValue>> = {
  slate: 'w-8 h-8 bg-slate-500',
  gray: 'w-8 h-8 bg-gray-500',
  zinc: 'w-8 h-8 bg-zinc-500',
  neutral: 'w-8 h-8 bg-neutral-500',
  stone: 'w-8 h-8 bg-stone-500',
  red: 'w-8 h-8 bg-red-500',
  orange: 'w-8 h-8 bg-orange-500',
  amber: 'w-8 h-8 bg-amber-500',
  yellow: 'w-8 h-8 bg-yellow-500',
  lime: 'w-8 h-8 bg-lime-500',
  green: 'w-8 h-8 bg-green-500',
  emerald: 'w-8 h-8 bg-emerald-500',
  teal: 'w-8 h-8 bg-teal-500',
  cyan: 'w-8 h-8 bg-cyan-500',
  sky: 'w-8 h-8 bg-sky-500',
  blue: 'w-8 h-8 bg-blue-500',
  indigo: 'w-8 h-8 bg-indigo-500',
  violet: 'w-8 h-8 bg-violet-500',
  purple: 'w-8 h-8 bg-purple-500',
  fuchsia: 'w-8 h-8 bg-fuchsia-500',
  pink: 'w-8 h-8 bg-pink-500',
  rose: 'w-8 h-8 bg-rose-500',
}

const colorBoxVariants: Partial<Record<keyof DefaultColors, ColorBoxVariantValue>> = {
  slate: 'w-28 h-28 bg-slate-500',
  gray: 'w-28 h-28 bg-gray-500',
  zinc: 'w-28 h-28 bg-zinc-500',
  neutral: 'w-28 h-28 bg-neutral-500',
  stone: 'w-28 h-28 bg-stone-500',
  red: 'w-28 h-28 bg-red-500',
  orange: 'w-28 h-28 bg-orange-500',
  amber: 'w-28 h-28 bg-amber-500',
  yellow: 'w-28 h-28 bg-yellow-500',
  lime: 'w-28 h-28 bg-lime-500',
  green: 'w-28 h-28 bg-green-500',
  emerald: 'w-28 h-28 bg-emerald-500',
  teal: 'w-28 h-28 bg-teal-500',
  cyan: 'w-28 h-28 bg-cyan-500',
  sky: 'w-28 h-28 bg-sky-500',
  blue: 'w-28 h-28 bg-blue-500',
  indigo: 'w-28 h-28 bg-indigo-500',
  violet: 'w-28 h-28 bg-violet-500',
  purple: 'w-28 h-28 bg-purple-500',
  fuchsia: 'w-28 h-28 bg-fuchsia-500',
  pink: 'w-28 h-28 bg-pink-500',
  rose: 'w-28 h-28 bg-rose-500',
}

function App() {
  const [color, setColor] = useState<keyof DefaultColors>('teal')

  const handleClick = () => {
    const randomColor = Object.keys(colorBoxVariants)[
      Math.floor(Math.random() * Object.keys(colorBoxVariants).length)
    ] as keyof DefaultColors

    setColor(randomColor)
  }
  return (
    <>
      <div className='flex flex-col gap-4 p-4'>
        <p className={`text-3xl font-bold text-teal-600 underline bg-teal-50`}>
          Tailwind CSS 색상 랜덤 선택!
        </p>
        
        <section className='flex flex-row gap-4 h-7'>
          {Object.entries(colorVariants).map(([colorKey, className]) => (
            <div key={colorKey} className='relative'>
              <section className={className} />
              {color === colorKey && <div className='bottom-0 w-full h-1 mt-1 bg-black' />}
            </div>
          ))}
        </section>

        <section className={colorBoxVariants[color]} />

        <Button onClick={handleClick}>버튼</Button>
      </div>
    </>
  )
}

export default App
