const sampleString = 'some string'

/* eslint-disable no-extend-native */
String.prototype.initial = function () {
  return this[0]
}

console.log(sampleString.initial())
