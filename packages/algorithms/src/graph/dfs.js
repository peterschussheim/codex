/**
 * @typedef {Object} Commands
 * @param {fn(vertex: *, neighbor: *): boolean} allowTraversal -
 *   Determines whether DFS should traverse from the vertex to its neighbor
 *   (along the edge). By default prohibits visiting the same vertex again.
 * @param {fn(vertex: *, neighbor: *)} beforeTraversal - Called before
 *   recursive DFS call.
 * @param {fn(vertex: *, neighbor: *)} afterTraversal - Called after
 *   recursive DFS call.
 * @param {fn(vertex: *)} enterVertex - Called when DFS enters the vertex.
 * @param {fn(vertex: *)} leaveVertex - Called when DFS leaves the vertex.
 */

/**
 * Fill in missing commands.
 * @param {Commands} commands
 * @param {Array} seenVertices - Vertices already discovered,
 *   used by default allowTraversal implementation.
 * @return {Commands} The same object or new one (if null passed).
 */
const normalizeCommands = (commands = {}, seenVertices) => {
  commands.allowTraversal =
    commands.allowTraversal ||
    (() => {
      const seen = {}
      const markSeen = vertex => {
        seen[vertex] = true
      }

      seenVertices.forEach(markSeen)

      return (vertex, neighbor) => {
        if (!seen[neighbor]) {
          seen[neighbor] = true
          return true
        }
        return false
      }
    })()

  const noop = () => {}
  commands.beforeTraversal = commands.beforeTraversal || noop
  commands.afterTraversal = commands.afterTraversal || noop
  commands.enterVertex = commands.enterVertex || noop
  commands.leaveVertex = commands.leaveVertex || noop

  return commands
}

const dfsLoop = function dfsLoop(graph, vertex, commands) {
  commands.enterVertex(vertex)

  graph.neighbors(vertex).forEach(neighbor => {
    //
    if (commands.allowTraversal(vertex, neighbor)) {
      commands.beforeTraversal(vertex, neighbor)
      dfsLoop(graph, neighbor, commands)
      commands.afterTraversal(vertex, neighbor)
    }
  })

  commands.leaveVertex(vertex)
}

/**
 * Run Depth-First Search from a start vertex.
 * Complexity (default implementation): O(V + E).
 *
 * @param {Graph} graph
 * @param {*} startVertex
 * @param {Commands} [commands]
 */
const depthFirstSearch = (graph, startVertex, commands) => {
  dfsLoop(graph, startVertex, normalizeCommands(commands, [startVertex]))
}

export default depthFirstSearch
