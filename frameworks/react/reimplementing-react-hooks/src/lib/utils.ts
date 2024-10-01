export const shallowEqual = (a: React.DependencyList, b: React.DependencyList) => {
  return a.length === b.length && a.every((dep, i) => Object.is(dep, b[i]))
}
