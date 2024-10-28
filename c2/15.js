class SomeParentType {
  constructor (b) {
    this.b = b
  }
  doParent (x) {
    console.log(`doing parent stuff with x = ${x} and b = ${this.b}`)
  }
}

const p0 = new SomeParentType(1)
p0.doParent(1)

class SomeChildType extends SomeParentType {
  constructor (a, b) {
    super(b)
    this.a = a
  }
  doChild (x) {
    console.log(`doing parent stuff with x = ${x} and b = ${this.b} and  a = ${this.a}`)
  }
}

const c0 = new SomeChildType(1, 2)
c0.doChild(3)

SomeChildType.prototype.doNewStuff = function () {
  console.log('doing new stuff')
}

SomeChildType.prototype.doChild = function (x) {
  console.log('modified do child')
}

c0.doNewStuff()
c0.doChild(3)
