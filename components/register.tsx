'use client'
import { registerAction } from 'actions/account/register'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Register() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('' as '' | 'success' | 'error')
  const [statusMessage, setStatusMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="panel register-form">
      <h1>Printbook | Register</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setStatus('')
          setLoading(true)
          try {
            const response = await registerAction({
              username,
              password,
              confirmPassword
            })
            if (response.status === 'OK') {
              setStatusMessage('Registration successful! Redirecting...')
              setStatus('success')
              router.push('/prints')
            } else {
              setStatusMessage(response.message || 'Registration failed.')
              setStatus('error')
            }
          } catch (error) {
            console.error(error)
            setStatusMessage('There was an error registering')
            setStatus('error')
          } finally {
            setLoading(false)
          }
        }}
      >
        <label htmlFor="register-username-input">Username</label>
        <input
          id="register-username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="register-password-input">Password</label>
        <input
          id="register-password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="register-confirmPassword-input">Confirm Password</label>
        <input
          id="register-confirmPassword-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
        <div className={`box ${status === 'error' ? 'box-active red' : ''}`}>
          {statusMessage}
        </div>
        <div
          className={`box ${status === 'success' ? 'box-active green' : ''}`}
        >
          {statusMessage}
        </div>
      </form>
      <Link href="/login" className="link">
        Already have an account? Login here.
      </Link>
    </div>
  )
}

export default Register
