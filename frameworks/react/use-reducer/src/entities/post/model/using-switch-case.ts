import { useReducer } from 'react'
import { uuid } from '../../../shared/lib'
import type { Post } from './types'

type Action =
  | { type: 'addPost'; payload: Omit<Post, 'id'> }
  | { type: 'deletePost'; payload: { id: string } }
  | { type: 'editPost'; payload: Post }

const initialPosts: Post[] = [
  {
    id: uuid(),
    author: 'John Doe',
    title: 'First Post',
    content: 'This is the first post',
  },
]

const postsReducer = (state: Post[], action: Action) => {
  switch (action.type) {
    case 'addPost':
      return [...state, { ...action.payload, id: uuid() }]
    case 'deletePost':
      return state.filter(post => post.id !== action.payload.id)
    case 'editPost':
      return state.map(post => (post.id === action.payload.id ? action.payload : post))
    default:
      throw new Error('Invalid action type')
  }
}

export const usePostsSwitchCase = () => {
  const [posts, postDispatch] = useReducer(postsReducer, initialPosts)

  return { posts, postDispatch }
}
