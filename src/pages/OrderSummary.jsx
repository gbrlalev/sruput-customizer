import { useLocation, Link, Navigate } from 'react-router-dom'

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num)
}

function OrderSummary() {
  const location = useLocation()
  const orderData = location.state

  if (!orderData) {
    return <Navigate to="/" replace />
  }

  const { customer, items, total, orderId } = orderData

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
      <p className="text-gray-500 mb-6">Order ID: {orderId}</p>

      <div className="text-left border rounded-lg p-4 mb-4">
        <p className="font-semibold mb-2">Customer</p>
        <p>{customer.name}</p>
        <p>{customer.phone}</p>
        {customer.notes && <p className="text-gray-500 mt-1">Note: {customer.notes}</p>}
      </div>

      <div className="text-left border rounded-lg p-4 mb-4">
        <p className="font-semibold mb-2">Items</p>
        {items.map((item) => (
          <div key={item.cartItemId} className="flex justify-between text-sm mb-1">
            <span>
              {item.name} ({item.size.label}) x{item.quantity}
            </span>
            <span>{formatRupiah(item.unitPrice * item.quantity)}</span>
          </div>
        ))}
      </div>

      <p className="text-xl font-bold mb-6">Total: {formatRupiah(total)}</p>

      <Link to="/" className="text-blue-600 underline">
        Back to Menu
      </Link>
    </div>
  )
}

export default OrderSummary