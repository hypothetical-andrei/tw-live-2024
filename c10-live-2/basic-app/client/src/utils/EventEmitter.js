class EventEmitter {
  constructor() {
    this.events = new Map()
  }

  // Subscribes to an event
  addListener(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    const callbacks = this.events.get(event)
    callbacks.add(callback)

    // Return a disposable object to remove the listener
    return {
      remove: () => {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          this.events.delete(event)
        }
      }
    }
  }

  // Emits an event, triggering all callbacks
  emit(event, ...args) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      for (const callback of callbacks) {
        callback(...args)
      }
    }
  }

  // Removes all listeners for an event
  removeAllListeners(event) {
    this.events.delete(event)
  }
}
  
export default EventEmitter