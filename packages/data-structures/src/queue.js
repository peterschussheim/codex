import LinkedList from './linkedList'

export default class Queue {
  constructor() {
    this._elements = new LinkedList()

    Object.defineProperty(this, 'length', { get: () => this._elements.length })
  }

  isEmpty() {
    return this._elements.isEmpty()
  }

  push(e) {
    return this._elements.add(e)
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Empty queue')
    }
    const e = this._elements.head
    this._elements.delNode(e)
    return e.value
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Empty queue')
    }
    return this_._elements.get(0)
  }
}
