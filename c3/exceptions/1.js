function onlyWorksForEvens (n) {
    if (n % 2 === 0) {
        return n / 2
    }
    throw new Error('not even even')
}

try {
    console.log(onlyWorksForEvens(2))
    console.log(onlyWorksForEvens(3))
} catch (error) {
    console.warn(error)
}