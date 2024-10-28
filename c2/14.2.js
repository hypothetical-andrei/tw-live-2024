class SomeType {
  a
  b = 1
  #c
  constructor(a, b) {
    this.a = a
    this.b = b ? b : this.b
    this.#c = 3
  }
  print() {
    console.log(`a = ${this.a} b = ${this.b} c = ${this.#c}`)
  }
  get c() {
    return this.#c
  }
  set c(value) {
    if (value > 1) {
      this.#c = value
    }
  }
}

const o1 = new SomeType(3)
o1.print()

console.log('c is not being set to -1')
o1.c = -1
o1.print()

o1.c = 3
o1.print()
