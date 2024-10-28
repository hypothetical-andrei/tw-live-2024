function f (callback) {
  let x
  setTimeout(() => {
    x = 100
    callback(x)
  }, 1000)
}

function c (x) {
  console.log(x)
}

f(c)
