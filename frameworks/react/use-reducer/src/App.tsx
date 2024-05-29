import { useReducer } from 'react'
import './App.css'
import { Posts } from './posts'

function App() {
  const [isToggle, toggle] = useReducer(isToggle => !isToggle, false)

  return (
    <>
      <div>
        <button onClick={toggle}>{isToggle ? 'ON' : 'OFF'}</button>
      </div>
      <h1>useReducer</h1>
      <hr />
      <br />
      <Posts />
    </>
  )
}

export default App
