class EventEmitter {
  constructor () {
    this.events = new Map()
  }

  addListener (event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    const callbacks = this.events.get(event)
    callbacks.add(callback)
    return {
      remove: () => {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          this.events.delete(event)
        }
      }
    }
  }

  emit (event, ...args) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      for (const callback of callbacks) {
        callback(...args)
      }
    }
  }
}

export default EventEmitter