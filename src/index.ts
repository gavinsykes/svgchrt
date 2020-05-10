import defaultSettings from './defaultSettings';
import isObject from './isObject';
import deepObjectMerge from './deepObjectMerge';

export function SVGChrt(data = [], options = {}) {
  this.defaultSettings = defaultSettings.defaultSettings;
  this.isObject = isObject.isObject;
  this.deepObjectMerge = deepObjectMerge.deepObjectMerge;
}
