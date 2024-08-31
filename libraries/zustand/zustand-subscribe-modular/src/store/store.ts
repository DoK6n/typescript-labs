import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { CartItem, Coupon, Product } from './types'
import { calculateTotalSubscribe } from './subscribe'
import { createSubscribeExecutor } from '../lib/helpers'
import { limitItemQuantitySubscribe } from './subscribe/limitItemQuantitySubscribe'

// 장바구니 상태 인터페이스
interface CartState {
  items: CartItem[]
  coupon: Coupon | null
  subtotal: number
  discount: number
  total: number
  maxQuantity: number
}

// 장바구니 액션 인터페이스
interface CartActions {
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
  setMaxQuantity: (quantity: number) => void
  calculateTotals: () => void
  calculateMaxQuantity: () => void
}

interface CartStoreState extends CartState, CartActions {}

export const useCartStore = create<CartStoreState>()(
  subscribeWithSelector((set, get) => ({
    items: [],
    coupon: null,
    subtotal: 0,
    discount: 0,
    total: 0,
    maxQuantity: 10,

    addItem: (product: Product, quantity: number) => {
      set(state => {
        const existingItem = state.items.find(item => item.product.id === product.id)
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          }
        } else {
          return {
            items: [...state.items, { product, quantity }],
          }
        }
      })
    },

    removeItem: (productId: string) => {
      set(state => ({
        items: state.items.filter(item => item.product.id !== productId),
      }))
    },

    updateQuantity: (productId: string, quantity: number) => {
      set(state => ({
        items: state.items.map(item =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      }))
    },

    applyCoupon: (coupon: Coupon) => {
      set({ coupon })
    },

    removeCoupon: () => {
      set({ coupon: null })
    },

    setMaxQuantity: (quantity: number) => {
      set({ maxQuantity: quantity })
    },

    calculateTotals: () => {
      const { items, coupon } = get()
      const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      const discountPercentage = coupon ? coupon.discountPercentage : 0
      const discount = subtotal * (discountPercentage / 100)
      const total = subtotal - discount

      set({ subtotal, discount, total })
    },

    calculateMaxQuantity: () => {
      const { items } = get()
      const maxQuantity = items.reduce((max, item) => Math.max(max, item.quantity), 0)
      set({ maxQuantity })
    },
  })),
)

export type CartStore = typeof useCartStore

const subscribeExecutor = createSubscribeExecutor(useCartStore)
subscribeExecutor.execute([calculateTotalSubscribe, limitItemQuantitySubscribe])
