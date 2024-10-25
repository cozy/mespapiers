interface FilterWithRemainingResponse<T> {
  itemsFound: T[]
  remainingItems: T[]
}

/**
 * Filter the elements of an array and return the found and remaining elements separately
 *
 * @param {Array} array - The array with the items that must be tested.
 * @param {Function} callback - Function to execute on each value in the array.
 * The function is called with the following arguments:
 * - item: The current element in the array.
 * - index: The index (position) of the current element in the array.
 * @returns {FilterWithRemainingResponse} The items found and remaining.
 */
export function filterWithRemaining<T>(
  array: T[] | null,
  callback: (item: T, index: number) => boolean
): FilterWithRemainingResponse<T> {
  const itemsFound: T[] = []
  const remainingItems: T[] = []

  if (!array) {
    return { itemsFound, remainingItems }
  }

  array.forEach((arr, index) => {
    if (callback(arr, index)) {
      itemsFound.push(arr)
    } else {
      remainingItems.push(arr)
    }
  })

  return { itemsFound, remainingItems }
}
