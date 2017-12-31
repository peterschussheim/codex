import Graph from '../../data-structures/src/graph'
import dfs from '../src/graph/dfs'

describe('Depth-first search on a graph', () => {
  let graph
  beforeAll(() => {
    graph = new Graph(true)
    graph.addEdge('one', 'three')
    graph.addEdge('one', 'four')
    graph.addEdge('four', 'two')
    graph.addEdge('two', 'one')
    graph.addEdge('three', 'one')
    graph.addEdge('five', 'six')
  })
  test('visits only the nodes reachable from the starting node', () => {
    const enter = []
    const leave = []
    let edgesWithTails = 0
    let edgesWithHeads = 0

    dfs(graph, 'one')

    const dfsCommands = {
      enterVertex: [].push.bind(enter),
      leaveVertex: [].push.bind(leave),
      beforeTraversal: () => {
        edgesWithHeads += 1
      },
      afterTraversal: () => {
        edgesWithTails += 1
      }
    }

    dfs(graph, 'one', dfsCommands)
    expect(enter).toEqual(['one', 'three', 'four', 'two'])
    expect(leave).toEqual(['three', 'two', 'four', 'one'])

    expect(edgesWithTails).toEqual(edgesWithHeads)
    expect(edgesWithHeads).toEqual(3)

    enter.splice(0, 4)
    leave.splice(0, 4)
    dfs(graph, 'five', dfsCommands)
    expect(enter).toEqual(['five', 'six'])
    expect(leave).toEqual(['six', 'five'])
    expect(edgesWithTails).toEqual(edgesWithHeads)
    expect(edgesWithHeads).toEqual(4)
  })

  test('allows custom commands', () => {
    const seen = new Graph(graph.directed)
    graph.vertices.forEach(v => seen.addVertex(v))
    const path = ['one']

    dfs(graph, path[0], {
      allowTraversal: (vertex, neighbor) => {
        return !seen.edge(vertex, neighbor)
      },
      beforeTraversal: (vertex, neighbor) => {
        seen.addEdge(vertex, neighbor)
        path.push(neighbor)
      }
    })

    expect(path).toEqual(['one', 'three', 'one', 'four', 'two', 'one'])
  })
})
