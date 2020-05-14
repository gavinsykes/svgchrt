import isObject from './isObject';
import { LegendItemIcon } from './defaultSettings';

function deepObjectMerge (original: any, ...newobjs: any[]): object | LegendItemIcon {
  if (!newobjs.length) return original;
  const newobj: any = newobjs.shift();
  if (isObject(original) && isObject(newobj)) {
    for (const key in newobj) {
      if (isObject(newobj[key])) {
        if (!original[key]) Object.assign(original, { [key]: {} });
        deepObjectMerge(original[key], newobj[key]);
      } else {
        Object.assign(original, { [key]: newobj[key] });
      }
    }
  }
  return deepObjectMerge(original, ...newobjs);
};

export default deepObjectMerge;
