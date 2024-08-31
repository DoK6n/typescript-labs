import { CartStore } from '../store'

export const limitItemQuantitySubscribe = (store: CartStore) => {
  store.subscribe(
    state => ({ items: state.items, maxQuantity: state.maxQuantity }),
    () => {
      store.getState().calculateMaxQuantity()
    },
  )
}
