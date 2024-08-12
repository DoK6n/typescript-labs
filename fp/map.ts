const cloudVMCosts = [
  { vendor: 'AWS', cpu: 2, memory: 2, costPerMonth: 21_902 },
  { vendor: 'KT Cloud', cpu: 2, memory: 2, costPerMonth: 54_450 },
  { vendor: 'GCP', cpu: 2, memory: 2, costPerMonth: 84_951 },
]

export const map = <T, U>(fn: (params: T) => U, iterator: Iterable<T>): U[] => {
  const result: Array<U> = []
  for (const item of iterator) {
    result.push(fn(item))
  }
  return result
}

const nums = map(n => n * 2, [1, 2, 3])
console.log(nums) // [ 2, 4, 6 ]

const costs = map(vm => vm.costPerMonth, cloudVMCosts)
console.log(costs) // [ 21902, 54450, 84951 ]

const vendors = map(vm => vm.vendor, cloudVMCosts)
console.log(vendors) // [ 'AWS', 'KT Cloud', 'GCP' ]

const vmSpecs = map(vm => ({ cpu: vm.cpu, memory: vm.memory }), cloudVMCosts)
console.log(vmSpecs) // [ { cpu: 2, memory: 2 }, { cpu: 2, memory: 2 }, { cpu: 2, memory: 2 } ]

function* gen() {
  yield 2
  if (false) yield 3
  yield 4
}

console.log(map(n => n * n, gen()))

let m = new Map()
m.set('a', 10)
m.set('b', 20)

const it = m[Symbol.iterator]()
console.log(it.next())
console.log(it.next())
console.log(it.next())

console.log(new Map(map(([k, a]) => [k, a * 2], m)))

console.log(
  new Map([
    ['a', 10],
    ['b', 20],
  ]),
)
