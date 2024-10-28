let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(a.indexOf(3))
console.log(a.indexOf(10))
let a1 = a.slice(1, 4)
// console.log(a1)
let a2 = a.slice(0, a.length)
// console.log(a2)
const a3 = a.splice(1, 3, 'a', 'b')
// console.log(a3
a.splice(2, 0, 'c')
console.log(a)
