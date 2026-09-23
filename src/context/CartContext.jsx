import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    setCartItems([...cartItems, item])
  }

  const removeFromCart = (cartItemId) => {
    setCartItems(cartItems.filter((item) => item.cartItemId !== cartItemId))
  }

  const updateQuantity = (cartItemId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}