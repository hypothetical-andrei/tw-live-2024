function ParentType (a) {
  this.a = a
}

ParentType.prototype.doParent = function () {
  console.log('doing parent stuff with a ' + this.a)
}

function ChildType (a, b) {
  ParentType.call(this, a)
  this.b = b
}

Object.setPrototypeOf(ChildType.prototype, ParentType.prototype);

ChildType.prototype.doChild = function () {
  console.log('doing child stuff with b ' + this.b)
}

const o1 = new ChildType(0, 1)
o1.doChild()
// console.log(o1.__proto__)
o1.doParent()

const o2 = new ChildType(2, 3)

function f(){
  console.log(`bound temporarily ${this.a} and ${this.b}`)
}

// f()
f.call(o2)

const f1 = function () {
  console.log(`bound permanently ${this.a} and ${this.b}`)
}

const f2 = f1.bind(o1)

f2()

