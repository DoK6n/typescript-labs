import { useReducer } from 'react'
import { Post } from './types'
import { uuid } from 'src/shared/lib'
import { match } from 'ts-pattern'

type CreateAction<T extends ActionTypes, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P }

type ActionTypes = 'AddPost' | 'DeletePost' | 'EditPost' | 'FindPostByAuthor'

type Actions =
  | CreateAction<'AddPost', Omit<Post, 'id'>>
  | CreateAction<'DeletePost', { id: string }>
  | CreateAction<'EditPost', Post>

const initialPosts: Post[] = [
  {
    id: '1',
    author: 'John Doe',
    title: 'First Post',
    content: 'This is the first post',
  },
]

export const usePosts = () => {
  const [posts, dispatch] = useReducer(
    (state: Post[], action: Actions) =>
      match(action)
        .with({ type: 'AddPost' }, ({ payload }) => [...state, { ...payload, id: uuid() }])
        .with({ type: 'DeletePost' }, ({ payload }) => state.filter(post => post.id !== payload.id))
        .with({ type: 'EditPost' }, ({ payload }) =>
          state.map(post => (post.id === payload.id ? payload : post)),
        )
        .otherwise(() => {
          throw new Error('Invalid action type')
        }),
    initialPosts,
  )

  return { posts, dispatch }
}
