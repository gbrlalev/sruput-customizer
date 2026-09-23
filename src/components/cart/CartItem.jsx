import { useCart } from '../../context/CartContext'

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num)
}

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()
  const subtotal = item.unitPrice * item.quantity

  return (
    <div className="flex gap-4 border-b border-ink/10 py-4">
      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-display text-lg">{item.name}</h3>
        <p className="text-sm text-ink/50">
          {item.size.label} · {item.sweetness} · {item.iceLevel}
        </p>
        {item.toppings.length > 0 && (
          <p className="text-sm text-ink/50">
            {item.toppings.map((t) => t.label).join(', ')}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.cartItemId, Math.max(1, item.quantity - 1))}
            className="border border-ink/20 w-7 h-7 rounded hover:border-coffee transition-colors"
          >
            −
          </button>
          <span className="w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
            className="border border-ink/20 w-7 h-7 rounded hover:border-coffee transition-colors"
          >
            +
          </button>
          <button
            onClick={() => removeFromCart(item.cartItemId)}
            className="text-sm text-ink/40 hover:text-coffee ml-4 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
      <p className="font-medium text-coffee">{formatRupiah(subtotal)}</p>
    </div>
  )
}

export default CartItem