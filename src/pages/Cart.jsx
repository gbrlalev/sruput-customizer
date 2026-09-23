import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num)
}

function Cart() {
  const { cartItems } = useCart()
  const total = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="p-6 py-24 text-center">
        <h1 className="font-display text-2xl mb-2">Your cart is empty</h1>
        <p className="text-ink/50 mb-4">Looks like you haven't picked a drink yet.</p>
        <Link to="/" className="text-coffee underline">
          Browse menu
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="font-display text-3xl mb-6">Your Cart</h1>
      {cartItems.map((item) => (
        <CartItem key={item.cartItemId} item={item} />
      ))}
      <div className="flex justify-between items-center mt-8">
        <p className="font-display text-2xl">Total: {formatRupiah(total)}</p>
        <Link
          to="/checkout"
          className="bg-coffee text-cream px-6 py-3 rounded-lg font-medium hover:bg-ink transition-colors"
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart