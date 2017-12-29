import LinkedList from './linkedList'

/**
 * Implemented using Java's hashCode function.
 * https://stackoverflow.com/questions/299304/why-does-javas-hashcode-in-string-use-31-as-a-multiplier
 *
 */
export default class HashTable {
  constructor(initCapacity) {
    this._table = new Array(initCapacity || 64)
    this._items = 0
  }

  get capacity() {
    return this._table.length
  }

  get size() {
    return this._items
  }

  hash(s) {
    if (typeof s !== 'string') {
      s = JSON.stringify(s)
    }

    let hash = 0
    for (let i = 0; i < s.length; i++) {
      hash = (hash << 5) - hash + s.charCodeAt(i)
      hash &= hash
    }
    return hash
  }

  get(key) {
    const i = this._position(key)
    let node

    if ((node = this._findInList(this._table[i], key))) {
      return node.value.v
    }
    return undefined
  }

  put(key, value) {
    const i = this._position(key)

    if (!this._table[i]) {
      this._table[i] = new LinkedList()
    }

    const item = { k: key, v: value }

    const node = this._findInList(this._table[i], key)
    if (node) {
      node.value = item
    } else {
      this._table[i].add(item)
      this._items++

      if (this._items === this.capacity) {
        this._increaseCapacity()
      }
    }
  }

  del(key) {
    const i = this._position(key)
    let node

    if ((node = this._findInList(this._table[i], key))) {
      this._table[i].delNode(node)
      this._items--
    }
  }

  _position(key) {
    return Math.abs(this.hash(key)) % this.capacity
  }

  _findInList(list, key) {
    let node = list && list.head
    while (node) {
      if (node.value.k === key) return node
      node = node.next
    }
  }

  _increaseCapacity() {
    const oldTable = this._table
    this._table = new Array(2 * this.capacity)
    this._items = 0

    for (let i = 0; i < oldTable.length; i++) {
      let node = oldTable[i] && oldTable[i].head
      while (node) {
        this.put(node.value.k, node.value.v)
        node = node.next
      }
    }
  }

  forEach(fn) {
    const applyFunction = linkedList => {
      linkedList.forEach(elem => {
        fn(elem.k, elem.v)
      })
    }

    for (let i = 0; i < this._table.length; i++) {
      if (this._table[i]) {
        applyFunction(this._table[i])
      }
    }
  }
}
