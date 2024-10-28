class OddError extends Error {
    constructor (message, payload) {
        super(message)
        this.payload = payload
    }
}

function onlyWorksForEvens (n) {
    if (n % 2 === 0) {
        return n / 2
    }
    throw new OddError('not even even', { details: 'cannot process odd values', forValue: n })
}

try {
    onlyWorksForEvens(2)
    onlyWorksForEvens(3)
} catch (error) {
    console.warn(error)
} finally {
    console.log('i finally run')
}