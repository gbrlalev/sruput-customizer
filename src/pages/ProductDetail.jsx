import { useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../data/products.json'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState(product?.customizations.sizes[0])
  const [selectedSweetness, setSelectedSweetness] = useState(product?.customizations.sweetness[0])
  const [selectedIce, setSelectedIce] = useState(product?.customizations.iceLevel[0])
  const [selectedToppings, setSelectedToppings] = useState([])

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold">Product not found</h1>
        <p className="text-gray-500">The item you're looking for doesn't exist.</p>
      </div>
    )
  }

  const toggleTopping = (topping) => {
    const alreadySelected = selectedToppings.find((t) => t.label === topping.label)
    if (alreadySelected) {
      setSelectedToppings(selectedToppings.filter((t) => t.label !== topping.label))
    } else {
      setSelectedToppings([...selectedToppings, topping])
    }
  }

  const toppingsTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0)
  const totalPrice = product.basePrice + selectedSize.priceModifier + toppingsTotal

  const formatRupiah = (num) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num)

  const handleAddToCart = () => {
    addToCart({
      cartItemId: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      sweetness: selectedSweetness,
      iceLevel: selectedIce,
      toppings: selectedToppings,
      quantity: 1,
      unitPrice: totalPrice,
    })
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <span className="text-xs uppercase text-gray-500">{product.category}</span>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>

      {/* Size */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Size</h3>
        <div className="flex gap-2">
          {product.customizations.sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 rounded border ${
                selectedSize.label === size.label
                  ? 'bg-black text-white'
                  : 'bg-white text-black'
              }`}
            >
              {size.label} {size.priceModifier > 0 && `+${formatRupiah(size.priceModifier)}`}
            </button>
          ))}
        </div>
      </div>

      {/* Sweetness */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sweetness</h3>
        <div className="flex gap-2 flex-wrap">
          {product.customizations.sweetness.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedSweetness(level)}
              className={`px-3 py-1 rounded border ${
                selectedSweetness === level ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Ice Level */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Ice Level</h3>
        <div className="flex gap-2 flex-wrap">
          {product.customizations.iceLevel.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedIce(level)}
              className={`px-3 py-1 rounded border ${
                selectedIce === level ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Toppings */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Toppings</h3>
        <div className="flex gap-2 flex-wrap">
          {product.customizations.toppings.map((topping) => {
            const isSelected = selectedToppings.find((t) => t.label === topping.label)
            return (
              <button
                key={topping.label}
                onClick={() => toggleTopping(topping)}
                className={`px-3 py-1 rounded border ${
                  isSelected ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                {topping.label} +{formatRupiah(topping.price)}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-xl font-bold">Total: {formatRupiah(totalPrice)}</p>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-black text-white py-3 rounded-lg font-medium"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductDetail