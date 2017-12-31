import Graph from '../../data-structures/src/graph'
import scc from '../src/search/scc'

describe('Strongly connected components', () => {
  test('computes strongly connected components', () => {
    // graph: 0 -> 1 -> 2
    let graph = new Graph()
    graph.addEdge(0, 1)
    graph.addEdge(1, 2)

    let sccInstance = scc(graph)
    expect(sccInstance.count).toBe(3)
    expect(sccInstance.id[0] > sccInstance.id[1]).toBe(true)
    expect(sccInstance.id[1] > sccInstance.id[2]).toBe(true)

    // graph: 0 <-> 1 -> 2
    graph = new Graph()
    graph.addEdge(0, 1)
    graph.addEdge(1, 0)
    graph.addEdge(1, 2)

    sccInstance = scc(graph)
    expect(sccInstance.count).toEqual(2)
    expect(sccInstance.id[0]).toEqual(sccInstance.id[1])
    expect(sccInstance.id[1] > sccInstance.id[2]).toBe(true)

    // graph: http://algs4.cs.princeton.edu/42digraph/images/transitive-closure.png
    graph = new Graph()
    graph.addEdge(0, 1)
    graph.addEdge(0, 5)
    graph.addEdge(2, 0)
    graph.addEdge(2, 3)
    graph.addEdge(3, 2)
    graph.addEdge(3, 5)
    graph.addEdge(4, 2)
    graph.addEdge(4, 3)
    graph.addEdge(5, 4)
    graph.addEdge(6, 0)
    graph.addEdge(6, 4)
    graph.addEdge(6, 9)
    graph.addEdge(7, 6)
    graph.addEdge(7, 8)
    graph.addEdge(8, 7)
    graph.addEdge(8, 9)
    graph.addEdge(9, 10)
    graph.addEdge(9, 11)
    graph.addEdge(10, 12)
    graph.addEdge(11, 4)
    graph.addEdge(11, 12)
    graph.addEdge(12, 9)

    sccInstance = scc(graph)
    expect(sccInstance.count).toEqual(5)

    // scc no.0
    expect(sccInstance.id[0] > sccInstance.id[1]).toBe(true)

    // scc no.1
    expect(sccInstance.id[0]).toEqual(sccInstance.id[2])
    expect(sccInstance.id[0]).toEqual(sccInstance.id[3])
    expect(sccInstance.id[0]).toEqual(sccInstance.id[4])
    expect(sccInstance.id[0]).toEqual(sccInstance.id[5])

    // scc no.2
    expect(sccInstance.id[9] > sccInstance.id[0]).toBe(true)
    expect(sccInstance.id[9]).toEqual(sccInstance.id[10])
    expect(sccInstance.id[9]).toEqual(sccInstance.id[11])
    expect(sccInstance.id[9]).toEqual(sccInstance.id[12])

    // scc no.3
    expect(sccInstance.id[6] > sccInstance.id[9]).toBe(true)

    // scc no.4
    expect(sccInstance.id[7] > sccInstance.id[6]).toBe(true)
    expect(sccInstance.id[7]).toEqual(sccInstance.id[8])
  })

  xtest('prints top 5 strongly connected components', () => {})
})
