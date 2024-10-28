let o = {
  name: 'andrei',
  age: 39,
  printMe: function () {
      console.log(`${this.name} is ${this.age} old`)
  }
}

o.printMe()