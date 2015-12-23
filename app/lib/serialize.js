export default function serialize(params) {
  const keyValue = []

  for (const key of Object.keys(params)) {
    const value = params[key]
    if (value !== '') {
      keyValue.push(`${key}=${encodeURIComponent(value)}`)
    }
  }

  return keyValue.join('&')
}
