import HashTable from './hashTable'

export default class HashSet {
  constructor(...args) {
    this._elements = new HashTable(args.length)
    this.add(...args)
  }

  get size() {
    return this._elements.size
  }

  add(...args) {
    for (let i = 0; i < args.length; i++) {
      this._elements.put(args[i], true)
    }
    return this
  }

  remove(...args) {
    for (let i = 0; i < args.length; i++) {
      this._elements.del(args[i])
    }
    return this
  }

  contains(e) {
    return typeof this._elements.get(e) !== 'undefined'
  }

  forEach(fn) {
    this._elements.forEach(fn)
  }
}
