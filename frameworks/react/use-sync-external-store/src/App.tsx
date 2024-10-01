import { store, useStore } from './store'

function App() {
  const count = useStore(store, state => state.count)

  return (
    <div>
      Count: {count}
      <button onClick={() => store.setState(state => ({ count: state.count + 1 }))}>+</button>
      <button onClick={() => store.setState(state => ({ count: state.count - 1 }))}>-</button>
      <hr />
      <Child />
    </div>
  )
}

const Child = () => {
  const count = useStore(store, state => state.count)
  return <div>Child: {count}</div>
}

export default App
