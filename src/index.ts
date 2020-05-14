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
import plot from './plot';
import placePlot from './placePlot';
import { getChartArea } from './layout';

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
  plot            : plot;
  placePlot       : placePlot;
  buildSurround   : buildSurround;
  render          : render;
  if (!options) {
    console.warn(
      `You haven't set any options for the chart, it should still render however it may not look the way you want it to.`
    );
  }
  if (!data) {
    throw new Error(
      `You need to provide some data for the chart to work with!`
    );
    return;
  }
  let settings: settingsObject = deepObjectMerge(defaultSettings, options);
  let target: HTMLElement = /^#\w*/i.test(settings.target)
                          ? document.getElementById(settings.target.substring(1))
                          : document.getElementById(settings.target);

  if (!target) {
    throw new Error(
      `Sorry, ${settings.target} doesn't appear to exist in the document. Please use a target <div> or <section> that is already in the document to display your visualisation.`
    );
    return;
  }
  let tET: string = target.tagName.toLowerCase();
  if (!['div', 'section'].includes(tET)) {
    throw new Error(
      `Sorry, ${settings.target} doesn't appear to be a <div> or <section>. You need to select one of those from the document to display your visualisation.`
    );
    return;
  }
  let data = data;
}
