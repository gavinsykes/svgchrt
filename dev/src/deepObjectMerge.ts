import isObject from './isObject';
import copyObject from './copyObject';
import { LegendItemIcon } from './defaultSettings';
import { LayoutItem } from './interfaces';

function deepObjectMerge(
  original: Record<string, unknown>,
  newobj: Record<string, unknown>
): Record<string, unknown> {
  if (!isObject(newobj)) return original as Record<string, unknown>;
  const returnedObj: Record<string, unknown> = copyObject(original) as Record<string, unknown>;
  for (const key in newobj as Record<string, unknown>) {
    if (isObject(newobj[key])) {
      if (!returnedObj[key]) {
        Object.assign(returnedObj, { [key]: newobj[key] });
      } else {
        returnedObj[key] = deepObjectMerge(returnedObj[key] as Record<string, unknown>, newobj[key] as Record<string, unknown>);
      }
    } else {
      Object.assign(returnedObj, { [key]: newobj[key] });
    }
  }
  return returnedObj;
}

export default deepObjectMerge;
