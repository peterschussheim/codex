import Graph from '../src/graph'

describe('Graph using an adjacency list', () => {
  test('accepts a boolean to indicated directed or not (directed by default)', () => {
    const g = new Graph()
    expect(g.directed).toEqual(true)

    const gUndirected = new Graph(false)
    expect(gUndirected.directed).toEqual(false)

    const gDirected = new Graph(true)
    expect(gDirected.directed).toEqual(true)
  })

  test('default edge weight is 1', () => {
    const g = new Graph()
    g.addVertex('a')
    g.addVertex('b')
    g.addEdge('a', 'b')
    expect(g.edge('a', 'b')).toEqual(1)
  })

  test("creates new vertex on insert if edge doesn't exist", () => {
    const g = new Graph()
    g.addEdge('a', 'b')
    expect(g.edge('a', 'b')).toEqual(1)
  })

  test('sums multiple edges between the same vertices', () => {
    const g = new Graph()
    g.addEdge('a', 'b', 10)
    expect(g.edge('a', 'b')).toBe(10)

    g.addEdge('a', 'b', 4)
    expect(g.edge('a', 'b')).toBe(14)
  })

  test('has edges in both directions if undirected', () => {
    const g = new Graph(false)
    g.addVertex('a')
    g.addVertex('b')
    g.addVertex('c')
    g.addVertex('d')
    g.addEdge('a', 'b', 10)
    g.addEdge('a', 'c', 5)
    g.addEdge('c', 'd', 2)

    expect(g.edge('a', 'b')).toBe(10)
    expect(g.edge('b', 'a')).toBe(10)
    expect(g.edge('a', 'c')).toBe(5)
    expect(g.edge('c', 'a')).toBe(5)
    expect(g.edge('c', 'd')).toBe(2)
    expect(g.edge('d', 'c')).toBe(2)

    expect(g.edge('a', 'd')).toBeUndefined()

    g.addEdge('b', 'a', 2)
    expect(g.edge('a', 'b')).toEqual(12)
    expect(g.edge('b', 'a')).toEqual(12)
  })

  test('respects direction of the edges in directed graphs', () => {
    const g = new Graph()
    g.addVertex('a')
    g.addVertex('b')
    g.addVertex('c')
    g.addVertex('d')
    g.addEdge('a', 'b', 10)
    g.addEdge('a', 'c', 5)
    g.addEdge('c', 'd', 2)

    expect(g.edge('a', 'b')).toBe(10)
    expect(g.edge('b', 'a')).toBeUndefined()
    expect(g.edge('a', 'c')).toBe(5)
    expect(g.edge('c', 'a')).toBeUndefined()
    expect(g.edge('c', 'd')).toBe(2)
    expect(g.edge('d', 'c')).toBeUndefined()

    expect(g.edge('a', 'd')).toBeUndefined()

    g.addEdge('b', 'a', 2)
    expect(g.edge('a', 'b')).toEqual(10)
    expect(g.edge('b', 'a')).toEqual(2)
  })

  test('has reversed edges with same weight for a reverse directed graph', () => {
    const g = new Graph()
    g.addVertex('a')
    g.addVertex('b')
    g.addVertex('c')
    g.addVertex('d')
    g.addEdge('a', 'b', 10)
    g.addEdge('a', 'c', 5)
    g.addEdge('c', 'd', 2)

    const r = g.reverse()
    expect(r.directed).toBe(true)
    expect(r.edge('a', 'b')).toBeUndefined()
    expect(r.edge('b', 'a')).toEqual(10)
    expect(r.edge('a', 'c')).toBeUndefined()
    expect(r.edge('c', 'a')).toEqual(5)
    expect(r.edge('c', 'd')).toBeUndefined()
    expect(r.edge('d', 'c')).toEqual(2)
    expect(r.edge('a', 'd')).toBeUndefined()

    r.addEdge('a', 'b', 2)
    expect(r.edge('a', 'b')).toEqual(2)
    expect(r.edge('b', 'a')).toEqual(10)
  })

  test('maintains a list of vertices', () => {
    const g = new Graph()
    expect(g.vertices.size).toEqual(0)
    g.addVertex('a')
    g.addVertex('b')
    g.addVertex('c')
    expect(g.vertices.size).toEqual(3)
    expect(g.vertices.contains('a')).toBe(true)
    expect(g.vertices.contains('b')).toBe(true)
    expect(g.vertices.contains('c')).toBe(true)
  })

  test('does not allow repeated vertices', () => {
    const g = new Graph()
    g.addVertex('z')

    expect(() => {
      g.addVertex('z')
    }).toThrow()
  })

  test('returns list of neighbors of a given vertex', () => {
    const g = new Graph()
    g.addVertex('a')
    g.addVertex('b')
    g.addVertex('c')
    g.addVertex('d')
    g.addEdge('a', 'b', 10)
    g.addEdge('a', 'c', 5)
    g.addEdge('c', 'd', 2)

    expect(g.neighbors('a')).toEqual(['b', 'c'])
    expect(g.neighbors('b')).toEqual([])
    expect(g.neighbors('c')).toEqual(['d'])
  })

  test('return weight at given edge', () => {
    const g = new Graph()
    g.addVertex('a')
    g.addVertex('b')
    g.addVertex('c')
    g.addVertex('d')

    g.addEdge('a', 'b', 10)
    g.addEdge('a', 'c', 5)
    g.addEdge('c', 'd', 2)

    expect(g.edge('a', 'b')).toEqual(10)
    expect(g.edge('a', 'c')).toEqual(5)
    expect(g.edge('c', 'd')).toEqual(2)
  })
})
