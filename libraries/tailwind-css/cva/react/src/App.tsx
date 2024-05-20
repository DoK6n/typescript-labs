import { cva, cx, VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

const button = cva(`p-2 rounded`, {
  variants: {
    size: {
      sm: `text-sm`,
      md: `text-md`,
      lg: `text-lg`,
    },
    color: {
      primary: `bg-blue-500 text-white hover:bg-blue-700 active:bg-blue-900`,
      secondary: `bg-gray-300 text-white hover:bg-gray-500 active:bg-gray-700`,
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})

type BaseButtonProps = VariantProps<typeof button>

const BaseButton = ({ size, color, children }: PropsWithChildren<BaseButtonProps>) => {
  return <button className={button({ size, color })}>{children}</button>
}

function App() {
  const csTest = cx('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]') // px-2 py-1 bg-red hover:bg-dark-red p-3 bg-[#B91C1C]
  const twMergeTest = twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]') // hover:bg-dark-red p-3 bg-[#B91C1C]

  console.log('csTest', csTest)
  console.log('twMergeTest', twMergeTest)
  return (
    <div className='flex items-center justify-center h-screen gap-4'>
      <BaseButton size='sm' color='primary'>
        Click me!
      </BaseButton>
      <BaseButton size='lg' color='secondary'>
        Another Button
      </BaseButton>
      <BaseButton>Default Button</BaseButton>
    </div>
  )
}

export default App
