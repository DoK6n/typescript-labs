import { useReducer } from 'react'
import { Post } from './types'
import { uuid } from '../../../shared/lib'
import { match } from 'ts-pattern'

type CreateAction<T extends string, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P }

type Actions =
  | CreateAction<'addPost', Omit<Post, 'id'>>
  | CreateAction<'deletePost', { id: string }>
  | CreateAction<'editPost', Post>

const initialPosts: Post[] = [
  {
    id: uuid(),
    author: 'John Doe',
    title: 'First Post',
    content: 'This is the first post',
  },
]

export const usePostsFunctional = () => {
  const [posts, postDispatch] = useReducer(
    (state: Post[], action: Actions) =>
      match(action)
        .with({ type: 'addPost' }, ({ payload }) => [...state, { ...payload, id: uuid() }])
        .with({ type: 'deletePost' }, ({ payload }) => state.filter(post => post.id !== payload.id))
        .with({ type: 'editPost' }, ({ payload }) =>
          state.map(post => (post.id === payload.id ? payload : post)),
        )
        .otherwise(() => {
          throw new Error('Invalid action type')
        }),
    initialPosts,
  )

  return { posts, postDispatch }
}
