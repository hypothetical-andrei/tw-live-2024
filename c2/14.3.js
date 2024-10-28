class SomeType {
  constructor(a) {
    this.a = a
  }
}

SomeType.prototype.f = function () {
  console.log('called f')
}

const o1 = new SomeType()
o1.f()

o1.b = 3
console.log(o1.b)

Object.seal(o1)

o1.b = 4
console.log(o1.b)
o1.c = 4
console.log(o1.c)

Object.freeze(o1)
o1.b = 5
console.log(o1.b)