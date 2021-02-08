/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

import isObject from './isObject';
import copyObject from './copyObject';

/**
 * deepObjectMerge takes 2 Record<string, unknown>s as its arguments. It returns a new Record<string,unknown> with the properties merged together recursively. Any properties that exist in both Records are assigned the value of that property in the second Record.
 *
 * The return value is the merged Record.
 *
 * @param {Record<string, unknown>} original - the starting point.
 *
 * @param {Record<string, unknown>} newobj - the new object to merge with the original.
 *
 * @returns {Record<string, unknown>} The merged object.
 *
 */
function deepObjectMerge(
  original: Record<string, unknown>,
  newobj: Record<string, unknown>
): Record<string, unknown> {
  if (!isObject(newobj)) return original as Record<string, unknown>;
  const returnedObj: Record<string, unknown> = copyObject(original) as Record<
    string,
    unknown
  >;
  for (const key in newobj as Record<string, unknown>) {
    if (isObject(newobj[key])) {
      if (!returnedObj[key]) {
        Object.assign(returnedObj, { [key]: newobj[key] } as Record<
          string,
          unknown
        >);
      } else {
        returnedObj[key] = deepObjectMerge(
          returnedObj[key] as Record<string, unknown>,
          newobj[key] as Record<string, unknown>
        );
      }
    } else {
      Object.assign(returnedObj, { [key]: newobj[key] } as Record<
        string,
        unknown
      >);
    }
  }
  return returnedObj;
}

export default deepObjectMerge;
