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
import buildSurround from './buildSurround';
import render from './render';
import { SettingsObject } from './defaultSettings';

class SVGChrt {
  defaultSettings = defaultSettings;
  settings        : SettingsObject;
  target          : HTMLElement;
  tET             : string;
  constructor(options = {}) {
    if (!options) {
      console.warn(
        `You haven't set any options for the chart, it should still render however it may not look the way you want it to.`
      );
    }
//    if (!data) {
//      throw new Error(
//        `You need to provide some data for the chart to work with!`
//      );
//      return;
//    }
    this.settings = deepObjectMerge(this.defaultSettings, options) as SettingsObject;
    this.target = /^#\w*/i.test(this.settings.target)
                ? document.querySelector(this.settings.target) as HTMLElement
                : document.querySelector(`#${this.settings.target}`) as HTMLElement;
  }
  render() {
    if (!this.target) {
      throw new Error(
        `Sorry, ${this.settings.target} doesn't appear to exist in the document. Please use a target <div> or <section> that is already in the document to display your visualisation.`
      );
      return;
    }
    this.tET = this.target.tagName.toLowerCase();
    if (!['div', 'section'].includes(this.tET)) {
      throw new Error(
        `Sorry, ${this.settings.target} doesn't appear to be a <div> or <section>. You need to select one of those from the document to display your visualisation.`
      );
      return;
    }
    render(this.settings,this.target);
  }
}

module.exports = SVGChrt;
