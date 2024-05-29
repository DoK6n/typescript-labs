import { useReducer } from 'react'
import { uuid } from '../../../shared/lib'
import type { Post } from './types'

type Action =
  | { type: 'ADD_POST'; post: Omit<Post, 'id'> }
  | { type: 'DELETE_POST'; id: string }
  | { type: 'EDIT_POST'; post: Post }

const initialPosts: Post[] = [
  {
    id: '1',
    author: 'John Doe',
    title: 'First Post',
    content: 'This is the first post',
  },
]

const postsReducer = (state: Post[], action: Action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, { ...action.post, id: uuid() }]
    case 'DELETE_POST':
      return state.filter(post => post.id !== action.id)
    case 'EDIT_POST':
      return state.map(post => (post.id === action.post.id ? action.post : post))
    default:
      throw new Error('Invalid action type')
  }
}

export const usePosts = () => {
  const [posts, postDispatch] = useReducer(postsReducer, initialPosts)

  return { posts, postDispatch }
}
