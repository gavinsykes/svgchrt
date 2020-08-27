import isObject from './isObject';

function copyObject(
  original: unknown
): { [index: string]: unknown } | undefined {
  if (!isObject(original)) return undefined;
  const returnedObject: { [index: string]: unknown } = {};
  Object.entries(original as Record<string, unknown>).map(
    (c) => (returnedObject[c[0]] = isObject(c[1]) ? copyObject(c[1]) : c[1])
  );
  return returnedObject;
}

export default copyObject;
