import { useState } from 'react'
import products from '../data/products.json'
import ProductGrid from '../components/product/ProductGrid'
import CategoryFilter from '../components/product/CategoryFilter'

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...new Set(products.map((p) => p.category))]

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <div>
      <section className="bg-coffee text-cream px-6 py-20 text-center">
        <h1 className="font-display text-5xl mb-4">Sruput</h1>
        <p className="text-cream/80 max-w-md mx-auto">
          Handcrafted drinks, customized your way. Pick your size, sweetness, and toppings — every cup made just for you.
        </p>
      </section>

      <div className="px-6 pt-8">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <ProductGrid products={filteredProducts} />
    </div>
  )
}

export default Menu