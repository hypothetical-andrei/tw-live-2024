function f(a, b, c = 4) {
  return a + b + c
}
console.log(f(1,2,3))
console.log(f('a','b','c'))
console.log(f('a', 2, 3))
console.log(f('a', 2, 3, 5, 5))
console.log(f('a', 2))
console.log(f('a'))