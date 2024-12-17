export function convertToK(num) {
  if (num > 999) {
    return Math.floor(num / 1000) + "k"
  }
  return num
}

export function extractYear(release) {
  if (release) {
    const newArr = release?.split("-")
    return newArr[0]
  }
}
