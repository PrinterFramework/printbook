'use client'
import { loginAction } from 'actions/account/login'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('' as '' | 'success' | 'error')
  const [statusMessage, setStatusMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    const response = await loginAction({ username, password })
    if (response.status === 'OK') {
      router.push('/prints')
    } else {
      setStatusMessage(response.message || 'Login failed.')
      setStatus('error')
    }
    setLoading(false)
  }

  return (
    <div className="panel login-form">
      <h1>Printbook | Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="login-username-input">Username</label>
        <input
          id="login-username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="login-password-input">Password</label>
        <input
          id="login-password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {status === 'error' && <div className="error">{statusMessage}</div>}
      </form>
      <Link href="/register" className="link">
        Don't have an account? Register here
      </Link>
    </div>
  )
}
