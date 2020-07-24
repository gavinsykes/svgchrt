import isObject from './isObject';
import { LegendItemIcon } from './defaultSettings';
import { LayoutItem } from './interfaces';

function copyObject(original: any): object {
  let returnedObject = {};
  Object.entries(original).map(c => returnedObject[c[0]] = isObject(c[1]) ? copyObject(c[1]) : c[1]);
  return returnedObject;
}

function deepObjectMerge (original: any, ...newobjs: any[]): object | LegendItemIcon | LayoutItem {
  if (!newobjs.length) return original;
  let returnedObj = copyObject(original);
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
