import isObject from './isObject'

function copyObject (original: any): object {
  if (!isObject(original)) return original
  const returnedObject: {[index: string]: any} = {}
  Object.entries(original).map(c => returnedObject[c[0]] = isObject(c[1]) ? copyObject(c[1]) : c[1])
  return returnedObject
}

export default copyObject
