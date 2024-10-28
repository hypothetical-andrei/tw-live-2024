const o = {}

Object.defineProperty(o, 'notWritable', {
  value: 37,
  writable: false,
  configurable: true
})

o.notWritable = 25

console.warn(o.notWritable)

Object.defineProperty(o, 'notWritable', {
  value: 37,
  writable: true,
  configurable: true
})

o.notWritable = 25

console.warn(o.notWritable)
