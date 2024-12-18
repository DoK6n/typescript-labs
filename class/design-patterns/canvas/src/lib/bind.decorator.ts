export function Bind<This, Args extends any[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) {
  function replacementMethod(this: This, ...args: Args) {
    return originalMethod.call(this, ...args)
  }

  context.addInitializer(function (this: This) {
    this[context.name as keyof This] = replacementMethod.bind(this) as any
  })

  return replacementMethod
}
