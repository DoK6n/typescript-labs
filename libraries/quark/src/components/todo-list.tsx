import { useState } from 'react'
import { quark } from '../lib/react'

interface Todo {
  id: string
  text: string
  done: boolean
}

interface TodoState {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
  getUndoneCount: () => number
}

const useTodos = quark<TodoState>((set, get) => ({
  todos: [
    {
      id: crypto.randomUUID(),
      text: 'Learn Quark',
      done: false,
    },
  ],
  addTodo: (text: string) => {
    set(prev => ({
      todos: [
        ...prev.todos,
        {
          id: crypto.randomUUID(),
          text,
          done: false,
        },
      ],
    }))
  },
  toggleTodo: (id: string) => {
    set(prev => ({
      todos: prev.todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
    }))
  },
  removeTodo: (id: string) => {
    set(prev => ({
      todos: prev.todos.filter(todo => todo.id !== id),
    }))
  },
  getUndoneCount: () => {
    return get().todos.filter(todo => !todo.done).length
  },
}))

export function TodoList() {
  const { todos, addTodo, toggleTodo, removeTodo, getUndoneCount, reset } = useTodos()
  const [newTodo, setNewTodo] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo('')
    }
  }

  return (
    <div>
      <h1>
        Todo List <span style={{ fontSize: '24px' }}>({getUndoneCount()})</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder='New Todo'
        />
        <button type='submit'>+</button>
        <button type='button' onClick={reset}>
          Reset
        </button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label htmlFor={todo.id}>
              <input
                type='checkbox'
                id={todo.id}
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.done ? 'line-through' : 'none',
                  padding: '0 1rem',
                }}
              >
                {todo.text}
              </span>
            </label>
            <button
              style={{
                backgroundColor: 'tomato',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                padding: 0,
                lineHeight: '1',
                fontSize: '12px',
              }}
              onClick={() => removeTodo(todo.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
