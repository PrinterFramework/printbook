import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Printbook | Register',
  description: 'Register to join Printbook'
}

export interface LayoutInterface {
  children: ReactNode
}

export function RegisterLayout({ children }: LayoutInterface) {
  return children
}

export default RegisterLayout
