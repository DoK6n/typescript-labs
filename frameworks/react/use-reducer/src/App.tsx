import { useReducer } from 'react'
import './App.css'
import { PostsSwitchCase } from './posts-switch-case'

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
      <PostsSwitchCase />
    </>
  )
}

export default App
