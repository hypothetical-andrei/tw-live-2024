try {
  console.warn('before error')
  throw new Error('some error')
  /* eslint-disable no-unreachable */
  console.warn('after error')
} catch (err) {
  console.warn(err)
}
