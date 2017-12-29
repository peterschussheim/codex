import HashTable from '../src/hashTable'

describe('Hash Table', () => {
  test('calc hash using Java String.hashCode algorithm', () => {
    const h = new HashTable()
    expect(h.hash('The quick brown fox jumps over the lazy dog')).toEqual(
      -609428141
    )
  })

  test('new table initialized using default capacity', () => {
    const h = new HashTable()
    expect(h.capacity).toEqual(64)
  })

  test('new table initialized using given capacity', () => {
    const h = new HashTable(3)
    expect(h.capacity).toEqual(3)
  })

  test('put new elements in table and get them later', () => {
    const h = new HashTable(16)
    const data = { name: 'Ted', age: 11 }
    h.put('uncle', data)
    expect(h.size).toEqual(1)

    expect(h.get('uncle')).toEqual(data)
  })

  test('replaces existing items when a key is re-used', () => {
    const h = new HashTable(16)
    const data = { name: 'Ted', age: 11 }
    h.put('uncle', data)
    expect(h.get('uncle')).toEqual(data)

    const data2 = { name: 'Ted', age: 11 }
    h.put('uncle', data2)
    expect(h.get('uncle')).toEqual(data2)
  })

  test('deletes items', () => {
    const h = new HashTable(16)
    const data = { name: 'Ted', age: 11 }
    h.put('uncle', data)
    expect(h.get('uncle')).toEqual(data)

    h.del('uncle')
    expect(h.get('uncle')).toEqual(undefined)
  })

  test('handles collisions', () => {
    const h = new HashTable(4)

    // Both keys should be pushed to the same position
    h.put('a', 'apple')
    h.put('e', 'envelope')
    expect(h._position('a')).toEqual(h._position('e'))

    // the list in that position should keep both items
    expect(h._table[h._position('a')].length).toEqual(2)

    expect(h.get('a')).toEqual('apple')
    expect(h.get('e')).toEqual('envelope')
  })

  xtest('increases capacity as needed', () => {})
  xtest('runs a given fn on each item', () => {})
})
