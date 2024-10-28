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

function getValue () {
  return new Promise((resolve, reject) => {
    f((x) => {
      resolve(x)
    })
  })
}


const main = async () => {
  try {
    const x = await getValue()
    console.log(x)
  } catch (err) {
    console.log(err)
  }
}

main()