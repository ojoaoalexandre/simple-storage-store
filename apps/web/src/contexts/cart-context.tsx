'use client'

import { createContext, useContext, useState } from 'react'

type CartItemProps = {
  productId: number
  title: string
  quantity: number
}

type CartContextProps = {
  items: CartItemProps[]
  addToCart: (productId: number, title: string) => void
}

const CartContext = createContext({} as CartContextProps)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([])

  const addToCart = (productId: number, title: string) => {
    setCartItems((state) => {
      const productInCart = state.some(
        (product) => product.productId === productId,
      )

      if (productInCart) {
        return state.map((product) => {
          if (product.productId === productId) {
            return { ...product, quantity: product.quantity + 1 }
          } else {
            return product
          }
        })
      } else {
        return [...state, { productId, title, quantity: 1 }]
      }
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
