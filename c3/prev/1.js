class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  printMe (x) {
    console.log(`${this.name} is ${this.age} old and x = ${x}`)
  }
}

const p0 = new Person('jim', 22)

p0.printMe(3)

// p0.someprop = 'some content'

const f0 = p0.printMe

console.log(f0)

// f0()

f0.call(p0, 4)

f0.apply(p0, [4])

// // // console.log(p0)
console.log(Object.keys(p0))