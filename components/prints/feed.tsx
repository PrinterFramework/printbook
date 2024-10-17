'use client'
import { getPostsAction } from 'actions/posts/getPosts'
import { useEffect, useState } from 'react'

export function Feed() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPostsAction()
      if (response.status === 'OK') {
        setPosts(response.posts || [])
      }
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) return <div>Loading posts...</div>

  return (
    <div className="card-posts">
      {posts.map((post) => (
        <div key={post.id} className="card card-post">
          <div className="card-header">
            <h3>{post.title}</h3>
          </div>
          <div className="card-content">
            <p>{post.content}</p>
          </div>
          <div className="card-footer">
            <p>Tag: {post.tag}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Feed
