import BST from '../src/bst'
import bfs from '../../algorithms/src/search/bfs'

describe('Binary Search Tree', () => {
  test('inserts elements respecting the BST restrictions', () => {
    const bst = new BST()
    bst.insert(4)
    bst.insert(8)
    bst.insert(10)
    bst.insert(2)
    bst.insert(1)
    bst.insert(3)
    bst.insert(0)
    bst.insert(5)
    bst.insert('100')
    expect(bst.size).toEqual(9)
  })
  test('checks if an element exists (in O(lg n))', () => {
    const bst = new BST()
    bst.insert(4)
    bst.insert(8)
    bst.insert(10)
    bst.insert(2)
    bst.insert(1)
    bst.insert(3)
    bst.insert(0)
    bst.insert(5)
    bst.insert(100)
    expect(bst.contains(4))
    expect(bst.contains(0))
    expect(bst.contains(8))
    expect(bst.contains(10))
    expect(bst.contains(5))
    expect(bst.contains(100))

    expect(!bst.contains(12))
    expect(!bst.contains(-10))
    expect(!bst.contains(10000))
    expect(!bst.contains(30))
    expect(!bst.contains(7))
  })

  const bst = new BST()
  bst.insert(4)
  bst.insert(8)
  bst.insert(10)
  bst.insert(2)
  bst.insert(1)
  bst.insert(3)
  bst.insert(0)
  bst.insert(5)
  bst.insert(100)
  bst.insert(2.5)

  const callbackGenerator = a => n => a.push(n)

  test(`removes a leaf without altering anything else in the structure of the tree`, () => {
    bst.remove(0)
    const a = []
    bfs(bst.root, callbackGenerator(a))
    expect(a).toEqual([4, 2, 8, 1, 3, 5, 10, 2.5, 100])
  })

  test(
    'removes an element with just one child and substitute ' +
      'it as the root of only subtree',
    () => {
      bst.remove(10)
      const a = []
      bfs(bst.root, callbackGenerator(a))
      expect(a).toEqual([4, 2, 8, 1, 3, 5, 100, 2.5])
    }
  )

  test(
    'substitute an element by the leftmost child in the right ' +
      'subtree and remove it as a leaf',
    () => {
      bst.remove(2)
      let a = []
      bfs(bst.root, callbackGenerator(a))
      expect(a).toEqual([4, 2.5, 8, 1, 3, 5, 100])

      bst.remove(4)
      a = []
      bfs(bst.root, callbackGenerator(a))
      expect(a).toEqual([5, 2.5, 8, 1, 3, 100])

      bst.remove(2.5)
      a = []
      bfs(bst.root, callbackGenerator(a))
      expect(a).toEqual([5, 3, 8, 1, 100])
    }
  )

  test('returns the right root and size', () => {
    const bst = new BST()
    bst.insert(5)
    expect(bst.size).toEqual(1)
    bst.remove(5)
    expect(bst.size).toEqual(0)
    expect(bst.root).toEqual(null)
    bst.insert(10)
    bst.insert(3)
    bst.insert(20)
    expect(bst.size).toEqual(3)
    bst.remove(10)
    expect(bst.size).toEqual(2)
    bst.remove(20)
    expect(bst.size).toEqual(1)
    bst.remove(3)
    expect(bst.size).toEqual(0)
  })

  test('throws an error when trying to remove an unexisting node', () => {
    const bst = new BST()

    expect(() => {
      bst.remove(0)
    }).toThrowError('Item not found in the tree')

    bst.insert(3)

    expect(() => {
      bst.remove(0)
    }).toThrowError('Item not found in the tree')
  })
})

describe('Binary Search Tree with custom comparator', () => {
  const strLenCompare = (a, b) => {
    if (a.length === b.length) return 0
    return a.length < b.length ? -1 : 1
  }

  test('inserts elements respecting the BST restrictions', () => {
    const bst = new BST(strLenCompare)
    bst.insert('banana')
    bst.insert('apple')
    bst.insert('pineapple')
    bst.insert('watermelon')
    expect(bst.size).toEqual(4)
  })

  test('checks if an element exists (in O(lg n))', () => {
    const bst = new BST(strLenCompare)
    bst.insert('banana')
    bst.insert('apple')
    bst.insert('pineapple')
    bst.insert('watermelon')

    expect(bst.contains('watermelon'))
    expect(bst.contains('apple'))
    expect(bst.contains('banana'))
    expect(bst.contains('pineapple'))

    expect(!bst.contains('mango'))
    expect(!bst.contains('melon'))
    expect(!bst.contains('tangerine'))
  })

  const bst = new BST(strLenCompare)
  bst.insert('banana')
  bst.insert('apple')
  bst.insert('pear')
  bst.insert('pineapple')
  bst.insert('watermelon')

  const callbackGenerator = a => n => a.push(n)

  test('inserts the items according to the comparator', () => {
    const a = []
    bfs(bst.root, callbackGenerator(a))
    expect(a).toEqual(['banana', 'apple', 'pineapple', 'pear', 'watermelon'])
  })

  test(
    'removes a leaf without altering anything else in ' +
      'the structure of the tree',
    () => {
      bst.remove('watermelon')

      const a = []
      bfs(bst.root, callbackGenerator(a))
      expect(a).toEqual(['banana', 'apple', 'pineapple', 'pear'])
    }
  )

  test(
    'removes an element with just one child and substitute ' +
      'it as the root of only subtree',
    () => {
      bst.remove('apple')

      const a = []
      bfs(bst.root, callbackGenerator(a))
      expect(a).toEqual(['banana', 'pear', 'pineapple'])
    }
  )

  test(
    'substitutes an element by the leftmost child in the right ' +
      'subtree and remove it as a leaf',
    () => {
      bst.remove('banana')

      const a = []
      bfs(bst.root, callbackGenerator(a))
      expect(a).toEqual(['pineapple', 'pear'])
    }
  )
})
