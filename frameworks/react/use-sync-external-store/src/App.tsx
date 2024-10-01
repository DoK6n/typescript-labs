import { useCountStore } from './store'

function App() {
  const count = useCountStore(s => s.count)
  const name = useCountStore(s => s.name)

  return (
    <div>
      Count: {count}
      Name: {name}
      <button onClick={() => useCountStore.setState(state => ({ count: state.count + 1 }))}>
        +
      </button>
      <button onClick={() => useCountStore.setState(state => ({ count: state.count - 1 }))}>
        -
      </button>
      <hr />
      <Child />
    </div>
  )
}

const Child = () => {
  const count = useCountStore(state => state.count)
  return <div>Child: {count}</div>
}

export default App
