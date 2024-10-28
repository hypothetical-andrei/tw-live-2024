function f0 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('result for f0')
      resolve(100)
    }, 1000)
  })
}

function f1 (x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('result for f1')
      resolve(200 + x)
    }, 1000)
  })
}

function f2 (x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('result for f2')
      resolve(300 + x)
    }, 1000)
  })
}

f0().then((result) => {
  return f1(result)
})
  .then((result) => {
    return f2(result)
  })
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log('an error occured')
    console.log(err)
  })
