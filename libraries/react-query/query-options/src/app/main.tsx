import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Providers } from './providers'

async function enableMocking() {
  if (import.meta.env.PROD) {
    return
  }

  const { worker } = await import('~/mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Providers />
    </React.StrictMode>,
  ),
)
