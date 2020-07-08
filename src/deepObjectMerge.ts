import isObject from './isObject';
import { LegendItemIcon } from './defaultSettings';
import { LayoutItem } from './interfaces';

function deepObjectMerge (original: any, ...newobjs: any[]): object | LegendItemIcon | LayoutItem {
  if (!newobjs.length) return original;
  let returnedObj = original;
  const newobj: any = newobjs.shift();
  if (isObject(returnedObj) && isObject(newobj)) {
    for (const key in newobj) {
      if (isObject(newobj[key])) {
        if (!returnedObj[key]) Object.assign(returnedObj, { [key]: {} });
        deepObjectMerge(returnedObj[key], newobj[key]);
      } else {
        Object.assign(returnedObj, { [key]: newobj[key] });
      }
    }
  }
  return deepObjectMerge(returnedObj, ...newobjs);
};

export default deepObjectMerge;
