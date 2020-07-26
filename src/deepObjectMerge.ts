import isObject from './isObject';
import copyObject from './copyObject';
import { LegendItemIcon } from './defaultSettings';
import { LayoutItem } from './interfaces';

function deepObjectMerge(original: any, ...newobjs: any[]): object | LegendItemIcon | LayoutItem {
  if (!newobjs.length) return original;
  let returnedObj: {[index: string]: any} = copyObject(original);
  const newobj: {[index: string]: any} = newobjs.shift();
  if (isObject(newobj)) {
    for (const key in newobj) {
      if (isObject(newobj[key])) {
        if (!returnedObj[key]) {
          Object.assign(returnedObj, { [key]: {} });
        } else {
          returnedObj[key] = deepObjectMerge(returnedObj[key], newobj[key]);
        }
      } else {
        Object.assign(returnedObj, { [key]: newobj[key] });
      }
    }
  }
  return deepObjectMerge(returnedObj, ...newobjs);
};

export default deepObjectMerge;
