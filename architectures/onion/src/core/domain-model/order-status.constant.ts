export const OrderStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
} as const

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]
