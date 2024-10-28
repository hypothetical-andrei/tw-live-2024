function g(){
  let i = 5
  let f = function() {
      console.log('inside f the value of i is ' + i)
  }
  return f
}

let f = g()

f()