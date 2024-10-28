function f (...args) {
  return args.reduce((a, e) => a + e, 0)
}

// console.log(f(1,2,3))

function memoize (f) {
  const cache = {}
  return function (...args) {
    const key = JSON.stringify(args)
    // console.log(key)
    if (key in cache) {
      console.log('found in cache: ' + key)
      return cache[key]
    } else {
      const result = f(...args)
      cache[key] = result
      return result
    }
  }
}

const f1 = memoize(f)
console.log(f1(1, 2, 3))
console.log(f1(1, 2, 3))
