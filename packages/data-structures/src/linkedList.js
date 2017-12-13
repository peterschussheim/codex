export default class LinkedList {
  constructor() {
    this._length = 0
    this.head = null
    this.tail = null
  }

  get length() {
    return this._length
  }

  isEmpty() {
    return this._length === 0
  }

  add(n, index) {}

  getNode(index) {
    if (index >= this.length || index < 0) {
      throw new Error('Index is out of bounds')
    }
    let node = this.head
    for (let i = 1; i <= index; i++) {
      node = node.next
    }

    return node
  }

  del(index) {
    if (index >= this.length || index < 0) {
      throw new Error('Index is out of bounds')
    }
    this.delNode(this.getNode(index))
  }

  delNode(node) {
    if (node === this.tail) {
      this.tail = node.prev
    } else {
      node.next.prev = node.prev
    }
    if (node === this.head) {
      this.head = node.next
    } else {
      node.prev.next = node.next
    }
    this._length--
  }

  forEach(fn) {
    let node = this.head
    while (node) {
      fn(node.value)
      node = node.next
    }
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.prev = null
    this.next = null
  }
}
