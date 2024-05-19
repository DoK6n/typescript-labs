import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { useState } from 'react'

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

function App() {
  const [isActive, setIsActive] = useState(true)

  const className = twMerge(
    'px-2 py-1 bg-red hover:bg-dark-red',
    clsx({
      'p-3 bg-[#B91C1C]': isActive,
      'p-2 bg-blue-500': !isActive,
    }),
  )

  const handleClick = () => {
    setIsActive(prev => !prev)
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen gap-2'>
      <p className={twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')}>Hello</p>
      <button
        className='px-4 py-2 font-bold text-white rounded bg-violet-500 hover:bg-violet-700 active:bg-violet-900'
        onClick={handleClick}
      >
        Click me
      </button>
      <p className={className}>Hello</p>
      <p
        className={cn('px-2 py-1 bg-red hover:bg-dark-red', {
          'p-3 bg-[#B91C1C]': isActive,
          'p-2 bg-blue-500': !isActive,
        })}
      >
        Hello
      </p>
    </div>
  )
}

export default App
