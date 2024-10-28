const o = {
  a: 1,
  b: 'somestring'
}

const f = function (c, d) {
  console.log(`a = ${this.a} and b = ${this.b} and c = ${c} and d = ${d}`)
}

// f(true)

f.apply(o, [true, 3])
f.call(o, true, 3)

const f1 = f.bind(o)

f1(true, 3)