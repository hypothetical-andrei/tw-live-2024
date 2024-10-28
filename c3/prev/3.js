function f () {
  let x
  setTimeout(() => {
    x = 100
  }, 1000)
  return x
}
console.log(f())
