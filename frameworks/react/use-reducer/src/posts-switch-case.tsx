import { mapCreatePost, f, maybe } from './shared/lib'
import { PostCard } from './post-card'
import { usePosts } from './entities/post/model/using-switch-case'
import type { Post } from './entities/post/model'

export function PostsSwitchCase() {
  const { posts, postDispatch } = usePosts()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const post: Omit<Post, 'id'> = {
      title: maybe(formData.get('title')?.toString()),
      author: maybe(formData.get('author')?.toString()),
      content: maybe(formData.get('content')?.toString()),
    }

    postDispatch({ type: 'ADD_POST', post: mapCreatePost(post) })
  }

  return (
    <div style={f.flexColumn}>
      <form onSubmit={handleSubmit}>
        <div style={f.flexColumn}>
          <div style={f.flexRow}>
            <label>Title</label>
            <input type='text' name='title' />
          </div>
          <div style={f.flexRow}>
            <label>Author</label>
            <input type='text' name='author' />
          </div>
          <div style={f.flexRow}>
            <label>Content</label>
            <input type='text' name='content' />
          </div>
        </div>
        <br />
        <button type='submit'>Create Post</button>
      </form>

      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
