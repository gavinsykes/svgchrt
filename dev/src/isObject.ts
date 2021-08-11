/**
 * @author Gavin Sykes <gavin@gavinsykes.uk> (https://gavinsykes.uk/) [@gavinsykes_uk](https://twitter.com/gavinsykes_uk)
 * @license MIT
 */

/**
 * isObject takes an unknown input as its argument and returns a boolean to advise whether or not it is a JavaScript object.
 *
 * The return value is whether it is an object.
 *
 * @param {unknown} o - The 'object' to decide whether it is an object.
 *
 * @returns {boolean} Whether it is an object.
 *
 */
const isObject: (o: unknown) => boolean = (o: unknown): boolean =>
  !!o && typeof o === 'object' && !Array.isArray(o);

export default isObject;
