import { useState } from 'react'
import type { Route } from './+types/about'
import { useDebounce } from 'shared/lib'

const words = ['apple', 'banana', 'grape', 'orange', 'peach', 'pear', 'kiwi', 'mango', 'melon', 'berry']

export function meta({}: Route.MetaArgs) {
  return [{ title: 'About' }, { name: 'description', content: 'About Page' }]
}

export default function About() {
  const [value, setValue] = useState('')
  const debouncedSearchText = useDebounce(value, 300)
  const filteredWords = words.filter(word => word.toLowerCase().includes(debouncedSearchText.toLowerCase()))

  return (
    <div>
      <h1>About Page</h1>
      <input
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Search for a word...'
        style={{ width: '100%' }}
      />
      <hr />
      <ul>
        {filteredWords.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  )
}
