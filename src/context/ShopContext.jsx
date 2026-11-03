import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products'

const ShopContext = createContext(null)

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage unavailable (private mode) — state still works in memory
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => load('shoptee-cart', []))
  const [wishlist, setWishlist] = useState(() => load('shoptee-wishlist', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => save('shoptee-cart', cart), [cart])
  useEffect(() => save('shoptee-wishlist', wishlist), [wishlist])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const addToCart = (productId, { color, size, qty = 1 } = {}, { openDrawer = true } = {}) => {
    const key = `${productId}|${color ?? ''}|${size ?? ''}`
    setCart((items) => {
      const existing = items.find((i) => i.key === key)
      if (existing) return items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      return [...items, { key, productId, color, size, qty }]
    })
    if (openDrawer) setCartOpen(true)
  }

  const updateQty = (key, qty) =>
    setCart((items) => (qty < 1 ? items.filter((i) => i.key !== key) : items.map((i) => (i.key === key ? { ...i, qty } : i))))

  const removeFromCart = (key) => setCart((items) => items.filter((i) => i.key !== key))

  const toggleWishlist = (productId) => {
    const adding = !wishlist.includes(productId)
    setWishlist((list) => (adding ? [...list, productId] : list.filter((id) => id !== productId)))
    setToast(adding ? 'Added to your wishlist ♡' : 'Removed from wishlist')
  }

  const lines = useMemo(
    () => cart.map((i) => ({ ...i, product: getProduct(i.productId) })).filter((i) => i.product),
    [cart]
  )
  const subtotal = lines.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const count = lines.reduce((sum, i) => sum + i.qty, 0)

  const value = {
    lines,
    subtotal,
    count,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart: () => setCart([]),
    wishlist,
    toggleWishlist,
    isWished: (id) => wishlist.includes(id),
    cartOpen,
    setCartOpen,
    toast,
    setToast,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShop = () => useContext(ShopContext)
