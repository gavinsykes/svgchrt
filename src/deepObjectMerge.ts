import isObject from './isObject';
import copyObject from './copyObject';
import { LegendItemIcon } from './defaultSettings';
import { LayoutItem } from './interfaces';

function deepObjectMerge(
  original: unknown,
  newobj: unknown
): object | LegendItemIcon | LayoutItem {
  if (!isObject(newobj)) return original;
  const returnedObj: { [index: string]: unknown } = copyObject(original);
  for (const key in newobj) {
    if (isObject(newobj[key])) {
      if (!returnedObj[key]) {
        Object.assign(returnedObj, { [key]: newobj[key] });
      } else {
        returnedObj[key] = deepObjectMerge(returnedObj[key], newobj[key]);
      }
    } else {
      Object.assign(returnedObj, { [key]: newobj[key] });
    }
  }
  return returnedObj;
}

export default deepObjectMerge;
