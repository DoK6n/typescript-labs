import type { Post } from '../model'

export const mapCreatePost = (post: Omit<Post, 'id'>) => {
  return {
    title: post.title,
    author: post.author,
    content: post.content,
  }
}
