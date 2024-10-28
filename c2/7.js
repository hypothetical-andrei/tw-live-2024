function sum(x, y, ...args) {
  return args.reduce((a, e) => a + e, x + y)
}

console.log(sum(1,2,3,4,5,6,7,8,9,10))

