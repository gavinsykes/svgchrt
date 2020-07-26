import isObject from './isObject';
import copyObject from './copyObject';
import { LegendItemIcon } from './defaultSettings';
import { LayoutItem } from './interfaces';

function deepObjectMerge(original: any, newobj: any): object | LegendItemIcon | LayoutItem {
  if (!newobj) return original;
  let returnedObj: {[index: string]: any} = copyObject(original);
  if (isObject(newobj)) {
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
  }
  return returnedObj;
};

export default deepObjectMerge;
