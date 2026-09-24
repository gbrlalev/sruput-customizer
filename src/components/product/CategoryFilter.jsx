function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap max-w-5xl mx-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full border text-sm capitalize transition-colors ${
            selected === cat
              ? 'bg-coffee text-cream border-coffee'
              : 'bg-cream text-ink border-ink/20 hover:border-coffee'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter