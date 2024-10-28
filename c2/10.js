function fibGen(name){
  let cache = [1,1]
  function fib(index){
      console.log(`name is: ${name} cache is: ${JSON.stringify(cache)}`)
      if (index < cache.length){
          console.warn('found ' + index)
          return cache[index]
      }
      else{						
          cache[index] = fib(index - 1) + fib(index - 2)
          return cache[index]
      }
  }
  return fib
}
let f = fibGen('first')
console.log(f(1))
console.log(f(5))
console.log(f(3))
f = fibGen('second')
console.log(f(1))
