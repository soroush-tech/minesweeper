export const isEmpty = (obj: any): boolean => {
  // Check if obj is null or undefined
  if (obj == null) {
    return true
  }

  // Check if obj is an object and if it has no own properties
  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0
  }

  // If obj is not an object, treat it as a non-empty value if it’s not null or undefined
  return false
}
