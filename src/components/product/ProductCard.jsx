import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link to={`/menu/${product.id}`} className="block group">
      <div className="border border-ink/10 rounded-lg overflow-hidden bg-cream relative">
        {product.isBestSeller && (
          <span className="absolute top-2 left-2 bg-citrus text-ink text-xs font-medium px-2 py-1 rounded-full">
            Best Seller
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover"
        />
        <div className="p-4">
          <span className="text-xs text-sage font-medium">{product.category}</span>
          <h3 className="font-display text-xl mt-1 group-hover:text-coffee transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-ink/60 mt-1 mb-3">{product.description}</p>
          <p className="font-medium text-coffee">
            From{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.basePrice)}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard