class PromiseYou {
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending'
  private value: any = null
  private handlers: Array<{
    onFulfilled?: (value: any) => any
    onRejected?: (reason: any) => any
  }> = []

  constructor(executor: (resolve: (value: any) => void, reject: (reason: any) => void) => void) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  private resolve(value: any): void {
    if (this.state !== 'pending') return

    queueMicrotask(() => {
      this.state = 'fulfilled'
      this.value = value
      this.executeHandlers()
    })
  }

  private reject(reason: any): void {
    if (this.state !== 'pending') return

    queueMicrotask(() => {
      this.state = 'rejected'
      this.value = reason
      this.executeHandlers()
    })
  }

  private executeHandlers(): void {
    if (this.state === 'pending') return

    queueMicrotask(() => {
      this.handlers.forEach(handler => {
        if (this.state === 'fulfilled' && handler.onFulfilled) {
          handler.onFulfilled(this.value)
        }
        if (this.state === 'rejected' && handler.onRejected) {
          handler.onRejected(this.value)
        }
      })
      this.handlers = []
    })
  }

  then(onFulfilled?: (value: any) => any, onRejected?: (reason: any) => any): PromiseYou {
    return new PromiseYou((resolve, reject) => {
      this.handlers.push({
        onFulfilled: value => {
          if (!onFulfilled) {
            resolve(value)
            return
          }
          try {
            resolve(onFulfilled(value))
          } catch (error) {
            reject(error)
          }
        },
        onRejected: reason => {
          if (!onRejected) {
            reject(reason)
            return
          }
          try {
            resolve(onRejected(reason))
          } catch (error) {
            reject(error)
          }
        },
      })
      this.executeHandlers()
    })
  }

  catch(onRejected: (reason: any) => any): PromiseYou {
    return this.then(undefined, onRejected)
  }
}

console.log('global')

setTimeout(() => {
  console.log('setTimeout')
})

const promise = new PromiseYou((resolve, reject) => {
  resolve('promiseYou')
})

promise.then(value => {
  console.log(value)
})

queueMicrotask(() => {
  console.log('queueMicrotask')
})
