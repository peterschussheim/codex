export default function binrec({ indivisible, value, divide, combine }) {
  return function myself(input) {
    if (indivisible(input)) {
      return value(input)
    } else {
      let { left, right } = divide(input)

      left = myself(left)
      right = myself(right)

      return combine({ left, right })
    }
  }
}

/** Usage **/
const mergeSort = binrec({
  indivisible: list => list.length <= 1,
  value: list => list,
  divide: list => ({
    left: list.slice(0, list.length / 2),
    right: list.slice(list.length / 2)
  }),
  // implement `merge` fn
  combine: ({ left: list1, right: list2 }) => merge({ list1, list2 })
})

mergeSort([1, 42, 4, 5])
//=> [1, 4, 5, 42]
