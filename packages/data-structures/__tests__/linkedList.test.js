import LinkedList from '../src/linkedList'

describe('Linked List', () => {
  test('initialized as empty list', () => {
    const list = new LinkedList()
    expect(list.isEmpty()).toBe(true)
    expect(list.length).toBe(0)
  })

  test('correctly maintains length property when adding items', () => {
    const list = new LinkedList()
    list.add(1)
    expect(list.isEmpty()).toBe(false)
    expect(list.length).toBe(1)
    list.add(5)
    expect(list.length).toBe(2)
  })

  test('maintains item insertion order', () => {
    const list = new LinkedList()
    list.add(1)
    list.add(2)
    list.add(3)
    list.add(4)
    list.add(5)
    list.add(6)
    list.add(7)
    list.add(8)
    list.add(9)
    list.add(10)
    list.add(11)
    expect(list.get(0)).toEqual(1)
    expect(list.get(1)).toEqual(2)
    expect(list.get(2)).toEqual(3)
    expect(list.get(3)).toEqual(4)
    expect(list.get(4)).toEqual(5)
    expect(list.get(5)).toEqual(6)
    expect(list.get(6)).toEqual(7)
    expect(list.get(7)).toEqual(8)
    expect(list.get(8)).toEqual(9)
    expect(list.get(9)).toEqual(10)
    expect(list.get(10)).toEqual(11)
    expect(list.isEmpty()).toBe(false)
    expect(list.length).toBe(1)
    list.add(5)
    expect(list.length).toBe(2)
  })

  test('throws errors when trying to access out of bounds indices', () => {
    const list = new LinkedList()
    expect(list.get(0)).toThrowError('Index is out of bounds')
    expect(list.get(1)).toThrowError('Index is out of bounds')
    expect(list.get(10)).toThrowError('Index is out of bounds')
    expect(list.add(10, 1)).toThrowError('Index is out of bounds')
    expect(list.add(10, 10)).toThrowError('Index is out of bounds')

    list.add(1)
    list.add(2)
    expect(list.get(0)).not.toThrow()
    expect(list.get(1)).not.toThrow()
    expect(list.add(3, 2)).not.toThrow()
    expect(list.add(3, 0)).not.toThrow()
    expect(list.add(4, 1)).not.toThrow()
    expect(list.add(5, 5)).not.toThrow()

    expect(l.add(10, 10)).toThrowError('Index is out of bounds')
    expect(l.add(10, 7)).toThrowError('Index is out of bounds')
    expect(l.get(10)).toThrowError('Index is out of bounds')
  })

  xtest('is able to delete elements', () => {
    const list = new LinkedList()

    list.add(1)
    list.add(2)
    list.add(3)
    list.add(4)
    list.add(5)
    list.add(6)
    list.add(7)
    list.add(8)

    expect(list.head.value).toEqual(1)
    expect(list.tail.value).toEqual(8)
    expect(list.length).toEqual(8)

    expect(list.get(7)).toBe(8)
    list.del(7)
    expect(list.length).toEqual(7)
    expect(list.tail.value).toEqual(7)
    expect(list.get(7)).toThrowError('Item does not exist in list')

    list.del(0)
    expect(list.length).toBe(6)
    expect(list.head.value).toBe(2)
    expect(list.get(0)).toBe(2)
    expect(list.get(1)).toBe(3)

    list.del(4)
    expect(list.length).toBe(5)
    expect(list.get(0)).toBe(2)
    expect(list.get(1)).toBe(3)
    expect(list.get(2)).toBe(4)
    expect(list.get(3)).toBe(5)
    expect(list.get(4)).toBe(7)

    for (let i = 0; i < 5; i++) {
      list.del(0)
    }

    expect(list.isEmpty()).toBe(true)
    expect(list.head).toBe(null)
    expect(list.tail).toBe(null)
    expect(list.length).toBe(0)
  })

  test('calls a given fn on each item using a forEach method', () => {
    const list = new LinkedList()
    list.add(5)
    list.add(1)
    list.add(3)
    list.add(10)
    list.add(1000)

    const a = []
    list.forEach(e => {
      a.push(e)
    })

    expect(a).toEqual([5, 1, 3, 10, 1000])
  })

  test('throws an error when trying to delete from an empty list', () => {
    const list = new LinkedList()
    expect(list.del(0)).toThrowError('Cannot delete on an empty list')
  })
})
