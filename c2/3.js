let s = 'a,b,c,d'
let a = s.split(',')
console.log(a)
console.log(a.join('*'))
let s1 = 'a,b.c!d'
let a1 = s1.split(/[,.!]/)
console.log(a1)