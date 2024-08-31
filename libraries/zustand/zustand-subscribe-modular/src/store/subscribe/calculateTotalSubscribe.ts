import { CartStore } from '../store'

export const calculateTotalSubscribe = (store: CartStore) => {
  store.subscribe(
    state => ({ items: state.items, coupon: state.coupon }),
    () => {
      store.getState().calculateTotals()
    },
  )
}
