/**
 * 数组分割
 * @param {Array} array 数组
 * @param {Number} size 分割数
 * @returns Array
 */
export function chunk (array, size) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}

function slice (array, start, end) {
  return array.slice(start, end)
}