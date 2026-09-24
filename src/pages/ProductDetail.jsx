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
        <p className="text-ink/60">The item you're looking for doesn't exist.</p>
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

  const selectClass = (isSelected) =>
    `px-3 py-1.5 rounded border transition-colors ${
      isSelected
        ? 'bg-coffee text-cream border-coffee'
        : 'bg-cream text-ink border-ink/20 hover:border-coffee'
    }`

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
      {/* Left: image + ingredients */}
      <div className="w-full md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover rounded-lg"
        />

        {product.ingredients && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Ingredients</h3>
            <ul className="flex flex-wrap gap-2">
              {product.ingredients.map((item) => (
                <li
                  key={item}
                  className="text-sm text-ink/70 bg-sage/10 border border-sage/30 rounded-full px-3 py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right: content */}
      <div className="w-full md:w-1/2">
        <span className="text-xs text-sage font-medium">{product.category}</span>
        <h1 className="font-display text-3xl mt-1">{product.name}</h1>
        <p className="text-ink/60 mt-2 mb-6">{product.description}</p>

        <div className="mb-5">
          <h3 className="font-semibold mb-2">Size</h3>
          <div className="flex gap-2">
            {product.customizations.sizes.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className={selectClass(selectedSize.label === size.label)}
              >
                {size.label} {size.priceModifier > 0 && `+${formatRupiah(size.priceModifier)}`}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="font-semibold mb-2">Sweetness</h3>
          <div className="flex gap-2 flex-wrap">
            {product.customizations.sweetness.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedSweetness(level)}
                className={selectClass(selectedSweetness === level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="font-semibold mb-2">Ice Level</h3>
          <div className="flex gap-2 flex-wrap">
            {product.customizations.iceLevel.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedIce(level)}
                className={selectClass(selectedIce === level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Toppings</h3>
          <div className="flex gap-2 flex-wrap">
            {product.customizations.toppings.map((topping) => {
              const isSelected = selectedToppings.find((t) => t.label === topping.label)
              return (
                <button
                  key={topping.label}
                  onClick={() => toggleTopping(topping)}
                  className={selectClass(isSelected)}
                >
                  {topping.label} +{formatRupiah(topping.price)}
                </button>
              )
            })}
          </div>
        </div>

        <p className="font-display text-2xl mb-4">Total: {formatRupiah(totalPrice)}</p>

        <button
          onClick={handleAddToCart}
          className="w-full bg-coffee text-cream py-3 rounded-lg font-medium hover:bg-ink transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetail