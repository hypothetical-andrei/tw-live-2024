function f0 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('result for f0')
    }, 1000)
  })
}

function f1 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('result for f1')
    }, 2000)
  })
}

function f2 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('result for f2')
    }, 3000)
  })
}

Promise.all([f0(), f1(), f2()])
  .then((results) => {
    console.log('all results')
    console.log(results)
  })

Promise.race([f0(), f1(), f2()])
  .then((result) => {
    console.log('single results')
    console.log(result)
  })
