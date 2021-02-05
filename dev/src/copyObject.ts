/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import isObject from './isObject';

/**
 * copyObject takes a JvaScript object as its argument and returns an unlinked clone of that object.
 *
 * The return value is a clone of the input.
 *
 * @param {unknown} original - the object to clone.
 *
 * @returns {Record<string, unknown>} - the cloned object.
 *
 */
function copyObject(
  original: unknown
): Record<string,unknown> | undefined {
  if (!isObject(original)) return undefined;
  const returnedObject: Record<string,unknown> = {};
  Object.entries(original as Record<string, unknown>).map(
    (c) => (returnedObject[c[0]] = isObject(c[1]) ? copyObject(c[1]) : c[1])
  );
  return returnedObject;
}

export default copyObject;
