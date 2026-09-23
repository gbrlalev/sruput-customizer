import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function Navbar() {
  const { cartItems } = useCart()
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-coffee text-cream">
      <Link to="/" className="font-display text-2xl">
        Sruput
      </Link>
      <div className="flex items-center gap-6 font-body text-sm">
        <Link to="/faq" className="hover:text-citrus transition-colors">
          FAQ
        </Link>
        <Link to="/cart" className="relative hover:text-citrus transition-colors">
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-citrus text-ink text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar