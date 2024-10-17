import { Header } from 'components/prints/header'

export function PrintLayout({ children }: LayoutInterface) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default PrintLayout
