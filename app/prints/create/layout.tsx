import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Prints | Create',
  description: 'Create a new print!'
}

export interface LayoutInterface {
  children: ReactNode
}

export function CreateLayout({ children }: LayoutInterface) {
  return children
}

export default CreateLayout
