function ParentType (a) {
  this.a = a
  this.doParent = function () {
    console.log('doing parent stuff with a ' + this.a)
  }
}

function ChildType (b) {
  this.b = b
  this.doChild = function () {
    console.log('doing child stuff with b ' + this.b)
  }
}

ChildType.prototype = new ParentType(3)

const o1 = new ChildType(0)
o1.doChild(1)
o1.doParent(2)
