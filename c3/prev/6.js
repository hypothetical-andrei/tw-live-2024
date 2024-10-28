const { EventEmitter } = require('events')

const emitter = new EventEmitter()

function f0() {
    let n
    setTimeout(() => {
        n = 100
        emitter.emit('task_complete', n)
    }, 1000)
}

f0()

emitter.on('task_complete', (result) => {
    console.log(result)
})
