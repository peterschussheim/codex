// http://raganwald.com/2016/12/27/recursive-data-structures.html
function mapWith(fn) {
  return function*(iterable) {
    for (const element of iterable) {
      yield fn(element)
    }
  }
}

function multi({ indivisible, value, divide, combine }) {
  return function myself(input) {
    if (indivisible(input)) {
      return value(input)
    } else {
      const parts = divide(input)
      const solutions = mapWith(myself)(parts)

      return combine(solutions)
    }
  }
}

/** Usage **/

const mergeSort = multi({
  indivisible: list => list.length <= 1,
  value: list => list,
  divide: list => [list.slice(0, list.length / 2), list.slice(list.length / 2)],
  combine: ([list1, list2]) => merge({ list1, list2 })
})
