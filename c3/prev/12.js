class A {
  #prop1
  static #count = 0

  constructor (a) {
      this.#prop1 = a
      A.#count++
  }

  get prop1 () {
      return this.#prop1
  }

  set prop1 (v) {
      this.#prop1 = v
  }

  static get count() {
      return A.#count
  }
}

const o1 = new A(1)
console.log(o1.prop1)
o1.prop1 = 2
console.log(o1.prop1)

const o2 = new A(2)
console.log('total A created ' + A.count)