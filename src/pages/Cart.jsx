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
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold">Your cart is empty</h1>
        <Link to="/" className="text-blue-600 underline">
          Browse menu
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.map((item) => (
        <CartItem key={item.cartItemId} item={item} />
      ))}
      <div className="flex justify-between items-center mt-6">
        <p className="text-xl font-bold">Total: {formatRupiah(total)}</p>
        <Link
          to="/checkout"
          className="bg-black text-white px-6 py-3 rounded-lg font-medium"
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart