import Link from 'next/link'

export default function RootPage() {
  return (
    <div className="container page center">
      <div className="panel home-panel">
        <h1>Printbook</h1>
        <Link href="/register" className="button">
          Register
        </Link>
        <Link href="/login" className="button">
          Login
        </Link>
      </div>
    </div>
  )
}
