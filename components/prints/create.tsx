'use client'
import { createPostAction } from 'actions/posts/create'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreatePost() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('' as '' | 'success' | 'error')
  const [statusMessage, setStatusMessage] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('Idea')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      const response = await createPostAction({ title, content, tag })

      if (response.status === 'OK') {
        setStatus('success')
        setStatusMessage('Post created successfully! 🎉')
        router.push('/prints')
      } else {
        setStatus('error')
        setStatusMessage(result.message || 'Error creating post.')
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
      setStatusMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>

      <label htmlFor="tag">Tag</label>
      <select id="tag" value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="Idea">Idea</option>
        <option value="Inspiration">Inspiration</option>
        <option value="Comment">Comment</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
      <div className={`message ${status}`}>{statusMessage}</div>
    </form>
  )
}
