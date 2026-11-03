import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { CloseIcon, SearchIcon } from '../components/Icons'
import { categories, products } from '../data/products'
import '../styles/ProductCard.css'
import '../styles/Shop.css'

const sorts = {
  featured: { label: 'Featured', fn: () => 0 },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  name: { label: 'Name: A–Z', fn: (a, b) => a.name.localeCompare(b.name) },
}

const priceBands = [
  { id: 'any', label: 'Any price', test: () => true },
  { id: 'u7', label: 'Under ₦7,000', test: (p) => p.price < 7000 },
  { id: '7-12', label: '₦7,000 – ₦12,000', test: (p) => p.price >= 7000 && p.price <= 12000 },
  { id: 'o12', label: 'Over ₦12,000', test: (p) => p.price > 12000 },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const sort = params.get('sort') || 'featured'
  const band = params.get('price') || 'any'
  const query = params.get('q') || ''

  const update = (key, value, fallback) => {
    const next = new URLSearchParams(params)
    if (!value || value === fallback) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const priceTest = priceBands.find((b) => b.id === band)?.test ?? (() => true)
    const q = query.trim().toLowerCase()
    return products
      .filter((p) => category === 'all' || p.category === category)
      .filter(priceTest)
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .sort(sorts[sort]?.fn ?? sorts.featured.fn)
  }, [category, sort, band, query])

  const activeCat = categories.find((c) => c.id === category) ?? categories[0]
  const countFor = (id) => (id === 'all' ? products.length : products.filter((p) => p.category === id).length)

  return (
    <div className="shop">
      <section className="page-banner">
        <p className="script">the boutique</p>
        <h1 className="title">{activeCat.id === 'all' ? 'Shop all' : activeCat.name}</h1>
        <p className="crumbs">
          <Link to="/">Home</Link> / Shop
        </p>
      </section>

      <div className="container">
        <div className="toolbar">
          <label className="search">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search tops, sets, watches…"
              value={query}
              onChange={(e) => update('q', e.target.value, '')}
              aria-label="Search products"
            />
            {query && (
              <button type="button" className="search-clear" aria-label="Clear search" onClick={() => update('q', '', '')}>
                <CloseIcon />
              </button>
            )}
          </label>
          <div className="toolbar-right">
            <span className="result-count">
              {results.length} {results.length === 1 ? 'piece' : 'pieces'}
            </span>
            <select value={sort} onChange={(e) => update('sort', e.target.value, 'featured')} aria-label="Sort by">
              {Object.entries(sorts).map(([id, s]) => (
                <option key={id} value={id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container shop-layout">
        <aside className="filters" aria-label="Filters">
          <div className="filter-block">
            <h4>Categories</h4>
            <ul className="filter-list">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    className={`filter-option ${category === c.id ? 'active' : ''}`}
                    onClick={() => update('category', c.id, 'all')}
                  >
                    <span>{c.name}</span>
                    <span className="filter-count">{countFor(c.id)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-block">
            <h4>Price</h4>
            <ul className="filter-list">
              {priceBands.map((b) => (
                <li key={b.id}>
                  <label className="radio">
                    <input
                      type="radio"
                      name="price"
                      checked={band === b.id}
                      onChange={() => update('price', b.id, 'any')}
                    />
                    <span className="radio-dot" />
                    {b.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-promo">
            <p className="script">psst…</p>
            <p>Can’t find your size or colour? New pieces and restocks drop every week.</p>
            <Link to="/#newsletter" className="link-arrow">
              Get restock alerts
            </Link>
          </div>
        </aside>

        <div className="shop-main">
          <div className="pills" role="tablist" aria-label="Categories">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={category === c.id}
                className={`pill ${category === c.id ? 'active' : ''}`}
                onClick={() => update('category', c.id, 'all')}
              >
                {c.name}
              </button>
            ))}
          </div>

          {results.length > 0 ? (
            <div className="product-grid shop-grid">
              {results.map((p, i) => (
                <ProductCard key={p.id} product={p} style={{ animationDelay: `${i * 0.04}s` }} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p className="script">oops, nothing here</p>
              <p>No pieces match those filters yet. Try clearing them.</p>
              <button className="btn btn-outline" onClick={() => setParams({}, { replace: true })}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
