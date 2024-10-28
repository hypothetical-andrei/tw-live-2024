function f1(x) {
  return x * 2
}
console.log(f1(1))

let f2 = function (x) {
  return x * 2
}
console.log(f2(2))

let f22 = f2
f2 = 2

let f3 = (x) => {
  return x * 2
}
console.log(f3(3))
let f4 = x => x * 2
console.log(f4(4))