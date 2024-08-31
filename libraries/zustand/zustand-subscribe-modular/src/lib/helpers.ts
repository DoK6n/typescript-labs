export const createSubscribeExecutor = <T>(store: T) => ({
  execute: (subscribes: ((store: T) => void)[]) => {
    subscribes.forEach(subscribe => subscribe(store))
  },
})
