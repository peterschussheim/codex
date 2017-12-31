import Stack from '../../../data-structures/src/stack'
import dfs from '../../../algorithms/src/search/dfs'

export default function scc(graph) {
  const r = graph.reverse()
  const s = new Stack()
  let visited = {}
  let count = 0
  const id = Object.create(null)

  r.vertices.forEach(node => {
    if (!visited[node]) {
      dfs(r, node, {
        allowTraversal: (node, neighbor) => {
          return !visited[neighbor]
        },
        enterVertex: node => (visited[node] = true),
        leaveVertex: node => s.push(node)
      })
    }
  })

  // reset `visited` and perform a second pass
  visited = {}
  const allowTraversal = (node, neighbor) => !visited[neighbor]
  const enterVertex = node => {
    visited[node] = true
    id[node] = count
  }

  // unwind the stack
  while (!s.isEmpty()) {
    const node = s.pop()
    if (!visited[node]) {
      dfs(graph, node, {
        allowTraversal,
        enterVertex
      })
      ++count
    }
  }
  return {
    count,
    id
  }
}
