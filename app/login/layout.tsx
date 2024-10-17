import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { GenerateMetadata } from 'util/metadata'

export const metadata: Metadata = GenerateMetadata({
  title: 'Printbook | Login',
  description: 'Login page for Printbook users.'
})

export interface LayoutInterface {
  children: ReactNode
}

export function LoginLayout({ children }: LayoutInterface) {
  return <>{children}</>
}

export default LoginLayout
