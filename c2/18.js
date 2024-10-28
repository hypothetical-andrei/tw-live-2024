// const, frozen and sealed

// const refers to object references, the structure can still be changed
const obj = {}

obj.val = 1
obj.secondVal = 2

console.warn(obj.val)

Object.getPrototypeOf(obj).func = function () {
  return `value is ${this.val}`
}

console.warn(obj.func())

// sealed makes the object structure immutable, values can still be changed
Object.seal(obj)
obj.thirdVal = 3

console.warn(obj.thirdVal)

obj.val = 10
console.warn(obj.val)

// frozen makes the object structure and values immutable
Object.freeze(obj)

obj.val = 100
console.warn(obj.val)



