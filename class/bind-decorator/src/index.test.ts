import { Bind } from './bind.decorator'

class TestClass {
  @Bind
  methodWithBind() {
    console.log('methodWithBind', this)
    return this
  }

  methodWithoutBind() {
    console.log('methodWithoutBind', this)
    return this
  }

  arrowMethod = () => {
    console.log('arrowMethod', this)
    return this
  }
}

describe('Bind Decorator Tests', () => {
  let instance: TestClass

  beforeEach(() => {
    instance = new TestClass()
  })

  test('should bind "this" when using @Bind decorator', () => {
    const method = instance.methodWithBind
    expect(method()).toBe(instance)
  })

  test('should not bind "this" when not using @Bind decorator', () => {
    const method = instance.methodWithoutBind
    expect(method()).not.toBe(instance)
  })

  test('should bind "this" when using arrow function', () => {
    const method = instance.arrowMethod
    expect(method()).toBe(instance)
  })
})
