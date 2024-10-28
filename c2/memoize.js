function memoize(f) {
  const cache = {}
  return function(...args) {
    const key = JSON.stringify(args)
    if (!(key in cache)) {
      cache[key] = f(...args) 
    }
    else {
      console.warn('found it in cache')
    }
    return cache[key]
  }
}

function addStuff(a, b, c) {
  return a + b + c
}

const memoizedAddStuff = memoize(addStuff)

console.log(memoizedAddStuff(1, 2, 3))
console.log(memoizedAddStuff(2, 2, 3))
console.log(memoizedAddStuff(1, 2, 3))
console.log(memoizedAddStuff(1, 2, 3))
console.log(memoizedAddStuff(1, 2, 3))
console.log(memoizedAddStuff(1, 2, 3))