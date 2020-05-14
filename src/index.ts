import defaultSettings from './defaultSettings';
import isObject from './isObject';
import deepObjectMerge from './deepObjectMerge';
import appendSVGChild from './appendSVGChild';
import svgWrapText from './svgWrapText';
import updateData from './updateData';
import updateOptions from './updateOptions';
import placeCanvas from './placeCanvas';
import addTitle from './addTitle';
import addSubtitle from './addSubtitle';
import addDescription from './addDescription';
import addLegend from './addLegend';

export function SVGChrt(data = [], options = {}): void {
  defaultSettings : defaultSettings;
  isObject        : isObject;
  deepObjectMerge : deepObjectMerge;
  appendSVGChild  : appendSVGChild;
  svgWrapText     : svgWrapText;
  updateData      : updateData;
  updateOptions   : updateOptions;
  placeCanvas     : placeCanvas;
  addTitle        : addTitle;
  addSubtitle     : addSubtitle;
  addDescription  : addDescription;
  addLegend       : addLegend;
}
