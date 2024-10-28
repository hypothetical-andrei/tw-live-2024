const o = {
  name: 'jim',
  age: 22
}

o.printMe = function () {
  const that = this
  const f = function () {
    console.log(that.name + ' ' + that.age)
  }
  f()
}

o.printMe()

o.printMe1 = function () {
  const f = function () {
    console.log(this.name + ' ' + this.age)
  }.bind(this)
  f()
}

o.printMe1()

o.printMe2 = function () {
  const f = () => {
    console.log(this.name + ' ' + this.age)
  }
  f()
}

o.printMe2()
