import Queue from '../../../data-structures/src/queue'

export default function(root, cb) {
  const q = new Queue()
  let node
  q.push(root)

  while (!q.isEmpty()) {
    node = q.pop()
    cb(node.value)
    if (node.left) {
      q.push(node.left)
    }
    if (node.right) {
      q.push(node.right)
    }
  }
}
