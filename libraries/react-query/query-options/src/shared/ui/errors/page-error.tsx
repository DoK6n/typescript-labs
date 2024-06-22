import { useNavigate } from 'react-router-dom'

interface PageErrorProps {
  resetErrorBoundary: () => void
  buttons?: React.ReactNode
}

export function PageError({ resetErrorBoundary, buttons }: PageErrorProps) {
  const navigate = useNavigate()
  return (
    <div style={style.block}>
      <h1>There was an error!</h1>
      <div style={style.buttonBlock}>
        <button onClick={() => resetErrorBoundary()}>Try again</button>
        <button onClick={() => navigate('/')}>Go to home</button>
        {buttons}
      </div>
    </div>
  )
}

const style: Record<'block' | 'buttonBlock', React.CSSProperties> = {
  block: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  buttonBlock: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
  },
}
