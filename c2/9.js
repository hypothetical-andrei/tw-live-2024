function g(base) {
  return function(x) {
      // [outerscope]
      base += x
      console.log(base)
  }
}

let tenBasedAdder = g(10)
let hundredBasedAdder = g(100)

tenBasedAdder(1)
tenBasedAdder(1)
tenBasedAdder(1)
hundredBasedAdder(1)
tenBasedAdder(1)