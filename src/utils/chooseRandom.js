export const chooseRandom = (array = [], numItems) => {
  if (array.length <= 1) {
    return array
  }
  if (numItems < 1 || numItems > array.length || numItems === undefined) {
    numItems = Math.floor(Math.random() * array.length + 1)
  }
  const randomIndices = []
  for (let i = 0; i < numItems; i++) {
    let num
    do {
      num = Math.floor(Math.random() * array.length)
    } while (randomIndices.indexOf(num) >= 0)
    randomIndices.push(num)
  }
  return array.filter(
    (item, index) => array.indexOf(item) === randomIndices[index]
  )
}
