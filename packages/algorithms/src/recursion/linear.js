export default function({ indivisible, value, divide, combine }) {
  return function myself(input) {
    if (indivisible(input)) {
      return value(input)
    } else {
      const { atom, remainder } = divide(input)
      const left = atom
      const right = myself(remainder)

      return combine({ left, right })
    }
  }
}

/** Usage **/

const sum = linrec({
  indivisible: list => list.length === 0,
  value: () => 0,
  divide: list => {
    const [atom, ...remainder] = list

    return { atom, remainder }
  },
  combine: ({ left, right }) => left + right
})

const merge = linrec({
  indivisible: ({ list1, list2 }) => list1.length === 0 || list2.length === 0,
  value: ({ list1, list2 }) => list1.concat(list2),
  divide: ({ list1, list2 }) => {
    if (list1[0] < list2[0]) {
      return {
        atom: list1[0],
        remainder: {
          list1: list1.slice(1),
          list2
        }
      }
    } else {
      return {
        atom: list2[0],
        remainder: {
          list1,
          list2: list2.slice(1)
        }
      }
    }
  },
  combine: ({ left, right }) => [left, ...right]
})
