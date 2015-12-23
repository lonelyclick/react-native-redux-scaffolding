export default function upperCaseFirst(str) {
  if (typeof str !== 'string' || !str) {
    return
  }

  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`
}
