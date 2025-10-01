import Footer from '../../components/Footer'
import CartHeader from '../../components/СartHeader'

interface Props {
  children?: React.ReactNode
}
export default function CartLayout({ children } : Props) {
  return (
    <div>
      <CartHeader />
        {children}
      <Footer />
    </div>
  )
}
