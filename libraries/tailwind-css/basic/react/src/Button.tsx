import { PropsWithChildren } from 'react'

interface ButtonProps {
  onClick?: () => void
}

export default function Button({ onClick, children }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className='w-40 px-4 py-2 text-white rounded-md bg-slate-500 hover:bg-slate-400 active:bg-slate-600'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
