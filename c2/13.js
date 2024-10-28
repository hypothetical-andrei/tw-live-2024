class Person {
  constructor (name, age) {
      this.name = name
      this.age = age
  }
  printMe() {
      console.log(`${this.name} is ${this.age} old`)
  }
}


const p1 = new Person('jim', 22)
p1.printMe()

const p2 = new Person('jane', 25)
p2.printMe()

console.log(p1.__proto__)


Person.prototype.doNewStuff = function () {
  console.log('do new stuff')
}

p1.doNewStuff()