import type { Post } from './entities/post/model'

interface PostCardProps {
  post: Post
}
export function PostCard({ post }: PostCardProps) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ margin: '0 0 8px 0' }}>{post.title}</h2>
      <p style={{ margin: '0 0 8px 0' }}>{post.content}</p>
      <p style={{ margin: '0', fontStyle: 'italic' }}>글쓴이: {post.author}</p>
    </div>
  )
}
