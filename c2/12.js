'use strict'
function Person (name, age) {
  this.name = name
  this.age = age
  // this.printMe = function() {
  //     console.log(`${this.name} is ${this.age} old`)
  // }
}

Person.prototype.printMe = function() {
  console.log(`${this.name} is ${this.age} old`)
}

const p1 = new Person('jim', 22)
const p2 = new Person('jane', 25)


p1.printMe()

p2.printMe()

console.log(p1.__proto__)