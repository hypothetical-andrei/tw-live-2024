class SealTest {
  constructor (a) {
    this.a = a
  }
  change (val) {
    let g = function (val) {
      let temp = val
      return function (v) {
        temp = v
        console.log(`temp is now ${temp}`)
      }
    }
    let f = g(val)
    f(3)
  }
}

let s = new SealTest(3)
// console.log(s.a)

Object.freeze(s)

s.change(5)
// console.log(s.a)
