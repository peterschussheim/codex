import HashSet from './hashSet'

// normalize vertex labels
const _ = v => String(v)

/**
 * Graph implemented with an adjacency list.
 * @param {bool} directed
 */
export default class Graph {
  constructor(directed = true) {
    this.directed = Boolean(directed)
    this.adjacencyList = Object.create(null)
    this.vertices = new HashSet()
  }

  addVertex(v) {
    v = _(v)
    if (this.vertices.contains(v)) {
      throw new Error(`Vertex '${v}' has already been added`)
    }

    this.vertices.add(v)
    this.adjacencyList[v] = Object.create(null)
  }

  addEdge(a, b, w = 1) {
    a = _(a)
    b = _(b)

    if (!this.adjacencyList[a]) this.addVertex(a)
    if (!this.adjacencyList[b]) this.addVertex(b)

    // if we already have an edge with the same vertices, sum with current
    this.adjacencyList[a][b] = (this.adjacencyList[a][b] || 0) + w

    // if graph is undirected, add the edge in both directions
    if (!this.directed) {
      this.adjacencyList[b][a] = (this.adjacencyList[b][a] || 0) + w
    }
  }

  neighbors(v) {
    return Object.keys(this.adjacencyList[_(v)])
  }

  edge(a, b) {
    return this.adjacencyList[_(a)][_(b)]
  }

  reverse() {
    const self = this
    const r = new Graph(this.directed)

    self.vertices.forEach(v => {
      r.addVertex(v)
    })

    self.vertices.forEach(a => {
      self.neighbors(a).forEach(b => {
        r.addEdge(b, a, self.edge(a, b))
      })
    })
    return r
  }
}
