import isObject from './isObject';

function copyObject(original: unknown): object {
  if (!isObject(original)) return original;
  const returnedObject: { [index: string]: unknown } = {};
  Object.entries(original).map(
    (c) => (returnedObject[c[0]] = isObject(c[1]) ? copyObject(c[1]) : c[1])
  );
  return returnedObject;
}

export default copyObject;
