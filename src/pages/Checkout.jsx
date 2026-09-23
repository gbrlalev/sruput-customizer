import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Checkout() {
  const { cartItems, clearCart } = useCart()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  const total = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const orderData = {
      customer: { name, phone, notes },
      items: cartItems,
      total,
      orderId: crypto.randomUUID().slice(0, 8).toUpperCase(),
    }
    clearCart()
    navigate('/order-summary', { state: orderData })
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-6 py-24 text-center">
        <h1 className="font-display text-2xl">Your cart is empty</h1>
      </div>
    )
  }

  const inputClass =
    'w-full border border-ink/20 rounded px-3 py-2 bg-cream focus:border-coffee focus:outline-none transition-colors'

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="font-display text-3xl mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={inputClass}
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-coffee text-cream py-3 rounded-lg font-medium hover:bg-ink transition-colors"
        >
          Place Order
        </button>
      </form>
    </div>
  )
}

export default Checkout