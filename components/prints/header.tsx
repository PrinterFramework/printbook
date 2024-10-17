'use client'
import { logoutAction } from 'actions/logout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Header() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    const response = await logoutAction()
    setLoading(false)

    if (response.status === 'OK') {
      router.push('/') // Redirect to the home page
    } else {
      console.error(response.message)
      alert('Logout failed. Please try again.')
    }
  }

  return (
    <header className="header">
      <h1>Printbook</h1>
      <div className="header-menu">
        <Link href="/prints" className="button">
          Prints
        </Link>
        <Link href="/prints/create" className="button">
          Create Print
        </Link>
        <button onClick={handleLogout} className="button" disabled={loading}>
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </header>
  )
}

export default Header
